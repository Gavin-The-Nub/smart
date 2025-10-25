import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type AvailabilityRow = {
  id: string;
  day_of_week: number; // 0-6
  start_time: string; // HH:MM:SS
  end_time: string; // HH:MM:SS
  is_active: boolean;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function toTime(value: string) {
  // Ensure HH:MM:SS for DB
  if (/^\d{2}:\d{2}$/.test(value)) return `${value}:00`;
  return value;
}

export const AvailabilityEditor: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<AvailabilityRow[]>([]);
  const [form, setForm] = useState({ day: 1, start: "09:00", end: "17:00" });
  const [error, setError] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map: Record<number, AvailabilityRow[]> = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
    for (const r of rows) {
      map[r.day_of_week] = map[r.day_of_week] || [];
      map[r.day_of_week].push(r);
    }
    // sort by start_time
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => a.start_time.localeCompare(b.start_time))
    );
    return map;
  }, [rows]);

  useEffect(() => {
    if (!user?.id) return;
    void loadRows();
  }, [user?.id]);

  const loadRows = () => {
    // Mock data for frontend-only development
    const mockRows: AvailabilityRow[] = [
      {
        id: "avail-1",
        day_of_week: 1,
        start_time: "09:00:00",
        end_time: "17:00:00",
        is_active: true,
      },
      {
        id: "avail-2",
        day_of_week: 2,
        start_time: "09:00:00",
        end_time: "17:00:00",
        is_active: true,
      },
      {
        id: "avail-3",
        day_of_week: 3,
        start_time: "09:00:00",
        end_time: "17:00:00",
        is_active: true,
      },
    ];

    setRows(mockRows);
  };

  const addRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    // Mock add for frontend-only development
    const newRow: AvailabilityRow = {
      id: `avail-${Date.now()}`,
      day_of_week: form.day,
      start_time: toTime(form.start),
      end_time: toTime(form.end),
      is_active: true,
    };

    setRows((prev) => [...prev, newRow]);
  };

  const toggleActive = (row: AvailabilityRow) => {
    // Mock toggle for frontend-only development
    setRows((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, is_active: !r.is_active } : r))
    );
  };

  const removeRow = (id: string) => {
    // Mock remove for frontend-only development
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="text-base font-semibold text-gray-900">
          Set Weekly Availability
        </h4>
        <p className="text-sm text-gray-600">
          Add time ranges for each day. Students can book only within active
          ranges.
        </p>
      </div>

      <form onSubmit={addRow} className="flex flex-col sm:flex-row gap-3 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Day</label>
          <select
            className="px-3 py-2 border rounded-md w-full"
            value={form.day}
            onChange={(e) =>
              setForm((f) => ({ ...f, day: parseInt(e.target.value) }))
            }
          >
            {days.map((d, i) => (
              <option key={i} value={i}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1">Start</label>
          <input
            type="time"
            className="px-3 py-2 border rounded-md w-full"
            value={form.start}
            onChange={(e) => setForm((f) => ({ ...f, start: e.target.value }))}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1">End</label>
          <input
            type="time"
            className="px-3 py-2 border rounded-md w-full"
            value={form.end}
            onChange={(e) => setForm((f) => ({ ...f, end: e.target.value }))}
            required
          />
        </div>
        <div className="self-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 text-sm rounded">
          {error}
        </div>
      )}

      <div className="divide-y border rounded-md">
        {Object.entries(grouped).map(([dayIndex, list]) => (
          <div key={dayIndex} className="p-4">
            <div className="font-medium text-gray-900 mb-2">
              {days[Number(dayIndex)]}
            </div>
            {list.length === 0 ? (
              <div className="text-sm text-gray-500">No ranges</div>
            ) : (
              <ul className="space-y-2">
                {list.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between bg-gray-50 rounded p-2"
                  >
                    <div className="text-sm text-gray-800">
                      {r.start_time.slice(0, 5)} - {r.end_time.slice(0, 5)}
                      <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          r.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {r.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleActive(r)}
                        className="px-3 py-1 text-xs rounded border hover:bg-white"
                        disabled={loading}
                      >
                        {r.is_active ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => removeRow(r.id)}
                        className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityEditor;
