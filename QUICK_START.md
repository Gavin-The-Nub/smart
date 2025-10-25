# Quick Start Guide - Testing Tutor Setup with Real Data

## Overview

This guide will help you quickly test the Tutor Setup UI with real user accounts and data.

## Step 1: Create Your First Tutor Account

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Fill in:
   - Email: `tutor1@test.com`
   - Password: `Test123456!`
   - Auto Confirm User: ✓ (checked)

### Manually Create Profile

After creating the user in Supabase Auth, run this SQL in the SQL Editor:

```sql
-- Get the user ID from the auth.users table
-- Replace 'USER_ID_HERE' with the actual UUID

-- Create tutor profile
INSERT INTO public.profiles (id, role, full_name, avatar_url)
VALUES ('USER_ID_HERE', 'tutor', 'Dr. Sarah Johnson', NULL);

-- Create credits for tutor
INSERT INTO public.credits (user_id, available_balance, reserved_balance)
VALUES ('USER_ID_HERE', 100, 0);
```

## Step 2: Login and Access Tutor Setup

### Direct URL Method (Easiest)

1. Start your development server: `npm run dev`
2. Login with your tutor account:
   - Email: `tutor1@test.com`
   - Password: `Test123456!`
3. Navigate directly to: `http://localhost:5173/tutor-setup`

### Testing Routes

- **Tutor Setup**: `http://localhost:5173/tutor-setup`
- **Find Tutors Test**: `http://localhost:5173/test-filtered-tutors`
- **Time Slot Picker Test**: `http://localhost:5173/test-time-slot-picker`

## Step 3: Complete Tutor Setup

### Subject Selection

1. You'll see all 10 subjects (Math, Physics, Chemistry, etc.)
2. Select at least 2-3 subjects (e.g., Math, Physics, Chemistry)
3. Click **"Save Subjects"** - should see success toast
4. Click **"Next: Set Availability"**

### Set Availability

1. Click on today's date or tomorrow in the calendar
2. Click **"Add Time Slots"**
3. Add time slots:
   - Slot 1: 09:00 - 12:00
   - Slot 2: 14:00 - 17:00
4. Click **"Save Availability"**
5. You should see green dots on the calendar
6. Click **"Complete Setup"**

### Verify Setup

1. After completion, click **"Go to Dashboard"**
2. You should be redirected to `/dashboard`

## Step 4: Test with a Student Account

### Create Student Account

```sql
-- Create student profile (replace USER_ID with actual UUID from auth.users)
INSERT INTO public.profiles (id, role, full_name, avatar_url)
VALUES ('STUDENT_USER_ID_HERE', 'student', 'John Student', NULL);

-- Create credits for student
INSERT INTO public.credits (user_id, available_balance, reserved_balance)
VALUES ('STUDENT_USER_ID_HERE', 50, 0);
```

### Test Find Tutors

1. Login as student
2. Navigate to: `http://localhost:5173/test-filtered-tutors`
3. Select a subject that your tutor teaches
4. You should see your tutor in the results!

### Test Time Slot Picker

1. Navigate to: `http://localhost:5173/test-time-slot-picker`
2. Select your tutor from the list
3. Pick a date where you set availability
4. You should see the time slots you created!

## Step 5: Verify in Database

### Check Tutor Subjects

```sql
SELECT
    p.full_name as tutor_name,
    s.name as subject_name,
    ts.created_at
FROM profiles p
JOIN tutor_subjects ts ON p.id = ts.tutor_id
JOIN subjects s ON ts.subject_id = s.id
WHERE p.role = 'tutor'
ORDER BY p.full_name, s.name;
```

### Check Tutor Availability

```sql
SELECT
    p.full_name as tutor_name,
    ta.start_datetime_utc,
    ta.end_datetime_utc,
    EXTRACT(HOUR FROM ta.start_datetime_utc) as start_hour,
    EXTRACT(HOUR FROM ta.end_datetime_utc) as end_hour
FROM profiles p
JOIN tutor_availability ta ON p.id = ta.tutor_id
WHERE p.role = 'tutor'
ORDER BY p.full_name, ta.start_datetime_utc;
```

## Troubleshooting

### Issue: Can't see tutor setup page

- **Solution**: Make sure you're logged in as a tutor
- **Check**: Run `SELECT id, email, role FROM profiles JOIN auth.users ON profiles.id = auth.users.id;`

### Issue: Subjects not saving

- **Solution**: Check browser console for errors
- **Check**: Verify RLS policies are correct
- **Test**: Run `SELECT * FROM tutor_subjects;` to see if data is being inserted

### Issue: Availability not showing

- **Solution**: Check that times are in UTC
- **Check**: Run `SELECT * FROM tutor_availability;` to verify data

### Issue: Edge Functions not working

- **Deploy**: `supabase functions deploy get-filtered-tutors`
- **Deploy**: `supabase functions deploy get-true-availability`
- **Check logs**: `supabase functions logs`

## Quick SQL Snippets

### Create Multiple Test Tutors

```sql
-- Note: First create users in Supabase Auth, then run this with their IDs

-- Tutor 1: Math & Physics
INSERT INTO public.profiles VALUES ('UUID1', 'tutor', 'Dr. Sarah Johnson', NULL);
INSERT INTO public.credits VALUES (gen_random_uuid(), 'UUID1', 100, 0);

-- Tutor 2: Chemistry & Biology
INSERT INTO public.profiles VALUES ('UUID2', 'tutor', 'Prof. Michael Chen', NULL);
INSERT INTO public.credits VALUES (gen_random_uuid(), 'UUID2', 100, 0);

-- Tutor 3: English & History
INSERT INTO public.profiles VALUES ('UUID3', 'tutor', 'Ms. Emily Davis', NULL);
INSERT INTO public.credits VALUES (gen_random_uuid(), 'UUID3', 100, 0);
```

### Delete Test Data (Clean Slate)

```sql
-- Delete all tutor subjects
DELETE FROM tutor_subjects;

-- Delete all tutor availability
DELETE FROM tutor_availability;

-- Delete all bookings
DELETE FROM bookings;

-- Reset complete - now you can test from scratch
```

## Success Checklist

- ✅ Created tutor account in Supabase
- ✅ Logged in as tutor
- ✅ Accessed `/tutor-setup` page
- ✅ Selected and saved subjects
- ✅ Set and saved availability
- ✅ Completed setup wizard
- ✅ Verified data in database
- ✅ Tested with find tutors page
- ✅ Tested with time slot picker

## Next Steps

Once basic testing works:

1. Create multiple tutor accounts with different subjects
2. Test the booking flow (when implemented)
3. Test with real edge functions deployed
4. Add more complex availability patterns
5. Test timezone handling
6. Test with mobile devices

## Support

If you encounter issues:

1. Check browser console (F12)
2. Check Supabase logs in dashboard
3. Verify all migrations are applied
4. Ensure Edge Functions are deployed
