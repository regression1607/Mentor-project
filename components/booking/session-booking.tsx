"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Video } from "lucide-react"
import { DatePicker } from "@/components/calendar/date-picker"
import { type TimeSlot, TimeSlotPicker } from "@/components/calendar/time-slot-picker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {  bookSession } from "@/actions/booking-actions"
import type { MentorProfile } from "@/types/mentor"
import { getAvailableSlotsForDate } from "@/actions/availaiblity-actions"

type SessionBookingProps = {
  mentor: MentorProfile
}

export function SessionBooking({ mentor }: SessionBookingProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>(undefined)
  const [selectedType, setSelectedType] = useState<"chat" | "video" | "call">("video")
  const [isLoading, setIsLoading] = useState(false)
  const [timezone, setTimezone] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Get user's timezone
  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots()
    } else {
      setAvailableSlots([])
      setSelectedSlot(undefined)
    }
  }, [selectedDate])

  const fetchAvailableSlots = async () => {
    if (!selectedDate) return

    setIsLoading(true)
    try {
      const slots = await getAvailableSlotsForDate(mentor.userId, selectedDate.toISOString())
      setAvailableSlots(
        slots.map((slot) => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      )

      // Clear selected slot if it's no longer available
      if (
        selectedSlot &&
        !slots.some((s) => s.startTime === selectedSlot.startTime && s.endTime === selectedSlot.endTime)
      ) {
        setSelectedSlot(undefined)
      }
    } catch (error) {
      console.error("Error fetching slots:", error)
      toast({
        title: "Error",
        description: "Failed to fetch available time slots",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookSession = async () => {
    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Error",
        description: "Please select a date and time slot",
      })
      return
    }

    setIsLoading(true)

    try {
      // Find the slot ID that matches the selected time
      const slotId = availableSlots.find(
        (slot) => slot.startTime === selectedSlot.startTime && slot.endTime === selectedSlot.endTime,
      )?.id

      if (!slotId) {
        throw new Error("Selected slot not found")
      }

      const result = await bookSession({
        mentorId: mentor.userId,
        slotId,
        type: selectedType,
        timezone,
      })

      if (result.error) {
        toast({
          title: "Booking Failed",
          description: result.error,

        })
      } else {
        toast({
          title: "Booking Successful",
          description: "Your session has been booked",
        })

        // Redirect to mentee dashboard
        router.push("/dashboard/mentee")
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.error("Error booking session:", error)
      toast({
        title: "Booking Failed",
        description: "There was an error booking your session",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 mr-3 text-primary" />
      case "chat":
        return <MessageCircle className="h-5 w-5 mr-3 text-primary" />
      case "call":
        return <Phone className="h-5 w-5 mr-3 text-primary" />
      default:
        return <Video className="h-5 w-5 mr-3 text-primary" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedType === "chat" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setSelectedType("chat")}
        >
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-3 text-primary" />
            <span>Chat Session</span>
          </div>
          <span className="font-semibold">${mentor.pricing.chat}/hr</span>
        </div>

        <div
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedType === "video" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setSelectedType("video")}
        >
          <div className="flex items-center">
            <Video className="h-5 w-5 mr-3 text-primary" />
            <span>Video Call</span>
          </div>
          <span className="font-semibold">${mentor.pricing.video}/hr</span>
        </div>

        <div
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedType === "call" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setSelectedType("call")}
        >
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-3 text-primary" />
            <span>Phone Call</span>
          </div>
          <span className="font-semibold">${mentor.pricing.call}/hr</span>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Schedule Session</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book a Session with {mentor.name}</DialogTitle>
            <DialogDescription>Select a date and time slot for your {selectedType} session.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2">
              {getSessionIcon(selectedType)}
              <span className="font-medium">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Session
              </span>
              <span className="font-semibold ml-auto">${mentor.pricing[selectedType]}/hr</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <DatePicker date={selectedDate} onSelect={setSelectedDate} />
            </div>

            {selectedDate && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time Slot</label>
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading available slots...</p>
                ) : availableSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No available slots for this date</p>
                ) : (
                  <TimeSlotPicker
                    selectedSlot={selectedSlot}
                    availableSlots={availableSlots}
                    onSelectSlot={setSelectedSlot}
                  />
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {Intl.supportedValuesOf("timeZone").map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleBookSession}
              disabled={!selectedDate || !selectedSlot || isLoading || status !== "authenticated"}
            >
              {isLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

