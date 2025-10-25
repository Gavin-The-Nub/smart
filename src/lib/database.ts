import { supabase } from "./supabase";
import type {
  Profile,
  Credit,
  Subject,
  TutorSubject,
  TutorAvailability,
  Booking,
  ProfileInsert,
  CreditInsert,
  SubjectInsert,
  TutorSubjectInsert,
  TutorAvailabilityInsert,
  BookingInsert,
} from "@/types/database";

/**
 * Get the current user's profile
 */
export async function getCurrentUserProfile(): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

/**
 * Create a new profile
 */
export async function createProfile(
  profile: ProfileInsert
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating profile:", error);
    return null;
  }

  // Initialize credits for the new profile
  if (data && "id" in data) {
    await createCredits({ user_id: (data as Profile).id });
  }

  return data;
}

/**
 * Update the current user's profile
 */
export async function updateProfile(
  updates: Partial<Profile>
): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .update(updates as any)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }

  return data;
}

/**
 * Get the current user's credits
 */
export async function getCurrentUserCredits(): Promise<Credit | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("credits")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching credits:", error);
    return null;
  }

  return data;
}

/**
 * Create a new credits record
 */
export async function createCredits(
  credits: CreditInsert
): Promise<Credit | null> {
  const { data, error } = await supabase
    .from("credits")
    .insert(credits as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating credits:", error);
    return null;
  }

  return data;
}

/**
 * Update the current user's credits
 */
export async function updateCredits(
  updates: Partial<Credit>
): Promise<Credit | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("credits")
    .update(updates as any)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating credits:", error);
    return null;
  }

  return data;
}

/**
 * Add credits to the current user's available balance
 */
export async function addCredits(amount: number): Promise<Credit | null> {
  const current = await getCurrentUserCredits();

  if (!current) return null;

  return await updateCredits({
    available_balance: current.available_balance + amount,
  });
}

/**
 * Reserve credits for the current user
 */
export async function reserveCredits(amount: number): Promise<Credit | null> {
  const current = await getCurrentUserCredits();

  if (!current || current.available_balance < amount) {
    throw new Error("Insufficient credits");
  }

  return await updateCredits({
    available_balance: current.available_balance - amount,
    reserved_balance: current.reserved_balance + amount,
  });
}

/**
 * Release reserved credits back to available balance
 */
export async function releaseCredits(amount: number): Promise<Credit | null> {
  const current = await getCurrentUserCredits();

  if (!current || current.reserved_balance < amount) {
    throw new Error("Insufficient reserved credits");
  }

  return await updateCredits({
    available_balance: current.available_balance + amount,
    reserved_balance: current.reserved_balance - amount,
  });
}

// ============================================================================
// Subjects Functions
// ============================================================================

/**
 * Get all subjects
 */
export async function getAllSubjects(): Promise<Subject[]> {
  const { data, error } = await supabase.from("subjects").select("*");

  if (error) {
    console.error("Error fetching subjects:", error);
    return [];
  }

  return data || [];
}

/**
 * Get subject by ID
 */
export async function getSubjectById(id: string): Promise<Subject | null> {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching subject:", error);
    return null;
  }

  return data;
}

/**
 * Create a new subject (admin only - may need additional RLS)
 */
export async function createSubject(
  subject: SubjectInsert
): Promise<Subject | null> {
  const { data, error } = await supabase
    .from("subjects")
    .insert(subject as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating subject:", error);
    return null;
  }

  return data;
}

// ============================================================================
// Tutor Subjects Functions
// ============================================================================

/**
 * Get all subjects for a specific tutor
 */
export async function getTutorSubjects(
  tutorId: string
): Promise<TutorSubject[]> {
  const { data, error } = await supabase
    .from("tutor_subjects")
    .select("*")
    .eq("tutor_id", tutorId);

  if (error) {
    console.error("Error fetching tutor subjects:", error);
    return [];
  }

  return data || [];
}

