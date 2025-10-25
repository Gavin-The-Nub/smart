import React from "react";

type Tutor = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
};

interface TutorCardProps {
  tutor: Tutor;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => (
  <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Avatar & Actions */}
      <div className="flex flex-col items-center lg:items-start flex-shrink-0 w-full lg:w-40 min-w-0 mb-4 lg:mb-0">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mb-3">
          {tutor.avatar_url ? (
            <img
              src={tutor.avatar_url}
              alt={tutor.full_name}
              className="w-full h-full object-cover rounded-lg border"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg border flex items-center justify-center">
              <span className="text-gray-600 font-medium text-2xl">
                {tutor.full_name?.charAt(0) || "T"}
              </span>
            </div>
          )}
        </div>
        <div className="w-full space-y-2">
          <div className="text-center lg:text-left text-base sm:text-lg font-semibold text-slate-900">
            Contact for Pricing
          </div>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">
            Book Now
          </button>
          <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors flex items-center justify-center gap-2">
            <span className="flex items-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <span>Contact</span>
          </button>
        </div>
      </div>

      {/* Middle: Tutor Info */}
      <div className="flex-1 min-w-0 space-y-3 sm:space-y-4 overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
              {tutor.full_name}
            </h3>
          </div>
          <button
            className="p-2.5 text-slate-400 hover:text-red-500 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-red-300 flex items-center justify-center"
            aria-label="Favorite"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate">{tutor.email}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">0.00</span>
            <span>(0)</span>
          </div>
          <span>0 Learners</span>
          <span>0 Sessions</span>
        </div>
        {tutor.bio && (
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-1.5 sm:mb-2">
              About
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4 sm:line-clamp-5">
              {tutor.bio}
            </p>
            <button className="text-blue-600 text-xs sm:text-sm mt-2 hover:underline font-semibold px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
              View Profile
            </button>
          </div>
        )}
      </div>

      {/* Right: Availability */}
      <div className="w-full lg:w-auto lg:flex-[1.2] min-w-0 mt-6 lg:mt-0 flex flex-col">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">
            Availability
          </h4>
          <p className="text-xs text-slate-600">
            Contact tutor to check availability
          </p>
        </div>
        <div className="mt-3 text-center">
          <button className="text-blue-600 text-xs sm:text-sm hover:underline font-semibold px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
            Check Availability
          </button>
        </div>
      </div>
    </div>
  </div>
);
