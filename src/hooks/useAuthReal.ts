import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

export type UserRole = "admin" | "ops_admin" | "tutor" | "student";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export function useAuthReal() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole = "student"
  ) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          role,
          full_name: fullName,
        });

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }

        // Create credits
        const { error: creditsError } = await supabase.from("credits").insert({
          user_id: data.user.id,
          available_balance: role === "tutor" ? 100 : 50,
          reserved_balance: 0,
        });

        if (creditsError) {
          console.error("Error creating credits:", creditsError);
        }
      }

      toast({
        title: "Account Created",
        description: "Please check your email to confirm your account.",
      });

      return { error: null };
    } catch (error: any) {
      const message = error.message || "Unexpected error";
      toast({
        title: "Sign Up Error",
        description: message,
        variant: "destructive",
      });
      return { error: new Error(message) };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        await fetchProfile(data.user.id);
      }

      toast({
        title: "Welcome back",
        description: "Signed in successfully.",
      });

      return { error: null };
    } catch (error: any) {
      const message = error.message || "Unexpected error";
      toast({
        title: "Sign In Error",
        description: message,
        variant: "destructive",
      });
      return { error: new Error(message) };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
      setProfile(null);

      toast({
        title: "Signed out",
        description: "You have been signed out.",
      });
    } catch (error: any) {
      const message = error.message || "Unexpected error";
      toast({
        title: "Sign Out Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };
}
