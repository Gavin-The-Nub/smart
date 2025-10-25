import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export type UserRole = "admin" | "ops_admin" | "tutor" | "student";

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  role?: UserRole;
}

// Mock user data for frontend-only development
const MOCK_USER = {
  id: "mock-user-id",
  email: "demo@example.com",
  user_metadata: {
    full_name: "Demo User",
    role: "student",
  },
};

const MOCK_PROFILE: UserProfile = {
  id: "mock-user-id",
  user_id: "mock-user-id",
  full_name: "Demo User",
  email: "demo@example.com",
  role: "student",
};

export function useAuth() {
  const [user, setUser] = useState<any>(MOCK_USER);
  const [session, setSession] = useState<any>({ user: MOCK_USER });
  const [profile, setProfile] = useState<UserProfile | null>(MOCK_PROFILE);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole = "student"
  ) => {
    try {
      // Mock signup - just show success message
      toast({
        title: "Account Created",
        description: "Demo account created successfully!",
      });
      return { error: null };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast({
        title: "Sign Up Error",
        description: message,
        variant: "destructive",
      });
      return { error: new Error(message) };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Mock signin - just show success message
      toast({
        title: "Welcome back",
        description: "Signed in successfully (demo mode).",
      });
      return { error: null };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast({
        title: "Sign In Error",
        description: message,
        variant: "destructive",
      });
      return { error: new Error(message) };
    }
  };

  const signOut = async () => {
    try {
      // Mock signout - just show success message
      toast({
        title: "Signed out",
        description: "You have been signed out (demo mode).",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast({
        title: "Sign Out Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };
}
