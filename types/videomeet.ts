import mongoose from "mongoose";

export interface IVideoMeet {
  _id?: string;
  meetingId: string; // Unique Meeting Identifier
  // meetingLink: string; // Video Call URL
  bookedBy: mongoose.Types.ObjectId; // Member who booked the meeting
  mentorId: mongoose.Types.ObjectId; // Trainer assigned to the meeting
  scheduledAt: Date; // Meeting Date & Time
  duration: number; // Duration in minutes
  status: IVideoMeetStatus; // Meeting Status;
  createdAt: Date;
}

export enum IVideoMeetStatus {
  SCHEDULED = "scheduled",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
