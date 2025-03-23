import VideoCall from "@/components/booking/VideoCall";
import BookVideoCallDialog from "@/components/booking/VideomeetBooking";
import React from "react";

type SearchParams = Promise<{
  [meetingId: string]: string;
}>;

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { meetingId } = await searchParams;

  const meetingUrl = "https://vdo.ninja/?room=your-room-name";
  return meetingId ? (
    <VideoCall
      meetingUrl={meetingUrl}
      // meetingId={meetingId}
      // displayName={mentor?.name}
      // email={mentor.name}
    />
  ) : (
    <BookVideoCallDialog />
  );
}
