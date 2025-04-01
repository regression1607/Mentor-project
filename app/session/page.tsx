import { Suspense } from "react";
import { notFound } from "next/navigation";
// import BookingDialog from "./BookingDialog";
// import SessionTypeSelector from "./SessionTypeSelector";
// import { Button } from "@/components/ui/button";
import { getMentorById } from "@/lib/mentors";
import SessionTypeSelector from "@/components/session/SessionTypeSelector";
import { getSearchParams } from "@/utils/url-params";
import BookingDialog from "@/components/session/BookingDialog";

type Props = {
  params: Promise<{ mentorId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function SessionBooking({ params, searchParams }: Props) {
  console.log("params", params);
  const urlSearchParams = await searchParams;
  const mentor = await getMentorById("67d4709d9d1e7c742b328ade");
  if (!mentor) return notFound();

  const { date, slot, type, timezone } = getSearchParams(urlSearchParams);
  console.log(date, slot, timezone);

  return (
    <div className="space-y-4">
      <SessionTypeSelector selectedType={type} />
      <Suspense fallback={<p>Loading...</p>}>
        <BookingDialog
          mentorName={mentor.name}
          selectedDate={date || new Date(Date.now())}
          selectedSlot={slot}
          selectedType={type}
          timezone={timezone}
        />
      </Suspense>
      {/* <Button
        className="w-full"
        onClick={() => (window.location.search = "?open=true")}
      >
        Schedule Session
      </Button> */}
    </div>
  );
}
