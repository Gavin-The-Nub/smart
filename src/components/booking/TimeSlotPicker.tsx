import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTrueAvailability } from "@/lib/database";
import { Clock, Calendar, CheckCircle } from "lucide-react";
import { format, parseISO, addDays } from "date-fns";

interface TimeSlot {
  start: string;
  end: string;
}

interface TimeSlotPickerProps {
  tutorId: string;
  tutorName: string;
  onSlotSelect?: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot | null;
}

export function TimeSlotPicker({
  tutorId,
  tutorName,
  onSlotSelect,
  selectedSlot,
}: TimeSlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load availability when date or tutor changes
  useEffect(() => {
    const loadAvailability = async () => {
      if (!tutorId) return;

      try {
        setLoading(true);
        setError(null);
        const dateString = selectedDate.toISOString().split("T")[0];
        const slots = await getTrueAvailability(tutorId, dateString);
        setAvailableSlots(slots);
      } catch (err) {
        console.error("Error loading availability:", err);
        setError("Failed to load availability");
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, [tutorId, selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (onSlotSelect) {
      onSlotSelect(slot);
    }
  };

  const formatTimeSlot = (slot: TimeSlot) => {
    return `${slot.start} - ${slot.end}`;
  };

  const isSlotSelected = (slot: TimeSlot) => {
    if (!selectedSlot) return false;
    return selectedSlot.start === slot.start && selectedSlot.end === slot.end;
  };

  const getDateOptions = () => {
    const options = [];
    const today = new Date();

    // Show next 14 days
    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      options.push(date);
    }

    return options;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Available Time Slots</span>
        </CardTitle>
        <CardDescription>
          Select a time slot for your session with {tutorName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">Select Date</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {getDateOptions().map((date) => {
              const isSelected =
                selectedDate.toDateString() === date.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <Button
                  key={date.toISOString()}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDateChange(date)}
                  className="flex flex-col h-auto py-2"
                >
                  <span className="text-xs font-medium">
                    {format(date, "EEE")}
                  </span>
                  <span className="text-sm font-bold">{format(date, "d")}</span>
                  {isToday && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Today
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              Available Slots for {format(selectedDate, "MMMM d, yyyy")}
            </span>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="ml-2 text-sm text-muted-foreground">
                Loading availability...
              </span>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-destructive">
              <p>{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setError(null);
                  // Retry loading
                  const dateString = selectedDate.toISOString().split("T")[0];
                  getTrueAvailability(tutorId, dateString)
                    .then(setAvailableSlots)
                    .catch(() => setError("Failed to load availability"));
                }}
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && availableSlots.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No available time slots for this date.</p>
              <p className="text-sm">Try selecting a different date.</p>
            </div>
          )}

          {!loading && !error && availableSlots.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableSlots.map((slot, index) => (
                <Button
                  key={`${slot.start}-${slot.end}-${index}`}
                  variant={isSlotSelected(slot) ? "default" : "outline"}
                  onClick={() => handleSlotSelect(slot)}
                  className="flex flex-col h-auto py-3 relative"
                >
                  {isSlotSelected(slot) && (
                    <CheckCircle className="h-4 w-4 absolute top-1 right-1" />
                  )}
                  <span className="font-medium">{slot.start}</span>
                  <span className="text-xs text-muted-foreground">
                    to {slot.end}
                  </span>
                </Button>
              ))}
            </div>
          )}

          {selectedSlot && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Selected Time Slot:</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {format(selectedDate, "MMMM d, yyyy")} at{" "}
                {formatTimeSlot(selectedSlot)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
