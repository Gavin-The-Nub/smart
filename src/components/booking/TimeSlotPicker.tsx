import React, { useState, useEffect } from "react";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  startTime?: string;
  endTime?: string;
  duration: number;
}

interface TimeSlotPickerProps {
  tutorId: string;
  onSlotSelect: (slot: TimeSlot | null) => void;
  selectedSlot?: TimeSlot | null;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  tutorId,
  onSlotSelect,
  selectedSlot,
}) => {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    if (tutorId) {
      loadAvailableSlots();
    }
  }, [tutorId]);

  const loadAvailableSlots = () => {
    // Mock data for frontend-only development
    const mockSlots: TimeSlot[] = [
      {
        id: "slot-1",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        time: "09:00 - 17:00",
        duration: 60,
      },
      {
        id: "slot-2",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        time: "10:00 - 16:00",
        duration: 60,
      },
      {
        id: "slot-3",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        time: "14:00 - 18:00",
        duration: 60,
      },
    ];

    setAvailableSlots(mockSlots);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    const updatedSlot = {
      ...slot,
      startTime: "14:00",
      endTime: "15:00",
    };
    onSlotSelect(updatedSlot);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select Time Slot</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableSlots.map((slot) => (
          <div
            key={slot.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedSlot?.id === slot.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleSlotSelect(slot)}
          >
            <div className="text-sm font-medium text-gray-900">
              {new Date(slot.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-sm text-gray-600">{slot.time}</div>
            <div className="text-xs text-gray-500">{slot.duration} minutes</div>
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Selected Slot</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedSlot.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Available:</strong> {selectedSlot.time}
            </p>
            <p>
              <strong>Duration:</strong> {selectedSlot.duration} minutes
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
