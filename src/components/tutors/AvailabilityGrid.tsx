import React from "react";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const timeSlots = [
  "00 - 04",
  "04 - 08",
  "08 - 12",
  "12 - 16",
  "16 - 20",
  "20 - 24",
];

interface AvailabilityGridProps {
  availability: boolean[][]; // [day][slot]
}

export const AvailabilityGrid: React.FC<AvailabilityGridProps> = ({
  availability,
}) => (
  <div className="w-full">
    <div className="bg-slate-50 rounded-lg border p-3 sm:p-4 overflow-x-auto w-full mx-auto min-h-[260px]">
      <h3 className="text-base sm:text-lg font-semibold mb-3 pb-2 border-b-2 border-blue-600 text-center w-full">
        Availability
      </h3>
      <div className="w-full overflow-x-auto">
        <table className="min-w-[420px] w-full table-fixed border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="bg-slate-50 w-1/8"></th>
              {days.map((day) => (
                <th
                  key={day}
                  className="text-xs sm:text-sm font-semibold text-center text-slate-700 w-1/8 px-2 py-1 bg-slate-100 border-b border-slate-200"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, slotIdx) => (
              <tr key={timeSlot}>
                <td className="text-xs sm:text-sm text-slate-500 font-medium text-right pr-2 bg-slate-50 border-r border-slate-200 w-1/8">
                  {timeSlot}
                </td>
                {days.map((day, dayIdx) => (
                  <td
                    key={`${dayIdx}-${slotIdx}`}
                    className="p-0 align-middle w-1/8"
                  >
                    <span
                      className={`block mx-auto my-1 rounded-full w-3 h-3 sm:w-4 sm:h-4 ${
                        availability[dayIdx]?.[slotIdx]
                          ? "bg-green-500"
                          : "bg-slate-300 opacity-40"
                      }`}
                      aria-label={`${days[dayIdx]} ${timeSlot}: ${
                        availability[dayIdx]?.[slotIdx]
                          ? "Available"
                          : "Unavailable"
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
