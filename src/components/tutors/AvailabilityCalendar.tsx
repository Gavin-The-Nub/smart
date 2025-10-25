import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getTutorAvailability,
  createAvailability,
  deleteAvailability,
} from "@/lib/database";
import type { TutorAvailability } from "@/types/database";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Calendar, Clock, Trash2, Plus } from "lucide-react";
import { format, addDays, isSameDay, parseISO } from "date-fns";

interface AvailabilityCalendarProps {
  onAvailabilityChange?: (availability: TutorAvailability[]) => void;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

export function AvailabilityCalendar({
  onAvailabilityChange,
}: AvailabilityCalendarProps) {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<TutorAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load tutor's availability
  useEffect(() => {
    const loadAvailability = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const tutorAvailability = await getTutorAvailability(user.id);
        setAvailability(tutorAvailability);

        if (onAvailabilityChange) {
          onAvailabilityChange(tutorAvailability);
        }
      } catch (error) {
        console.error("Error loading availability:", error);
        toast.error("Failed to load availability");
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, [user, onAvailabilityChange]);

  // Get availability for a specific date
  const getAvailabilityForDate = (date: Date) => {
    return availability.filter((av) =>
      isSameDay(parseISO(av.start_datetime_utc), date)
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dayAvailability = getAvailabilityForDate(date);
      const slots = dayAvailability.map((av) => ({
        id: av.id,
        startTime: format(parseISO(av.start_datetime_utc), "HH:mm"),
        endTime: format(parseISO(av.end_datetime_utc), "HH:mm"),
      }));
      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
    }
  };

  // Add a new time slot
  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: `temp-${Date.now()}`,
      startTime: "09:00",
      endTime: "10:00",
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  // Update a time slot
  const updateTimeSlot = (
    id: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setTimeSlots((slots) =>
      slots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  // Remove a time slot
  const removeTimeSlot = (id: string) => {
    setTimeSlots((slots) => slots.filter((slot) => slot.id !== id));
  };

  // Save availability for the selected date
  const saveAvailability = async () => {
    if (!user || !selectedDate) return;

    try {
      setSaving(true);

      // Delete existing availability for this date
      const existingAvailability = getAvailabilityForDate(selectedDate);
      for (const av of existingAvailability) {
        await deleteAvailability(av.id);
      }

      // Create new availability slots
      for (const slot of timeSlots) {
        if (slot.startTime && slot.endTime) {
          const startDateTime = new Date(selectedDate);
          const [startHour, startMinute] = slot.startTime
            .split(":")
            .map(Number);
          startDateTime.setHours(startHour, startMinute, 0, 0);

          const endDateTime = new Date(selectedDate);
          const [endHour, endMinute] = slot.endTime.split(":").map(Number);
          endDateTime.setHours(endHour, endMinute, 0, 0);

          await createAvailability({
            tutor_id: user.id,
            start_datetime_utc: startDateTime.toISOString(),
            end_datetime_utc: endDateTime.toISOString(),
          });
        }
      }

      // Reload availability
      const updatedAvailability = await getTutorAvailability(user.id);
      setAvailability(updatedAvailability);

      if (onAvailabilityChange) {
        onAvailabilityChange(updatedAvailability);
      }

      setIsDialogOpen(false);
      toast.success("Availability updated successfully");
    } catch (error) {
      console.error("Error saving availability:", error);
      toast.error("Failed to save availability");
    } finally {
      setSaving(false);
    }
  };

  // Delete availability for a date
  const deleteAvailabilityForDate = async (date: Date) => {
    if (!user) return;

    try {
      const dayAvailability = getAvailabilityForDate(date);
      for (const av of dayAvailability) {
        await deleteAvailability(av.id);
      }

      // Reload availability
      const updatedAvailability = await getTutorAvailability(user.id);
      setAvailability(updatedAvailability);

      if (onAvailabilityChange) {
        onAvailabilityChange(updatedAvailability);
      }

      toast.success("Availability deleted successfully");
    } catch (error) {
      console.error("Error deleting availability:", error);
      toast.error("Failed to delete availability");
    }
  };

  // Custom day renderer to show availability indicators
  const renderDay = (day: Date) => {
    const dayAvailability = getAvailabilityForDate(day);
    const hasAvailability = dayAvailability.length > 0;

    return (
      <div className="relative">
        <span>{day.getDate()}</span>
        {hasAvailability && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Set Availability</CardTitle>
          <CardDescription>
            Choose when you're available for tutoring sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              Loading availability...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Availability</CardTitle>
        <CardDescription>
          Click on a date to set your available time slots. Green dots indicate
          days with availability.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={{ before: new Date() }}
            components={{
              Day: renderDay,
            }}
            className="rounded-md border"
          />
        </div>

        {selectedDate && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Availability for {format(selectedDate, "MMMM d, yyyy")}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteAvailabilityForDate(selectedDate)}
                  disabled={getAvailabilityForDate(selectedDate).length === 0}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Time Slots
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Time Slots</DialogTitle>
                      <DialogDescription>
                        Set your available time slots for{" "}
                        {format(selectedDate, "MMMM d, yyyy")}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {timeSlots.map((slot, index) => (
                        <div
                          key={slot.id}
                          className="flex items-center space-x-2"
                        >
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor={`start-${slot.id}`}>
                                Start Time
                              </Label>
                              <Input
                                id={`start-${slot.id}`}
                                type="time"
                                value={slot.startTime}
                                onChange={(e) =>
                                  updateTimeSlot(
                                    slot.id,
                                    "startTime",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`end-${slot.id}`}>End Time</Label>
                              <Input
                                id={`end-${slot.id}`}
                                type="time"
                                value={slot.endTime}
                                onChange={(e) =>
                                  updateTimeSlot(
                                    slot.id,
                                    "endTime",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeTimeSlot(slot.id)}
                            className="mt-6"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        onClick={addTimeSlot}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Time Slot
                      </Button>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={saveAvailability} disabled={saving}>
                        {saving ? "Saving..." : "Save Availability"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {getAvailabilityForDate(selectedDate).length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Current Time Slots:</h4>
                {getAvailabilityForDate(selectedDate).map((av) => (
                  <div
                    key={av.id}
                    className="flex items-center space-x-2 text-sm bg-muted p-2 rounded"
                  >
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(parseISO(av.start_datetime_utc), "HH:mm")} -{" "}
                      {format(parseISO(av.end_datetime_utc), "HH:mm")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
