import React from "react";
import { FilteredTutorsList } from "@/components/tutors/FilteredTutorsList";

export default function TestFilteredTutors() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Test Filtered Tutors
          </h1>
          <p className="text-muted-foreground mt-2">
            Test the getFilteredTutors functionality
          </p>
        </div>

        <FilteredTutorsList />
      </div>
    </div>
  );
}