/**
 * Get tutors for a specific subject
 */
export async function getSubjectTutors(
  subjectId: string
): Promise<TutorSubject[]> {
  const { data, error } = await supabase
    .from("tutor_subjects")
    .select("*")
    .eq("subject_id", subjectId);

  if (error) {
    console.error("Error fetching subject tutors:", error);
    return [];
  }

  return data || [];
}

/**
 * Add a subject to a tutor
 */
export async function addTutorSubject(
  tutorSubject: TutorSubjectInsert
): Promise<TutorSubject | null> {
  const { data, error } = await supabase
    .from("tutor_subjects")
    .insert(tutorSubject as any)
    .select()
    .single();

  if (error) {
    console.error("Error adding tutor subject:", error);
    return null;
  }

  return data;
}

/**
 * Remove a subject from a tutor
 */
export async function removeTutorSubject(id: string): Promise<boolean> {
  const { error } = await supabase.from("tutor_subjects").delete().eq("id", id);

  if (error) {
    console.error("Error removing tutor subject:", error);
    return false;
  }

  return true;
}

// ============================================================================
// Tutor Availability Functions
// ============================================================================

/**
 * Get availability for a specific tutor
 */
export async function getTutorAvailability(
  tutorId: string
): Promise<TutorAvailability[]> {
  const { data, error } = await supabase
    .from("tutor_availability")
    .select("*")
    .eq("tutor_id", tutorId)
    .order("start_datetime_utc", { ascending: true });

  if (error) {
    console.error("Error fetching tutor availability:", error);
    return [];
  }

  return data || [];
}

/**
 * Get availability by ID
 */
export async function getAvailabilityById(
  id: string
): Promise<TutorAvailability | null> {
  const { data, error } = await supabase
    .from("tutor_availability")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching availability:", error);
    return null;
  }

  return data;
}

/**
 * Create a new availability slot
 */
export async function createAvailability(
  availability: TutorAvailabilityInsert
): Promise<TutorAvailability | null> {
  const { data, error } = await supabase
    .from("tutor_availability")
    .insert(availability as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating availability:", error);
    return null;
  }

  return data;
}

/**
 * Update an availability slot
 */
export async function updateAvailability(
  id: string,
  updates: Partial<TutorAvailability>
): Promise<TutorAvailability | null> {
  const { data, error } = await supabase
    .from("tutor_availability")
    .update(updates as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating availability:", error);
    return null;
  }

  return data;
}

/**
 * Delete an availability slot
 */
export async function deleteAvailability(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("tutor_availability")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting availability:", error);
    return false;
  }

  return true;
}

/**
 * Get available tutors for a specific subject
 */
export async function getAvailableTutorsForSubject(
  subjectId: string,
  startTime?: string,
  endTime?: string
): Promise<TutorAvailability[]> {
  let query = supabase
    .from("tutor_availability")
    .select(
      `
      *,
      tutor_subjects!inner(subject_id)
    `
    )
    .eq("tutor_subjects.subject_id", subjectId);

  if (startTime) {
    query = query.gte("start_datetime_utc", startTime);
  }

  if (endTime) {
    query = query.lte("end_datetime_utc", endTime);
  }

  const { data, error } = await query.order("start_datetime_utc", {
    ascending: true,
  });

  if (error) {
    console.error("Error fetching available tutors:", error);
    return [];
  }

  return data || [];
}

// ============================================================================
// Bookings Functions
// ============================================================================

/**
 * Get all bookings for the current user (as student or tutor)
 */
