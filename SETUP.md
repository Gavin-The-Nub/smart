# Phase 1: User Roles & Setup - Complete

## Overview

This setup includes:

- ✅ Supabase database configuration
- ✅ `profiles` table with role-based access (student/tutor)
- ✅ `credits` table for tracking user balances
- ✅ `subjects` and `tutor_subjects` tables for subject management
- ✅ `tutor_availability` table for time slot management
- ✅ `bookings` table for student-tutor sessions
- ✅ Row Level Security (RLS) policies on all tables
- ✅ TypeScript type definitions
- ✅ Database utility functions
- ✅ Supabase client configuration

## Quick Start

### 1. Supabase Project Setup

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Go to **Project Settings** → **API**
3. Copy your **Project URL** and **anon public key**

### 2. Environment Configuration

Create a `.env.local` file in the root directory with:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Note:** This file should already exist in your project but is empty. Fill in the values with your Supabase credentials.

### 3. Database Migration

Run the database migrations in your Supabase dashboard:

**Migration 1: Initial Schema**

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Open `supabase/migrations/001_initial_schema.sql`
4. Copy and paste the entire contents
5. Click **Run** (or press `Ctrl+Enter`)

**Migration 2: Subjects & Tutors**

1. Create a **New Query**
2. Open `supabase/migrations/002_subjects_and_tutors.sql`
3. Copy and paste the entire contents
4. Click **Run**

**Migration 3: Bookings**

1. Create a **New Query**
2. Open `supabase/migrations/003_bookings.sql`
3. Copy and paste the entire contents
4. Click **Run**

This will create:

- `profiles` table (from migration 1)
- `credits` table (from migration 1)
- `subjects` table (from migration 2)
- `tutor_subjects` table (from migration 2)
- `tutor_availability` table (from migration 2)
- `bookings` table (from migration 3)
- RLS policies on all tables
- Automatic `updated_at` timestamp triggers
- Sample subjects data
- Performance indexes for bookings

## Database Schema

### Profiles Table

```sql
profiles
├── id (UUID, PK) → references auth.users.id
├── role (TEXT) → 'student' or 'tutor'
├── full_name (TEXT)
├── avatar_url (TEXT, nullable)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Credits Table

```sql
credits
├── id (UUID, PK)
├── user_id (UUID) → references profiles.id
├── available_balance (INTEGER, default 0)
├── reserved_balance (INTEGER, default 0)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Subjects Table

```sql
subjects
├── id (UUID, PK)
├── name (TEXT, UNIQUE) → e.g., 'Math', 'Physics'
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Tutor Subjects Table (Many-to-Many)

```sql
tutor_subjects
├── id (UUID, PK)
├── tutor_id (UUID) → references profiles.id
├── subject_id (UUID) → references subjects.id
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Tutor Availability Table

```sql
tutor_availability
├── id (UUID, PK)
├── tutor_id (UUID) → references profiles.id
├── start_datetime_utc (TIMESTAMP WITH TIME ZONE)
├── end_datetime_utc (TIMESTAMP WITH TIME ZONE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Bookings Table

```sql
bookings
├── id (UUID, PK)
├── student_id (UUID) → references profiles.id
├── tutor_id (UUID) → references profiles.id
├── subject_id (UUID) → references subjects.id
├── start_datetime_utc (TIMESTAMP WITH TIME ZONE)
├── end_datetime_utc (TIMESTAMP WITH TIME ZONE)
├── duration_in_minutes (INTEGER)
├── credits_required (INTEGER)
├── status (TEXT) → 'pending' | 'upcoming' | 'completed' | 'student_no_show' | 'tutor_no_show' | 'pending_review'
├── meeting_link (TEXT, nullable)
├── student_feedback (TEXT, nullable)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

### Profiles

- ✅ Users can **view** their own profile only
- ✅ Users can **update** their own profile only
- ✅ Users can **insert** their own profile only

### Credits

- ✅ Users can **view** their own credits only
- ✅ Users can **update** their own credits only
- ✅ Users can **insert** their own credits only

### Subjects

- ✅ **Anyone** can view subjects (public read access)
- ✅ Used for displaying available subjects to all users

### Tutor Subjects

- ✅ **Anyone** can view tutor-subject relationships
- ✅ **Tutors only** can add subjects to their profile
- ✅ **Tutors only** can remove subjects from their profile

### Tutor Availability

- ✅ **Anyone** can view availability (for booking purposes)
- ✅ **Tutors only** can create their own availability slots
- ✅ **Tutors only** can update their own availability slots
- ✅ **Tutors only** can delete their own availability slots

### Bookings

- ✅ **Students and tutors** can view their own bookings only
- ✅ **Students** can create bookings
- ✅ **Students and tutors** can update their own bookings
- ✅ **Students** can delete pending bookings only

**Status Values:**

- `pending` - Booking is pending tutor confirmation
- `upcoming` - Booking is confirmed and upcoming
- `completed` - Session completed successfully
- `student_no_show` - Student didn't show up
- `tutor_no_show` - Tutor didn't show up
- `pending_review` - Awaiting review

**Security Check:** Users cannot access or modify data belonging to other users.

