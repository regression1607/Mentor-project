"use server";

import { createMeeting } from "@/lib/meeting";

export async function createJitsiLink({
  bookedBy,
  mentorId,
  scheduledAt,
  duration,
}: {
  bookedBy: string;
  mentorId: string;
  scheduledAt: Date;
  duration: number;
}): Promise<string> {
  try {
    // 4️⃣ Construct Jitsi Meeting Link
    const meetingId = `gym-meeting-${mentorId}-${bookedBy}-${scheduledAt.toString()}`;
    // const meetingLink = `https://meet.jit.si/${meetingId}#userInfo.displayName=${encodeURIComponent(
    //   menteeName
    // )}`;
    //
    await createMeeting({
      meetingId,
      bookedBy,
      mentorId,
      scheduledAt,
      duration,
    });

    return meetingId;
  } catch (error) {
    console.error("Error creating Jitsi meeting link:", error);
    throw new Error("Failed to create meeting link");
  }
}
