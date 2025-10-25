import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFilteredTutors, getAllSubjects } from "@/lib/database";
import type { Subject } from "@/types/database";
import { Loader2, Users } from "lucide-react";

interface Tutor {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

export function FilteredTutorsList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(false);
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  // Load subjects on component mount
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setSubjectsLoading(true);
        const allSubjects = await getAllSubjects();
        setSubjects(allSubjects);
      } catch (error) {
        console.error("Error loading subjects:", error);
      } finally {
        setSubjectsLoading(false);
      }
    };

    loadSubjects();
  }, []);

  // Load tutors when subject is selected
  const handleSubjectChange = async (subjectId: string) => {
    setSelectedSubjectId(subjectId);

    if (!subjectId) {
      setTutors([]);
      return;
    }

    try {
      setLoading(true);
      const filteredTutors = await getFilteredTutors(subjectId);
      setTutors(filteredTutors);
    } catch (error) {
      console.error("Error loading tutors:", error);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  if (subjectsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Find Tutors</CardTitle>
          <CardDescription>
            Select a subject to find available tutors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading subjects...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Tutors</CardTitle>
        <CardDescription>
          Select a subject to find tutors who are available to teach
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Select Subject
          </label>
          <Select value={selectedSubjectId} onValueChange={handleSubjectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a subject..." />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Finding tutors...</span>
          </div>
        )}

        {!loading && selectedSubjectId && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                Available Tutors ({tutors.length})
              </h3>
            </div>

            {tutors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tutors available for this subject at the moment.</p>
                <p className="text-sm">Try selecting a different subject.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tutors.map((tutor) => (
                  <Card key={tutor.id} className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={tutor.avatar_url || undefined} />
                        <AvatarFallback>
                          {tutor.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">
                          {tutor.full_name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Available for tutoring
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button size="sm" className="w-full">
                        Book Session
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {!selectedSubjectId && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a subject above to find available tutors.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
