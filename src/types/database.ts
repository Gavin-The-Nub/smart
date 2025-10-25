export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "student" | "tutor";
          full_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role: "student" | "tutor";
          full_name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: "student" | "tutor";
          full_name?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      credits: {
        Row: {
          id: string;
          user_id: string;
          available_balance: number;
          reserved_balance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          available_balance?: number;
          reserved_balance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          available_balance?: number;
          reserved_balance?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tutor_subjects: {
        Row: {
          id: string;
          tutor_id: string;
          subject_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tutor_id: string;
          subject_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tutor_id?: string;
          subject_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tutor_availability: {
        Row: {
          id: string;
          tutor_id: string;
          start_datetime_utc: string;
          end_datetime_utc: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tutor_id: string;
          start_datetime_utc: string;
          end_datetime_utc: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tutor_id?: string;
          start_datetime_utc?: string;
          end_datetime_utc?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          student_id: string;
          tutor_id: string;
          subject_id: string;
          start_datetime_utc: string;
          end_datetime_utc: string;
          duration_in_minutes: number;
          credits_required: number;
          status:
            | "pending"
            | "upcoming"
            | "completed"
            | "student_no_show"
            | "tutor_no_show"
            | "pending_review";
          meeting_link: string | null;
          student_feedback: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          tutor_id: string;
          subject_id: string;
          start_datetime_utc: string;
          end_datetime_utc: string;
          duration_in_minutes: number;
          credits_required: number;
          status:
            | "pending"
            | "upcoming"
            | "completed"
            | "student_no_show"
            | "tutor_no_show"
            | "pending_review";
          meeting_link?: string | null;
          student_feedback?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          tutor_id?: string;
          subject_id?: string;
          start_datetime_utc?: string;
          end_datetime_utc?: string;
          duration_in_minutes?: number;
          credits_required?: number;
          status?:
            | "pending"
            | "upcoming"
            | "completed"
            | "student_no_show"
            | "tutor_no_show"
            | "pending_review";
          meeting_link?: string | null;
          student_feedback?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Credit = Database["public"]["Tables"]["credits"]["Row"];
export type Subject = Database["public"]["Tables"]["subjects"]["Row"];
export type TutorSubject =
  Database["public"]["Tables"]["tutor_subjects"]["Row"];
export type TutorAvailability =
  Database["public"]["Tables"]["tutor_availability"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];

export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type CreditInsert = Database["public"]["Tables"]["credits"]["Insert"];
export type SubjectInsert = Database["public"]["Tables"]["subjects"]["Insert"];
export type TutorSubjectInsert =
  Database["public"]["Tables"]["tutor_subjects"]["Insert"];
export type TutorAvailabilityInsert =
  Database["public"]["Tables"]["tutor_availability"]["Insert"];
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
