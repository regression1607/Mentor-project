"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import connectDB from "@/lib/db"
import User from "@/models/User"
import { parseISO, addDays, getDay } from "date-fns"
import AvailabilitySlot from "@/models/Availability"

export type AvailabilityFormData = {
  date: string
  startTime: string
  endTime: string
  isRecurring: boolean
  recurringDays?: number[]
  duration?: number
}

/**
 * Add new availability slots for a mentor
 */
export async function addAvailabilitySlot(formData: AvailabilityFormData) {
  const session = await auth()
  if (!session || session.user.role !== "mentor") {
    return {
      error: "Unauthorized",
    }
  }

  try {
    await connectDB()

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return {
        error: "User not found",
      }
    }

    const dateObj = parseISO(formData.date)

    // Create the initial slot
    const newSlot = new AvailabilitySlot({
      mentorId: user._id,
      date: dateObj,
      startTime: formData.startTime,
      endTime: formData.endTime,
      isRecurring: formData.isRecurring,
      recurringDays: formData.recurringDays,
    })

    await newSlot.save()

    // If recurring, create slots for future dates (for the next 12 weeks)
    if (formData.isRecurring && formData.recurringDays?.length) {
      const dayOfWeek = getDay(dateObj)
      const slots = []
         console.log('day of week', dayOfWeek);
      // Add the recurring slot for the next 12 weeks
      for (let i = 1; i <= 84; i++) {
        // 84 days = 12 weeks
        const futureDate = addDays(dateObj, i)
        const futureDayOfWeek = getDay(futureDate)

        // Only add if the day of week matches the recurring days
        if (formData.recurringDays.includes(futureDayOfWeek)) {
          slots.push({
            mentorId: user._id,
            date: futureDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            isRecurring: true,
            recurringDays: formData.recurringDays,
          })
        }
      }

      // Insert many slots at once
      if (slots.length > 0) {
        await AvailabilitySlot.insertMany(slots, { ordered: false })
        // Using ordered: false to continue if there are duplicates
      }
    }

    revalidatePath("/dashboard/mentor/availability")

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Error adding availability slot:", error)

    // Check if it's a duplicate key error
    if (error.code === 11000) {
      return {
        error: "Time slot already exists",
      }
    }

    return {
      error: "Failed to add availability slot",
    }
  }
}

/**
 * Delete an availability slot
 */
export async function deleteAvailabilitySlot(slotId: string, deleteRecurring = false) {
  const session = await auth()
  if (!session || session.user.role !== "mentor") {
    return {
      error: "Unauthorized",
    }
  }

  try {
    await connectDB()

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return {
        error: "User not found",
      }
    }

    const slot = await AvailabilitySlot.findOne({
      _id: slotId,
      mentorId: user._id,
    })

    if (!slot) {
      return {
        error: "Slot not found",
      }
    }

    if (deleteRecurring && slot.isRecurring) {
      // Delete all future recurring slots with the same pattern
      await AvailabilitySlot.deleteMany({
        mentorId: user._id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isRecurring: true,
        recurringDays: { $all: slot.recurringDays },
        date: { $gte: new Date() },
      })
    } else {
      // Delete just this slot
      await AvailabilitySlot.deleteOne({ _id: slotId })
    }

    revalidatePath("/dashboard/mentor/availability")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting availability slot:", error)
    return {
      error: "Failed to delete availability slot",
    }
  }
}

/**
 * Get available slots for a mentor on a specific date
 */
export async function getAvailableSlotsForDate(mentorId: string, date: string) {
  try {
    await connectDB()

    const dateObj = parseISO(date)

    // Set time to start of day
    dateObj.setHours(0, 0, 0, 0)

    // Set time to end of day
    const endOfDay = new Date(dateObj)
    endOfDay.setHours(23, 59, 59, 999)

    const slots = await AvailabilitySlot.find({
      mentorId,
      date: {
        $gte: dateObj,
        $lte: endOfDay,
      },
      isBooked: false,
    }).sort({ startTime: 1 })

    return slots.map((slot) => ({
      id: slot._id.toString(),
      startTime: slot.startTime,
      endTime: slot.endTime,
      date: slot.date.toISOString(),
    }))
  } catch (error) {
    console.error("Error getting available slots:", error)
    return []
  }
}

/**
 * Get all availability slots for a mentor
 */
export async function getMentorAvailability(showPast = false) {
  const session = await auth()
  if (!session || session.user.role !== "mentor") {
    return []
  }

  try {
    await connectDB()

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return []
    }

    const query: any = {
      mentorId: user._id,
    }

    if (!showPast) {
      query.date = { $gte: new Date() }
    }

    const slots = await AvailabilitySlot.find(query).sort({ date: 1, startTime: 1 })

    return slots.map((slot) => ({
      id: slot._id.toString(),
      date: slot.date.toISOString(),
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: slot.isBooked,
      isRecurring: slot.isRecurring,
      recurringDays: slot.recurringDays || [],
    }))
  } catch (error) {
    console.error("Error getting mentor availability:", error)
    return []
  }
}

