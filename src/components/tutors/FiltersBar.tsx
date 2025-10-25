import React from 'react';

interface FiltersBarProps {
  filters: any;
  onChange: (key: string, value: any) => void;
  onMoreFilters: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({ filters, onChange, onMoreFilters }) => (
  <div className="w-full rounded-xl bg-white/80 border border-slate-100 shadow-sm px-3 sm:px-6 py-4 mb-4 flex flex-col gap-4">
    {/* Search input row */}
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <label htmlFor="search" className="sr-only">Search by teacher name</label>
      <div className="relative flex-1 min-w-0">
        <input
          id="search"
          type="text"
          value={filters.search}
          onChange={e => onChange('search', e.target.value)}
          placeholder="Search by teacher name"
          className="pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none text-base w-full truncate min-w-0"
        />
        <span className="absolute left-3 top-2.5 text-slate-400">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </span>
      </div>
      <button
        type="button"
        className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 shadow-sm text-base font-semibold transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center gap-2"
        onClick={onMoreFilters}
        aria-haspopup="dialog"
      >
  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>
  <span>More Filters</span>
      </button>
    </div>
    {/* Filter selects row */}
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <label htmlFor="subject" className="sr-only">Subject</label>
      <div className="relative flex-1 min-w-0">
        <select
          id="subject"
          value={filters.subject}
          onChange={e => onChange('subject', e.target.value)}
          className="appearance-none flex-1 rounded-lg border border-slate-200 bg-white shadow-sm px-3 pr-8 py-2 text-base focus:ring-2 focus:ring-blue-200 focus:outline-none min-w-0 w-full"
        >
          <option value="">All Subjects</option>
          {/* Add more subjects dynamically if needed */}
          <option value="English">English</option>
          <option value="Math">Math</option>
          <option value="German">German</option>
          <option value="Spanish">Spanish</option>
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
      <label htmlFor="price" className="sr-only">Price</label>
      <div className="relative flex-1 min-w-0">
        <select
          id="price"
          value={filters.price}
          onChange={e => onChange('price', e.target.value)}
          className="appearance-none flex-1 rounded-lg border border-slate-200 bg-white shadow-sm px-3 pr-8 py-2 text-base focus:ring-2 focus:ring-blue-200 focus:outline-none min-w-0 w-full"
        >
          <option value="">All Prices</option>
          <option value="low">$0-20</option>
          <option value="mid">$21-40</option>
          <option value="high">$41+</option>
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
      <label htmlFor="availability" className="sr-only">Availability</label>
      <div className="relative flex-1 min-w-0">
        <select
          id="availability"
          value={filters.availability}
          onChange={e => onChange('availability', e.target.value)}
          className="appearance-none flex-1 rounded-lg border border-slate-200 bg-white shadow-sm px-3 pr-8 py-2 text-base focus:ring-2 focus:ring-blue-200 focus:outline-none min-w-0 w-full"
        >
          <option value="">Select Timing</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
    </div>
  </div>
);
