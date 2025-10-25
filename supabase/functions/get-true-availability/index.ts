import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TimeSlot {
  start: string;
  end: string;
}

interface AvailabilityBlock {
  start_datetime_utc: string;
  end_datetime_utc: string;
}

interface Booking {
  start_datetime_utc: string;
  end_datetime_utc: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the tutor_id and date from the request
    const { tutor_id, date } = await req.json();

    if (!tutor_id || !date) {
      return new Response(
        JSON.stringify({ error: "tutor_id and date are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the date to get start and end of day in UTC
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // 1. Fetch all tutor_availability blocks for that tutor_id on that date
    const { data: availabilityData, error: availabilityError } =
      await supabaseClient
        .from("tutor_availability")
        .select("start_datetime_utc, end_datetime_utc")
        .eq("tutor_id", tutor_id)
        .gte("start_datetime_utc", startOfDay.toISOString())
        .lte("start_datetime_utc", endOfDay.toISOString());

    if (availabilityError) {
      console.error("Error fetching tutor availability:", availabilityError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch tutor availability" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 2. Fetch all bookings with 'upcoming' status for that tutor_id on that date
    const { data: bookingsData, error: bookingsError } = await supabaseClient
      .from("bookings")
      .select("start_datetime_utc, end_datetime_utc")
      .eq("tutor_id", tutor_id)
      .eq("status", "upcoming")
      .gte("start_datetime_utc", startOfDay.toISOString())
      .lte("start_datetime_utc", endOfDay.toISOString());

    if (bookingsError) {
      console.error("Error fetching bookings:", bookingsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch bookings" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 3. Calculate true availability by subtracting booked times
    const trueAvailability = calculateTrueAvailability(
      availabilityData || [],
      bookingsData || []
    );

    return new Response(JSON.stringify({ availability: trueAvailability }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in get-true-availability function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

/**
 * Calculate true availability by subtracting booked times from availability blocks
 */
function calculateTrueAvailability(
  availabilityBlocks: AvailabilityBlock[],
  bookings: Booking[]
): TimeSlot[] {
  if (availabilityBlocks.length === 0) {
    return [];
  }

  // Convert all times to minutes since midnight for easier calculation
  const availabilityIntervals = availabilityBlocks.map((block) => ({
    start: timeToMinutes(block.start_datetime_utc),
    end: timeToMinutes(block.end_datetime_utc),
  }));

  const bookingIntervals = bookings.map((booking) => ({
    start: timeToMinutes(booking.start_datetime_utc),
    end: timeToMinutes(booking.end_datetime_utc),
  }));

  // Sort intervals by start time
  availabilityIntervals.sort((a, b) => a.start - b.start);
  bookingIntervals.sort((a, b) => a.start - b.start);

  const result: TimeSlot[] = [];

  for (const availability of availabilityIntervals) {
    // Find all bookings that overlap with this availability block
    const overlappingBookings = bookingIntervals.filter(
      (booking) =>
        booking.start < availability.end && booking.end > availability.start
    );

    if (overlappingBookings.length === 0) {
      // No bookings overlap with this availability block
      result.push({
        start: minutesToTime(availability.start),
        end: minutesToTime(availability.end),
      });
    } else {
      // Subtract overlapping bookings from availability
      const freeSlots = subtractBookingsFromAvailability(
        availability,
        overlappingBookings
      );
      result.push(...freeSlots);
    }
  }

  return result;
}

/**
 * Subtract booking intervals from an availability interval
 */
function subtractBookingsFromAvailability(
  availability: { start: number; end: number },
  bookings: { start: number; end: number }[]
): TimeSlot[] {
  const result: TimeSlot[] = [];
  let currentStart = availability.start;

  // Sort bookings by start time
  bookings.sort((a, b) => a.start - b.start);

  for (const booking of bookings) {
    // If there's a gap before this booking, add it as a free slot
    if (currentStart < booking.start) {
      result.push({
        start: minutesToTime(currentStart),
        end: minutesToTime(booking.start),
      });
    }

    // Move current start to after this booking
    currentStart = Math.max(currentStart, booking.end);
  }

  // If there's remaining time after all bookings, add it as a free slot
  if (currentStart < availability.end) {
    result.push({
      start: minutesToTime(currentStart),
      end: minutesToTime(availability.end),
    });
  }

  return result;
}

/**
 * Convert datetime string to minutes since midnight
 */
function timeToMinutes(datetime: string): number {
  const date = new Date(datetime);
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

/**
 * Convert minutes since midnight to time string (HH:MM)
 */
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}
