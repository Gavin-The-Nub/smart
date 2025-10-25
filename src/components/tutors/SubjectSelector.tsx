import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  getAllSubjects,
  getTutorSubjects,
  addTutorSubject,
  removeTutorSubject,
} from "@/lib/database";
import type { Subject, TutorSubject } from "@/types/database";
import { useAuthReal as useAuth } from "@/hooks/useAuthReal";
import { toast } from "sonner";

interface SubjectSelectorProps {
  onSubjectsChange?: (subjects: string[]) => void;
}

export function SubjectSelector({ onSubjectsChange }: SubjectSelectorProps) {
  const { user } = useAuth();
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [tutorSubjects, setTutorSubjects] = useState<TutorSubject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load all subjects and tutor's current subjects
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [subjects, tutorSubs] = await Promise.all([
          getAllSubjects(),
          getTutorSubjects(user.id),
        ]);

        setAllSubjects(subjects);
        setTutorSubjects(tutorSubs);

        // Initialize selected subjects with tutor's current subjects
        const selected = new Set(tutorSubs.map((ts) => ts.subject_id));
        setSelectedSubjects(selected);

        if (onSubjectsChange) {
          onSubjectsChange(Array.from(selected));
        }
      } catch (error) {
        console.error("Error loading subjects:", error);
        toast.error("Failed to load subjects");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, onSubjectsChange]);

  const handleSubjectToggle = (subjectId: string, checked: boolean) => {
    const newSelected = new Set(selectedSubjects);
    if (checked) {
      newSelected.add(subjectId);
    } else {
      newSelected.delete(subjectId);
    }
    setSelectedSubjects(newSelected);

    if (onSubjectsChange) {
      onSubjectsChange(Array.from(newSelected));
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      // Get current tutor subjects
      const currentSubjectIds = new Set(
        tutorSubjects.map((ts) => ts.subject_id)
      );
      const newSubjectIds = selectedSubjects;

      // Find subjects to add
      const toAdd = Array.from(newSubjectIds).filter(
        (id) => !currentSubjectIds.has(id)
      );

      // Find subjects to remove
      const toRemove = tutorSubjects.filter(
        (ts) => !newSubjectIds.has(ts.subject_id)
      );

      // Add new subjects
      for (const subjectId of toAdd) {
        await addTutorSubject({
          tutor_id: user.id,
          subject_id: subjectId,
        });
      }

      // Remove subjects
      for (const tutorSubject of toRemove) {
        await removeTutorSubject(tutorSubject.id);
      }

      // Reload tutor subjects
      const updatedTutorSubjects = await getTutorSubjects(user.id);
      setTutorSubjects(updatedTutorSubjects);

      toast.success("Subjects updated successfully");
    } catch (error) {
      console.error("Error saving subjects:", error);
      toast.error("Failed to save subjects");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select Subjects</CardTitle>
          <CardDescription>
            Choose the subjects you want to teach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              Loading subjects...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Subjects</CardTitle>
        <CardDescription>
          Choose the subjects you want to teach. Students will be able to book
          sessions for these subjects.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allSubjects.map((subject) => (
            <div key={subject.id} className="flex items-center space-x-2">
              <Checkbox
                id={subject.id}
                checked={selectedSubjects.has(subject.id)}
                onCheckedChange={(checked) =>
                  handleSubjectToggle(subject.id, checked as boolean)
                }
              />
              <Label
                htmlFor={subject.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {subject.name}
              </Label>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="min-w-[120px]"
          >
            {saving ? "Saving..." : "Save Subjects"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
