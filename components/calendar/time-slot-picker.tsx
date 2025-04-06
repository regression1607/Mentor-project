"use client";

import { useState } from "react";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export type TimeSlot = {
  id?: string;
  startTime: string;
  endTime: string;
};

type TimeSlotPickerProps = {
  selectedSlotId?: string;
  availableSlots: TimeSlot[];
  onSelectSlot: (slot: TimeSlot) => void;
  className?: string;
};

export function TimeSlotPicker({
  selectedSlotId,
  availableSlots,
  onSelectSlot,
  className,
}: TimeSlotPickerProps) {
  const [open, setOpen] = useState(false);
  const selectedSlot = availableSlots.find(
    (slot) => slot.id === selectedSlotId
  );
  console.log("selectedslot", selectedSlot);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedSlot && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {selectedSlot ? (
            <span>
              {selectedSlot.startTime} - {selectedSlot.endTime}
            </span>
          ) : (
            <span>Select time slot</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <ScrollArea className="h-72">
          <div className="grid gap-1 p-2">
            {availableSlots.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No available time slots for this date
              </p>
            ) : (
              availableSlots.map((slot, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className={cn(
                    "justify-start font-normal",
                    selectedSlot?.startTime === slot.startTime &&
                      "bg-primary/10 font-medium"
                  )}
                  onClick={() => {
                    onSelectSlot(slot);
                    setOpen(false);
                  }}
                >
                  <span className="mr-auto flex items-center">
                    {slot.startTime} - {slot.endTime}
                  </span>
                  {selectedSlot?.startTime === slot.startTime && (
                    <Check className="h-4 w-4 opacity-70" />
                  )}
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
