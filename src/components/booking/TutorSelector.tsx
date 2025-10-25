import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type Tutor = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
};

interface TutorSelectorProps {
  onTutorSelect: (tutor: Tutor) => void;
  selectedTutor?: Tutor | null;
}

export const TutorSelector: React.FC<TutorSelectorProps> = ({
  onTutorSelect,
  selectedTutor,
}) => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = () => {
    // Mock data for frontend-only development
    const mockTutors: Tutor[] = [
      {
        id: "tutor-1",
        user_id: "tutor-user-1",
        full_name: "Dr. Sarah Johnson",
        email: "sarah@example.com",
        bio: "Mathematics and Physics tutor with 10+ years experience",
        avatar_url: undefined,
      },
      {
        id: "tutor-2",
        user_id: "tutor-user-2",
        full_name: "Prof. Michael Chen",
        email: "michael@example.com",
        bio: "Chemistry and Biology specialist",
        avatar_url: undefined,
      },
      {
        id: "tutor-3",
        user_id: "tutor-user-3",
        full_name: "Ms. Emily Rodriguez",
        email: "emily@example.com",
        bio: "English Literature and Writing tutor",
        avatar_url: undefined,
      },
    ];

    setTutors(mockTutors);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Select a Tutor</h3>
        <button
          onClick={loadTutors}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedTutor?.id === tutor.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onTutorSelect(tutor)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {tutor.avatar_url ? (
                  <img
                    src={tutor.avatar_url}
                    alt={tutor.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 font-medium">
                    {tutor.full_name?.charAt(0) || "T"}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {tutor.full_name}
                </h4>
                <p className="text-xs text-gray-500">ID: {tutor.user_id}</p>
                {tutor.bio && (
                  <p className="text-xs text-gray-400 truncate mt-1">
                    {tutor.bio}
                  </p>
                )}
              </div>
              {selectedTutor?.id === tutor.id && (
                <div className="text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {tutors.length === 0 && !loading && !error && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            No Tutors Available
          </h4>
          <p className="text-sm text-blue-700">
            There are no tutors with the "tutor" role in the profiles table.
            Please ensure tutors have been created with the correct role.
          </p>
        </div>
      )}
    </div>
  );
};

export default TutorSelector;
