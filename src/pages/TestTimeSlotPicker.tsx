import React, { useState } from "react";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

interface TimeSlot {
  start: string;
  end: string;
}

// Mock tutor data for testing
const mockTutors = [
  {
    id: "tutor-1",
    name: "Dr. Sarah Johnson",
    subjects: ["Math", "Physics"],
  },
  {
    id: "tutor-2",
    name: "Prof. Michael Chen",
    subjects: ["Chemistry", "Biology"],
  },
  {
    id: "tutor-3",
    name: "Ms. Emily Davis",
    subjects: ["English", "History"],
  },
];

export default function TestTimeSlotPicker() {
  const [selectedTutor, setSelectedTutor] = useState(mockTutors[0]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleTutorChange = (tutor: (typeof mockTutors)[0]) => {
    setSelectedTutor(tutor);
    setSelectedSlot(null); // Reset selected slot when changing tutor
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Test Time Slot Picker
          </h1>
          <p className="text-muted-foreground mt-2">
            Test the getTrueAvailability functionality with time slot selection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tutor Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Select Tutor</span>
                </CardTitle>
                <CardDescription>
                  Choose a tutor to see their availability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTutors.map((tutor) => (
                  <Button
                    key={tutor.id}
                    variant={
                      selectedTutor.id === tutor.id ? "default" : "outline"
                    }
                    onClick={() => handleTutorChange(tutor)}
                    className="w-full justify-start h-auto py-3"
                  >
                    <div className="text-left">
                      <div className="font-medium">{tutor.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {tutor.subjects.join(", ")}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Selected Slot Summary */}
            {selectedSlot && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Selected Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {selectedTutor.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {selectedDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {selectedSlot.start} - {selectedSlot.end}
                      </span>
                    </div>
                    <div className="pt-2">
                      <Button size="sm" className="w-full">
                        Book This Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Time Slot Picker */}
          <div className="lg:col-span-2">
            <TimeSlotPicker
              tutorId={selectedTutor.id}
              tutorName={selectedTutor.name}
              onSlotSelect={handleSlotSelect}
              selectedSlot={selectedSlot}
            />
          </div>
        </div>

        {/* Debug Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Debug Information</CardTitle>
            <CardDescription>
              Current state and API calls for testing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Current Selection:</h4>
                <div className="space-y-1">
                  <p>
                    <strong>Tutor ID:</strong> {selectedTutor.id}
                  </p>
                  <p>
                    <strong>Tutor Name:</strong> {selectedTutor.name}
                  </p>
                  <p>
                    <strong>Selected Date:</strong>{" "}
                    {selectedDate.toISOString().split("T")[0]}
                  </p>
                  <p>
                    <strong>Selected Slot:</strong>{" "}
                    {selectedSlot
                      ? `${selectedSlot.start} - ${selectedSlot.end}`
                      : "None"}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">API Call:</h4>
                <div className="bg-muted p-3 rounded text-xs font-mono">
                  <p>Function: getTrueAvailability</p>
                  <p>Parameters:</p>
                  <p> tutor_id: "{selectedTutor.id}"</p>
                  <p> date: "{selectedDate.toISOString().split("T")[0]}"</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