## Usage Examples

### Get Current User's Profile

```typescript
import { getCurrentUserProfile } from "@/lib/database";

const profile = await getCurrentUserProfile();
console.log(profile?.full_name, profile?.role);
```

### Create a Profile

```typescript
import { createProfile } from "@/lib/database";

const newProfile = await createProfile({
  id: user.id,
  role: "student",
  full_name: "John Doe",
});

// Credits are automatically initialized to 0
```

### Get User Credits

```typescript
import { getCurrentUserCredits } from "@/lib/database";

const credits = await getCurrentUserCredits();
console.log("Available:", credits?.available_balance);
console.log("Reserved:", credits?.reserved_balance);
```

### Add Credits

```typescript
import { addCredits } from "@/lib/database";

await addCredits(100); // Adds 100 credits to available balance
```

### Reserve Credits

```typescript
import { reserveCredits } from "@/lib/database";

try {
  await reserveCredits(50); // Reserves 50 credits for a booking
} catch (error) {
  console.error("Insufficient credits");
}
```

### Release Reserved Credits

```typescript
import { releaseCredits } from "@/lib/database";

await releaseCredits(50); // Returns reserved credits to available balance
```

### Get All Subjects

```typescript
import { getAllSubjects } from "@/lib/database";

const subjects = await getAllSubjects();
console.log(subjects); // [{ id: "...", name: "Math" }, ...]
```

### Add Subjects to Tutor

```typescript
import { addTutorSubject } from "@/lib/database";

await addTutorSubject({
  tutor_id: user.id,
  subject_id: "subject-uuid-here",
});
```

### Get Tutor Availability

```typescript
import { getTutorAvailability } from "@/lib/database";

const availability = await getTutorAvailability(tutorId);
console.log(availability); // Time slots for the tutor
```

### Create Availability Slot

```typescript
import { createAvailability } from "@/lib/database";

await createAvailability({
  tutor_id: user.id,
  start_datetime_utc: "2024-01-15T10:00:00Z",
  end_datetime_utc: "2024-01-15T11:00:00Z",
});
```

### Find Tutors for a Subject

```typescript
import { getAvailableTutorsForSubject } from "@/lib/database";

const tutors = await getAvailableTutorsForSubject(
  "math-subject-id",
  "2024-01-15T00:00:00Z", // optional start time
  "2024-01-20T00:00:00Z" // optional end time
);
```

### Create a Booking

```typescript
import { createBooking } from "@/lib/database";

const booking = await createBooking({
  student_id: user.id,
  tutor_id: "tutor-uuid-here",
  subject_id: "math-subject-uuid",
  start_datetime_utc: "2024-01-15T10:00:00Z",
  end_datetime_utc: "2024-01-15T11:00:00Z",
  duration_in_minutes: 60,
  credits_required: 50,
  status: "pending",
});
```

### Get User's Bookings

```typescript
import { getUserBookings } from "@/lib/database";

const bookings = await getUserBookings();
console.log(bookings); // All bookings (as student or tutor)
```

### Update Booking Status

```typescript
import { updateBookingStatus } from "@/lib/database";

await updateBookingStatus(bookingId, "upcoming");
```

### Get Upcoming Bookings

```typescript
import { getUpcomingBookings } from "@/lib/database";

const upcoming = await getUpcomingBookings();
console.log(upcoming); // Future bookings only
```

## File Structure

```
src/
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   └── database.ts          # Database utility functions
├── types/
│   └── database.ts          # TypeScript type definitions
supabase/
├── migrations/
│   ├── 001_initial_schema.sql      # Initial migration (profiles, credits)
│   ├── 002_subjects_and_tutors.sql # Subjects and tutors migration
│   └── 003_bookings.sql            # Bookings migration
└── README.md                       # Detailed database docs
.env.local                           # Environment variables (not in git)
```

## Testing the Setup

1. **Create a test user** in Supabase Auth
2. **Manually create a profile**:
   ```sql
   INSERT INTO profiles (id, role, full_name)
   VALUES ('user-id-here', 'student', 'Test User');
   ```
3. **Check RLS** - Try to query another user's data (should fail)

## Next Steps

- [ ] Update authentication flow to auto-create profiles on signup
- [ ] Implement booking system that uses credits
- [ ] Add role-based UI restrictions
- [ ] Create admin views for managing users

## Troubleshooting

### Error: Missing Supabase environment variables

- Make sure `.env.local` exists and has both variables filled in
- Restart your dev server after adding environment variables

### Error: Row Level Security policy violation

- This is expected! Users can only access their own data
- Check that you're authenticated with `supabase.auth.getUser()`

### Migration fails

- Make sure you have the correct permissions in Supabase
- Check that the uuid-ossp extension is available
- Verify RLS is enabled on all tables

## Security Best Practices

1. ✅ **RLS is enabled** on all tables
2. ✅ **Environment variables** are in `.gitignore`
3. ✅ **Type safety** with TypeScript types
4. ✅ **User isolation** - policies enforce data separation
5. ✅ **Cascade deletes** - deleting a profile removes credits

## Documentation

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase TypeScript Types](https://supabase.com/docs/reference/javascript/generating-types)
