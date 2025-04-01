"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Video } from "lucide-react";
import { DatePicker } from "@/components/calendar/date-picker";
// import { TimeSlotPicker } from "@/components/calendar/time-slot-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { bookSession } from "@/actions/booking-actions";
import type { MentorProfile } from "@/types/mentor";
// import { getAvailableSlotsForDate } from "@/actions/availability-actions";

type SessionBookingProps = {
  mentor: MentorProfile;
};

export default function SessionBooking({ mentor }: SessionBookingProps) {
  console.log("mentor oin session bioking", mentor);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract params from URL
  const selectedDate = searchParams.get("date")
    ? new Date(searchParams.get("date")!)
    : undefined;
  const selectedSlot = searchParams.get("slot");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedType = searchParams.get("type") || ("video" as any);
  const timezone =
    searchParams.get("timezone") ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Fetch available slots via Server Actions
  // const fetchAvailableSlots = async () => {
  //   if (!selectedDate) return [];
  //   return await getAvailableSlotsForDate(
  //     mentor.userId,
  //     selectedDate.toISOString()
  //   );
  // };
  console.log("status", status);

  // Update URL params
  const updateQueryParams = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`);
  };

  const handleBookSession = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Error",
        description: "Please select a date and time slot",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await bookSession({
          mentorId: mentor.userId,
          slotId: selectedSlot,
          type: selectedType,
          timezone,
        });

        if (result.error) {
          toast({ title: "Booking Failed", description: result.error });
        } else {
          toast({
            title: "Booking Successful",
            description: "Your session has been booked",
          });
          router.push("/dashboard/mentee");
          setIsDialogOpen(false);
        }
      } catch (error) {
        console.log("error", error);
        toast({
          title: "Booking Failed",
          description: "There was an error booking your session",
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Session Type Selection */}
      {["chat", "video", "call"].map((type) => (
        <div
          key={type}
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
            selectedType === type ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => updateQueryParams("type", type)}
        >
          <div className="flex items-center">
            {type === "chat" ? (
              <MessageCircle className="h-5 w-5 mr-3 text-primary" />
            ) : null}
            {type === "video" ? (
              <Video className="h-5 w-5 mr-3 text-primary" />
            ) : null}
            {type === "call" ? (
              <Phone className="h-5 w-5 mr-3 text-primary" />
            ) : null}
            <span className="capitalize">{type} Session</span>
          </div>
          <span className="font-semibold">${mentor.pricing[type]}/hr</span>
        </div>
      ))}

      {/* Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Schedule Session</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book a Session with {mentor.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Selected Type */}
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}{" "}
                Session
              </span>
              <span className="font-semibold ml-auto">
                ${mentor.pricing[selectedType]}/hr
              </span>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <DatePicker
                date={selectedDate}
                onSelect={(date) =>
                  updateQueryParams("date", date?.toISOString())
                }
              />
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time Slot</label>
                {/* <TimeSlotPicker
                  selectedSlot={selectedSlot}
                  availableSlots={fetchAvailableSlots}
                  onSelectSlot={(slot) => updateQueryParams("slot", slot)}
                /> */}
              </div>
            )}

            {/* Timezone Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select
                value={timezone}
                onValueChange={(tz) => updateQueryParams("timezone", tz)}
              >
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
              disabled={!selectedDate || !selectedSlot || isPending}
            >
              {isPending ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
