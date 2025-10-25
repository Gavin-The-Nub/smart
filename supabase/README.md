# Supabase Database Setup

This directory contains the database migrations for the Smart Brain tutoring platform.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details
5. Wait for the project to be created

### 2. Get Your Project Credentials

1. Go to Project Settings (gear icon)
2. Click on "API"
3. Copy the following:
   - Project URL
   - `anon` public key

### 3. Update Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run the Database Migration

1. Go to the SQL Editor in your Supabase dashboard
2. Click "New Query"
3. Copy the contents of `migrations/001_initial_schema.sql`
4. Paste into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)

Alternatively, if you have the Supabase CLI installed:

```bash
supabase db push
```

## Database Schema

### Tables

#### `profiles`

Stores user profile information with role-based access.

- `id` (UUID, PRIMARY KEY) - References `auth.users.id`
- `role` (TEXT) - Either 'student' or 'tutor'
- `full_name` (TEXT) - User's full name
- `avatar_url` (TEXT) - Optional avatar image URL
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

#### `credits`

Tracks user credit balance with available and reserved amounts.

- `id` (UUID, PRIMARY KEY)
- `user_id` (UUID) - References `profiles.id`
- `available_balance` (INTEGER) - Credits available for use (default: 0)
- `reserved_balance` (INTEGER) - Credits reserved for pending bookings (default: 0)
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

## Row Level Security (RLS)

RLS is enabled on all tables. The following policies are in place:

### Profiles Table

- Users can SELECT, UPDATE, and INSERT their own profile only
- Uses `auth.uid() = id` to enforce ownership

### Credits Table

- Users can SELECT, UPDATE, and INSERT their own credits only
- Uses `auth.uid() = user_id` to enforce ownership

## Security Notes

1. **RLS is mandatory** - All new tables should have RLS enabled
2. **Users can only access their own data** - Policy checks use `auth.uid()` to verify ownership
3. **Cascade deletes** - Deleting a profile automatically deletes associated credits
4. **Type safety** - TypeScript types in `src/types/database.ts` ensure type-safe database operations

## Next Steps

After running the migration:

1. Update your authentication flow to create a profile when a user signs up
2. Initialize credits record when creating a new profile
3. Test the policies by trying to access other users' data (should fail)
