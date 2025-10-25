import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

    // Get the subject_id from the request
    const { subject_id } = await req.json();

    if (!subject_id) {
      return new Response(JSON.stringify({ error: "subject_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Query to get tutors who teach the subject and have future availability
    const { data, error } = await supabaseClient
      .from("tutor_subjects")
      .select(
        `
        tutor_id,
        profiles!inner(
          id,
          full_name,
          avatar_url
        )
      `
      )
      .eq("subject_id", subject_id);

    if (error) {
      console.error("Error fetching tutor subjects:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch tutor subjects" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ tutors: [] }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get tutor IDs
    const tutorIds = data.map((item) => item.tutor_id);

    // Check which tutors have future availability
    const now = new Date().toISOString();
    const { data: availabilityData, error: availabilityError } =
      await supabaseClient
        .from("tutor_availability")
        .select("tutor_id")
        .in("tutor_id", tutorIds)
        .gt("end_datetime_utc", now);

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

    // Get unique tutor IDs with future availability
    const tutorsWithAvailability = new Set(
      availabilityData?.map((item) => item.tutor_id) || []
    );

    // Filter tutors to only include those with future availability
    const filteredTutors = data
      .filter((item) => tutorsWithAvailability.has(item.tutor_id))
      .map((item) => ({
        id: item.profiles.id,
        full_name: item.profiles.full_name,
        avatar_url: item.profiles.avatar_url,
      }));

    return new Response(JSON.stringify({ tutors: filteredTutors }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in get-filtered-tutors function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
