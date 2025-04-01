"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import DateSelection from "./DateSelection";
// import TimeSlotSelection from "./TimeSlotSelection";
// import TimezoneSelection from "./TimezoneSelection";
// import type { MentorProfile } from "@/types/mentor";

type Props = {
  mentorName: string;
  selectedDate?: Date;
  selectedSlot?: string;
  selectedType: string;
  timezone: string;
};

export default function BookingDialog({
  mentorName,
  selectedDate,
  selectedSlot,
  selectedType,
  timezone,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("open") === "true";

  const updateQueryParams = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`?${params.toString()}`);
  };

  const handleBookSession = async () => {
    if (!selectedDate || !selectedSlot) return alert("Select date and time");
    // Perform booking logic...
    alert("Session booked!");
    router.push("/dashboard/mentee");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => updateQueryParams("open", undefined)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book with {mentorName}</DialogTitle>
        </DialogHeader>
        <h1>hardik</h1>

        {/* <DateSelection
          selectedDate={selectedDate}
          onSelectDate={(date) =>
            updateQueryParams("date", date?.toISOString())
          }
        />
        {selectedDate && (
          <TimeSlotSelection
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSelectSlot={(slot) => updateQueryParams("slot", slot)}
          />
        )}
        <TimezoneSelection
          selectedTimezone={timezone}
          onSelectTimezone={(tz) => updateQueryParams("timezone", tz)}
        /> */}

        <DialogFooter>
          <Button onClick={handleBookSession}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
