import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IAvailabilitySlot extends Document {
  mentorId: mongoose.Types.ObjectId
  date: Date
  startTime: string
  endTime: string
  isBooked: boolean
  isRecurring: boolean
  recurringDays?: number[] // 0 = Sunday, 1 = Monday, etc.
  createdAt: Date
  updatedAt: Date
}

const AvailabilitySlotSchema = new Schema<IAvailabilitySlot>(
  {
    mentorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    isRecurring: { type: Boolean, default: false },
    recurringDays: [{ type: Number, min: 0, max: 6 }],
  },
  {
    timestamps: true,
  },
)

// Create a compound index to ensure unique slots per mentor per time
AvailabilitySlotSchema.index({ mentorId: 1, date: 1, startTime: 1 }, { unique: true })

const AvailabilitySlot =
  (mongoose.models.AvailabilitySlot as Model<IAvailabilitySlot>) ||
  mongoose.model<IAvailabilitySlot>("AvailabilitySlot", AvailabilitySlotSchema)

export default AvailabilitySlot

