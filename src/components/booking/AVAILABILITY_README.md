# True Availability Logic Implementation

This document explains the implementation of the "Get Specific Availability" functionality, which calculates actual available time slots by subtracting booked times from tutor availability blocks.

## Overview

The `getTrueAvailability` function is the most complex part of the booking system. It solves the problem of determining when a tutor is actually available by:

1. Fetching all availability blocks for a tutor on a specific date
2. Fetching all existing bookings for that tutor on that date
3. Calculating the "true" availability by subtracting booked times from availability blocks

## Architecture

### 1. Supabase Edge Function (`supabase/functions/get-true-availability/`)

**Purpose**: Server-side function that performs complex time interval calculations.

**Location**: `supabase/functions/get-true-availability/index.ts`

**Input Parameters**:

- `tutor_id`: UUID of the tutor
- `date`: Date string (YYYY-MM-DD format)

**Output**:

```json
{
  "availability": [
    {
      "start": "09:00",
      "end": "10:00"
    },
    {
      "start": "11:00",
      "end": "12:00"
    }
  ]
}
```

**Core Algorithm**:

1. **Fetch Availability Blocks**: Get all `tutor_availability` records for the tutor on the specified date
2. **Fetch Existing Bookings**: Get all `bookings` with status 'upcoming' for the tutor on that date
3. **Time Interval Math**: For each availability block:
   - Find all overlapping bookings
   - Subtract booked time intervals from availability intervals
   - Return remaining free time slots

**Example**:

- Availability: 9:00 AM - 12:00 PM
- Booking: 10:00 AM - 11:00 AM
- Result: [9:00-10:00, 11:00-12:00]

### 2. Client-side Function (`src/lib/database.ts`)

**Function**: `getTrueAvailability(tutorId: string, date: string)`

**Usage**:

```typescript
import { getTrueAvailability } from "@/lib/database";

const slots = await getTrueAvailability("tutor-uuid", "2024-01-15");
// Returns: [{ start: '09:00', end: '10:00' }, { start: '11:00', end: '12:00' }]
```

### 3. Time Slot Picker Component (`src/components/booking/TimeSlotPicker.tsx`)

**Purpose**: React component that displays available time slots for student booking.

**Features**:

- Date selection (next 14 days)
- Time slot grid display
- Slot selection with visual feedback
- Loading states and error handling
- Responsive design

## Time Interval Mathematics

The core challenge is efficiently calculating time interval differences. The implementation uses:

### Time Conversion

- Convert all times to "minutes since midnight" for easier math
- Example: 09:30 → 570 minutes, 11:45 → 705 minutes

### Interval Subtraction Algorithm

```typescript
function subtractBookingsFromAvailability(availability, bookings) {
  const result = [];
  let currentStart = availability.start;

  for (const booking of sortedBookings) {
    // Add gap before booking as free slot
    if (currentStart < booking.start) {
      result.push({ start: currentStart, end: booking.start });
    }

    // Move past this booking
    currentStart = Math.max(currentStart, booking.end);
  }

  // Add remaining time after all bookings
  if (currentStart < availability.end) {
    result.push({ start: currentStart, end: availability.end });
  }

  return result;
}
```

## Database Schema Requirements

### `tutor_availability` Table

- `tutor_id`: UUID reference to profiles
- `start_datetime_utc`: Start time of availability block
- `end_datetime_utc`: End time of availability block

### `bookings` Table

- `tutor_id`: UUID reference to profiles
- `start_datetime_utc`: Start time of booking
- `end_datetime_utc`: End time of booking
- `status`: Must be 'upcoming' to be considered

## Edge Cases Handled

1. **No Availability**: Returns empty array if tutor has no availability blocks
2. **No Bookings**: Returns all availability blocks as free slots
3. **Overlapping Bookings**: Correctly handles multiple overlapping bookings
4. **Partial Overlaps**: Handles bookings that partially overlap availability
5. **Exact Matches**: Handles bookings that exactly match availability boundaries
6. **Time Zone**: All calculations done in UTC for consistency

## Performance Considerations

1. **Database Indexes**: Ensure indexes on:

   - `tutor_availability(tutor_id, start_datetime_utc)`
   - `bookings(tutor_id, status, start_datetime_utc)`

2. **Query Optimization**:

   - Single query for availability blocks
   - Single query for bookings
   - Client-side interval math (fast)

3. **Caching**: Consider caching results for frequently accessed dates

## Testing

### Test Scenarios

1. **Basic Availability**: Tutor has 9:00-17:00 availability, no bookings
2. **Single Booking**: Tutor has 9:00-17:00 availability, 10:00-11:00 booking
3. **Multiple Bookings**: Tutor has 9:00-17:00 availability, multiple bookings
4. **Overlapping Bookings**: Bookings that overlap with each other
5. **Edge Bookings**: Bookings at start/end of availability blocks
6. **No Availability**: Tutor has no availability blocks
7. **Fully Booked**: All availability is booked

### Test Page

Visit `/test-time-slot-picker` to test the complete functionality with:

- Mock tutor data
- Interactive date selection
- Real-time slot loading
- Visual feedback

## API Reference

### Edge Function Endpoint

**URL**: `https://your-project.supabase.co/functions/v1/get-true-availability`

**Method**: POST

**Headers**:

```
Content-Type: application/json
Authorization: Bearer <supabase-anon-key>
```

**Request Body**:

```json
{
  "tutor_id": "uuid",
  "date": "2024-01-15"
}
```

**Response**:

```json
{
  "availability": [
    {
      "start": "09:00",
      "end": "10:00"
    },
    {
      "start": "11:00",
      "end": "12:00"
    }
  ]
}
```

## Deployment

### Deploy Edge Function

```bash
supabase functions deploy get-true-availability
```

### Test Function

```bash
# Test with curl
curl -X POST 'https://your-project.supabase.co/functions/v1/get-true-availability' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"tutor_id": "tutor-uuid", "date": "2024-01-15"}'
```

## Error Handling

The implementation includes comprehensive error handling:

1. **Input Validation**: Checks for required `tutor_id` and `date`
2. **Date Parsing**: Validates date format and handles timezone issues
3. **Database Errors**: Catches and logs database query errors
4. **Empty Results**: Gracefully handles cases with no availability
5. **Network Errors**: Handles Supabase function invocation errors

## Future Enhancements

1. **Recurring Availability**: Support for weekly recurring availability
2. **Time Zone Support**: Handle different time zones for tutors/students
3. **Minimum Slot Duration**: Filter out slots shorter than minimum duration
4. **Buffer Times**: Add buffer time between bookings
5. **Real-time Updates**: Use Supabase real-time for live availability updates
6. **Caching**: Implement Redis caching for better performance
7. **Batch Processing**: Support for multiple dates at once