export async function getUserBookings(): Promise<Booking[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .or(`student_id.eq.${user.id},tutor_id.eq.${user.id}`)
    .order("start_datetime_utc", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return data || [];
}

/**
 * Get upcoming bookings for the current user
 */
export async function getUpcomingBookings(): Promise<Booking[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .or(`student_id.eq.${user.id},tutor_id.eq.${user.id}`)
    .gte("start_datetime_utc", now)
    .order("start_datetime_utc", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming bookings:", error);
    return [];
  }

  return data || [];
}

/**
 * Get bookings by status
 */
export async function getBookingsByStatus(
  status: Booking["status"]
): Promise<Booking[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .or(`student_id.eq.${user.id},tutor_id.eq.${user.id}`)
    .eq("status", status)
    .order("start_datetime_utc", { ascending: false });

  if (error) {
    console.error("Error fetching bookings by status:", error);
    return [];
  }

  return data || [];
}

/**
 * Get booking by ID
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching booking:", error);
    return null;
  }

  return data;
}

/**
 * Create a new booking
 */
export async function createBooking(
  booking: BookingInsert
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .insert(booking as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating booking:", error);
    return null;
  }

  // Reserve credits for the booking
  if (
    data &&
    "credits_required" in data &&
    (data as Booking).credits_required > 0
  ) {
    try {
      await reserveCredits((data as Booking).credits_required);
    } catch (error) {
      console.error("Error reserving credits:", error);
      // Rollback booking creation if credit reservation fails
      await supabase
        .from("bookings")
        .delete()
        .eq("id", (data as Booking).id);
      return null;
    }
  }

  return data;
}

/**
 * Update a booking
 */
export async function updateBooking(
  id: string,
  updates: Partial<Booking>
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .update(updates as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating booking:", error);
    return null;
  }

  return data;
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  return await updateBooking(id, { status });
}

/**
 * Cancel a booking (delete if pending, or update status otherwise)
 */
export async function cancelBooking(id: string): Promise<boolean> {
  const booking = await getBookingById(id);

  if (!booking) return false;

  // If pending, delete the booking and release credits
  if (booking.status === "pending") {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      console.error("Error deleting booking:", error);
      return false;
    }

    // Release reserved credits
    try {
      await releaseCredits(booking.credits_required);
    } catch (error) {
      console.error("Error releasing credits:", error);
    }

    return true;
  }

  // Otherwise, update status to cancelled
  const updated = await updateBookingStatus(id, "pending_review");
  return updated !== null;
}

/**
 * Get student's bookings
 */
export async function getStudentBookings(
  studentId: string
): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("student_id", studentId)
    .order("start_datetime_utc", { ascending: false });

  if (error) {
    console.error("Error fetching student bookings:", error);
    return [];
  }

  return data || [];
}

/**
 * Get tutor's bookings
 */
export async function getTutorBookings(tutorId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("tutor_id", tutorId)
    .order("start_datetime_utc", { ascending: false });

  if (error) {
    console.error("Error fetching tutor bookings:", error);
    return [];
  }

  return data || [];
}

// ============================================================================
// Filtered Tutors Functions
// ============================================================================

/**
 * Get tutors filtered by subject and availability
 */
export async function getFilteredTutors(subjectId: string): Promise<
  {
    id: string;
    full_name: string;
    avatar_url: string | null;
  }[]
> {
  try {
    const { data, error } = await supabase.functions.invoke(
      "get-filtered-tutors",
      {
        body: { subject_id: subjectId },
      }
    );

    if (error) {
      console.error("Error calling get-filtered-tutors function:", error);
      return [];
    }

    return data?.tutors || [];
  } catch (error) {
    console.error("Error fetching filtered tutors:", error);
    return [];
  }
}

/**
 * Get true availability for a tutor on a specific date
 * Returns available time slots after subtracting booked times
 */
export async function getTrueAvailability(
  tutorId: string,
  date: string
): Promise<{ start: string; end: string }[]> {
  try {
    const { data, error } = await supabase.functions.invoke(
      "get-true-availability",
      {
        body: { tutor_id: tutorId, date },
      }
    );

    if (error) {
      console.error("Error calling get-true-availability function:", error);
      return [];
    }

    return data?.availability || [];
  } catch (error) {
    console.error("Error fetching true availability:", error);
    return [];
  }
}
