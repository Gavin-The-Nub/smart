import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubjectSelector } from "@/components/tutors/SubjectSelector";
import { AvailabilityCalendar } from "@/components/tutors/AvailabilityCalendar";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { BookOpen, Calendar, CheckCircle } from "lucide-react";
import type { TutorAvailability } from "@/types/database";

export default function TutorSetup() {
  const { user } = useAuth();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availability, setAvailability] = useState<TutorAvailability[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "subjects" | "availability" | "complete"
  >("subjects");

  // Redirect if not a tutor
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSubjectsChange = (subjects: string[]) => {
    setSelectedSubjects(subjects);
  };

  const handleAvailabilityChange = (availability: TutorAvailability[]) => {
    setAvailability(availability);
  };

  const handleNext = () => {
    if (currentStep === "subjects") {
      setCurrentStep("availability");
    } else if (currentStep === "availability") {
      setCurrentStep("complete");
    }
  };

  const handleBack = () => {
    if (currentStep === "availability") {
      setCurrentStep("subjects");
    }
  };

  const handleComplete = () => {
    // Redirect to dashboard or tutor profile
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Tutor Setup</h1>
          <p className="text-muted-foreground mt-2">
            Set up your tutoring profile to start teaching students
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                currentStep === "subjects"
                  ? "text-primary"
                  : currentStep === "availability" || currentStep === "complete"
                  ? "text-green-600"
                  : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "subjects"
                    ? "bg-primary text-primary-foreground"
                    : currentStep === "availability" ||
                      currentStep === "complete"
                    ? "bg-green-600 text-white"
                    : "bg-muted"
                }`}
              >
                {currentStep === "availability" ||
                currentStep === "complete" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  "1"
                )}
              </div>
              <span className="text-sm font-medium">Subjects</span>
            </div>

            <div
              className={`w-8 h-0.5 ${
                currentStep === "availability" || currentStep === "complete"
                  ? "bg-green-600"
                  : "bg-muted"
              }`}
            />

            <div
              className={`flex items-center space-x-2 ${
                currentStep === "availability"
                  ? "text-primary"
                  : currentStep === "complete"
                  ? "text-green-600"
                  : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "availability"
                    ? "bg-primary text-primary-foreground"
                    : currentStep === "complete"
                    ? "bg-green-600 text-white"
                    : "bg-muted"
                }`}
              >
                {currentStep === "complete" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  "2"
                )}
              </div>
              <span className="text-sm font-medium">Availability</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === "subjects" && (
          <div className="space-y-6">
            <SubjectSelector onSubjectsChange={handleSubjectsChange} />

            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                disabled={selectedSubjects.length === 0}
                className="min-w-[120px]"
              >
                Next: Set Availability
              </Button>
            </div>
          </div>
        )}

        {currentStep === "availability" && (
          <div className="space-y-6">
            <AvailabilityCalendar
              onAvailabilityChange={handleAvailabilityChange}
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back: Select Subjects
              </Button>
              <Button
                onClick={handleNext}
                disabled={availability.length === 0}
                className="min-w-[120px]"
              >
                Complete Setup
              </Button>
            </div>
          </div>
        )}

        {currentStep === "complete" && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Setup Complete!</CardTitle>
                <CardDescription>
                  Your tutor profile is ready. Students can now book sessions
                  with you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Subjects Selected</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedSubjects.length} subject
                        {selectedSubjects.length !== 1 ? "s" : ""} chosen
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Availability Set</p>
                      <p className="text-sm text-muted-foreground">
                        {availability.length} time slot
                        {availability.length !== 1 ? "s" : ""} available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={handleComplete}
                    size="lg"
                    className="min-w-[200px]"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
