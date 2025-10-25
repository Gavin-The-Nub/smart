# Real Authentication Setup Guide

This guide will help you switch from mock authentication to real Supabase authentication.

## Step 1: Environment Setup

### 1.1 Check Your Supabase Configuration

Make sure your `.env` file has the correct Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 1.2 Verify Supabase Client

Check that `src/lib/supabase.ts` is properly configured:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Step 2: Database Setup

### 2.1 Apply Migrations

```bash
# Make sure all migrations are applied
supabase db push
```

### 2.2 Seed the Database

```bash
# Run the seed script to populate subjects
supabase db reset
```

### 2.3 Deploy Edge Functions

```bash
# Deploy the Edge Functions
supabase functions deploy get-filtered-tutors
supabase functions deploy get-true-availability
```

## Step 3: Test Real Authentication

### 3.1 Start Your App

```bash
npm run dev
```

### 3.2 Create Your First Real Account

1. Go to `http://localhost:5173/auth`
2. Click on the **Sign Up** tab
3. Fill in the form:
   - **Email**: `tutor1@test.com`
   - **Password**: `Test123456!`
   - **Full Name**: `Dr. Sarah Johnson`
   - **Role**: Select **Tutor**
4. Click **Create Account**

### 3.3 Verify Account Creation

Check in your Supabase dashboard:

1. Go to **Authentication** → **Users**
2. You should see your new user
3. Go to **Table Editor** → **profiles**
4. You should see the profile with role "tutor"
5. Go to **Table Editor** → **credits**
6. You should see 100 credits for the tutor

## Step 4: Test Tutor Setup

### 4.1 Login with Real Account

1. Go to `http://localhost:5173/auth`
2. Use the **Sign In** tab
3. Enter your credentials:
   - **Email**: `tutor1@test.com`
   - **Password**: `Test123456!`
4. Click **Sign In**

### 4.2 Access Tutor Setup

1. After login, you should be redirected to the dashboard
2. Navigate to `http://localhost:5173/tutor-setup`
3. You should see the tutor setup wizard

### 4.3 Complete Setup

1. **Select Subjects**: Choose Math, Physics, Chemistry
2. **Set Availability**: Add time slots for today and tomorrow
3. **Complete Setup**: Review and finish

## Step 5: Test with Student Account

### 5.1 Create Student Account

1. Sign out of the tutor account
2. Go to `http://localhost:5173/auth`
3. Create a new account:
   - **Email**: `student1@test.com`
   - **Password**: `Test123456!`
   - **Full Name**: `John Student`
   - **Role**: Select **Student**

### 5.2 Test Find Tutors

1. Login as student
2. Navigate to `http://localhost:5173/test-filtered-tutors`
3. Select a subject (Math)
4. You should see your tutor in the results!

### 5.3 Test Time Slot Picker

1. Navigate to `http://localhost:5173/test-time-slot-picker`
2. Select your tutor
3. Pick a date where you set availability
4. You should see the time slots!

## Step 6: Verify Everything Works

### 6.1 Check Database Data

Run these queries in Supabase SQL Editor:

```sql
-- Check profiles
SELECT id, full_name, role, created_at
FROM profiles
ORDER BY created_at DESC;

-- Check tutor subjects
SELECT p.full_name, s.name as subject
FROM profiles p
JOIN tutor_subjects ts ON p.id = ts.tutor_id
JOIN subjects s ON ts.subject_id = s.id
WHERE p.role = 'tutor';

-- Check tutor availability
SELECT p.full_name, ta.start_datetime_utc, ta.end_datetime_utc
FROM profiles p
JOIN tutor_availability ta ON p.id = ta.tutor_id
WHERE p.role = 'tutor'
ORDER BY ta.start_datetime_utc;

-- Check credits
SELECT p.full_name, p.role, c.available_balance, c.reserved_balance
FROM profiles p
JOIN credits c ON p.id = c.user_id;
```

### 6.2 Test Edge Functions

```bash
# Check if functions are deployed
supabase functions list

# Test the functions
curl -X POST 'https://your-project.supabase.co/functions/v1/get-filtered-tutors' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"subject_id": "SUBJECT_ID_HERE"}'
```

## Troubleshooting

### Issue: Can't sign up

- **Check**: Supabase project is active
- **Check**: Environment variables are correct
- **Check**: Database migrations are applied

### Issue: Profile not created

- **Check**: RLS policies are correct
- **Check**: Triggers are created in the database
- **Check**: User has proper permissions

### Issue: Edge Functions not working

- **Deploy**: `supabase functions deploy get-filtered-tutors`
- **Deploy**: `supabase functions deploy get-true-availability`
- **Check logs**: `supabase functions logs`

### Issue: Can't access tutor setup

- **Check**: User is logged in
- **Check**: User has tutor role
- **Check**: Profile exists in database

## Success Checklist

- ✅ Real authentication working
- ✅ Can create tutor and student accounts
- ✅ Tutor setup wizard accessible
- ✅ Subjects can be selected and saved
- ✅ Availability can be set and saved
- ✅ Find tutors functionality working
- ✅ Time slot picker working
- ✅ Database populated with real data

## Next Steps

Once real authentication is working:

1. **Test Multiple Users**: Create several tutors and students
2. **Test Different Scenarios**: Different subjects, availability patterns
3. **Test Edge Cases**: No availability, fully booked days
4. **Test Mobile**: Use mobile browser to test responsiveness
5. **Test Performance**: With larger datasets

## Support

If you encounter issues:

1. **Check Browser Console**: Look for JavaScript errors
2. **Check Supabase Logs**: Look for authentication errors
3. **Check Database**: Verify data is being inserted
4. **Check Network**: Verify API calls are working

## Quick Commands

```bash
# Reset everything and start fresh
supabase db reset

# Deploy all functions
supabase functions deploy get-filtered-tutors
supabase functions deploy get-true-availability

# Check status
supabase status

# View logs
supabase functions logs get-filtered-tutors
supabase functions logs get-true-availability
```
