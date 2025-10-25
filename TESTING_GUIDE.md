# Testing Guide for SmartBrain Application

This guide will help you test the Tutor Setup UI and other features with real data.

## Prerequisites

1. **Supabase Project Setup**

   - Create a Supabase project
   - Run the database migrations
   - Deploy the Edge Functions

2. **Environment Setup**
   - Ensure your `.env` file has the correct Supabase credentials
   - Make sure the app is running locally

## Step 1: Database Setup

### 1.1 Run Migrations

```bash
# Apply database migrations
supabase db push
```

### 1.2 Seed the Database

```bash
# Run the seed script
supabase db reset
# This will apply migrations and run the seed script
```

### 1.3 Deploy Edge Functions

```bash
# Deploy the Edge Functions
supabase functions deploy get-filtered-tutors
supabase functions deploy get-true-availability
```

## Step 2: Create Test Users

### 2.1 Create Tutor Account

1. Go to your app's signup page
2. Create a new account with:
   - Email: `tutor@example.com`
   - Password: `password123`
   - Full Name: `Dr. Sarah Johnson`
3. The system will automatically create a tutor profile with 100 credits

### 2.2 Create Student Account

1. Create another account with:
   - Email: `student@example.com`
   - Password: `password123`
   - Full Name: `John Student`
2. The system will automatically create a student profile with 50 credits

## Step 3: Test Tutor Setup Flow

### 3.1 Access Tutor Setup

1. Login as the tutor (`tutor@example.com`)
2. Navigate to `/tutor-setup` in your browser
3. You should see the tutor setup wizard

### 3.2 Test Subject Selection

1. **Step 1 - Select Subjects**:
   - You should see all available subjects (Math, Physics, Chemistry, etc.)
   - Select multiple subjects (e.g., Math, Physics)
   - Click "Save Subjects"
   - Verify the subjects are saved to the database

### 3.3 Test Availability Setting

1. **Step 2 - Set Availability**:
   - Click on a date in the calendar
   - Add time slots (e.g., 9:00 AM - 12:00 PM, 2:00 PM - 5:00 PM)
   - Save the availability
   - Verify the time slots appear on the calendar with green dots

### 3.4 Complete Setup

1. **Step 3 - Complete**:
   - Review your setup
   - Click "Go to Dashboard"
   - Verify you're redirected to the dashboard

## Step 4: Test Find Tutors Flow

### 4.1 Login as Student

1. Login as the student (`student@example.com`)
2. Navigate to `/test-filtered-tutors`

### 4.2 Test Subject Filtering

1. Select a subject (e.g., Math)
2. Verify that the tutor appears in the results
3. Try different subjects to test filtering

## Step 5: Test Time Slot Picker

### 5.1 Test Availability Calculation

1. Navigate to `/test-time-slot-picker`
2. Select the tutor you created
3. Select a date where you set availability
4. Verify that the available time slots are displayed correctly

### 5.2 Test Booking Simulation

1. Select a time slot
2. Verify the selection is recorded
3. Test the "Book This Session" button (this will be implemented later)

## Step 6: Verify Database Data

### 6.1 Check Tutor Subjects

```sql
SELECT p.full_name, s.name as subject
FROM profiles p
JOIN tutor_subjects ts ON p.id = ts.tutor_id
JOIN subjects s ON ts.subject_id = s.id
WHERE p.role = 'tutor';
```

### 6.2 Check Tutor Availability

```sql
SELECT p.full_name, ta.start_datetime_utc, ta.end_datetime_utc
FROM profiles p
JOIN tutor_availability ta ON p.id = ta.tutor_id
WHERE p.role = 'tutor'
ORDER BY ta.start_datetime_utc;
```

### 6.3 Check Credits

```sql
SELECT p.full_name, p.role, c.available_balance, c.reserved_balance
FROM profiles p
JOIN credits c ON p.id = c.user_id;
```

## Step 7: Test Edge Cases

### 7.1 Test with No Subjects

1. Create a new tutor account
2. Go to tutor setup
3. Don't select any subjects
4. Try to proceed - should be blocked

### 7.2 Test with No Availability

1. Complete subject selection
2. Don't set any availability
3. Try to complete setup - should be blocked

### 7.3 Test Multiple Tutors

1. Create multiple tutor accounts
2. Set up different subjects and availability for each
3. Test the filtering functionality

## Troubleshooting

### Common Issues

1. **Edge Functions Not Working**

   - Check if functions are deployed: `supabase functions list`
   - Check function logs: `supabase functions logs get-filtered-tutors`

2. **Database Connection Issues**

   - Verify your `.env` file has correct Supabase credentials
   - Check if migrations are applied: `supabase db diff`

3. **Authentication Issues**

   - Clear browser cache and cookies
   - Check if RLS policies are working correctly

4. **No Data Showing**
   - Check if the seed script ran successfully
   - Verify that triggers are created for automatic profile setup

### Debug Commands

```bash
# Check database status
supabase status

# View function logs
supabase functions logs get-filtered-tutors
supabase functions logs get-true-availability

# Check database schema
supabase db diff

# Reset everything
supabase db reset
```

## Expected Results

After completing this testing guide, you should have:

1. ✅ **Tutor Setup Working**: Tutors can select subjects and set availability
2. ✅ **Find Tutors Working**: Students can find tutors by subject
3. ✅ **Time Slot Picker Working**: Students can see available time slots
4. ✅ **Database Populated**: Real data in all tables
5. ✅ **Edge Functions Working**: Server-side logic functioning correctly

## Next Steps

Once basic testing is complete, you can:

1. **Add More Test Data**: Create more tutors with different subjects and availability
2. **Test Booking Flow**: Implement and test the actual booking process
3. **Test Real-time Updates**: Test with multiple users simultaneously
4. **Performance Testing**: Test with larger datasets
5. **Mobile Testing**: Test on mobile devices

## Support

If you encounter issues:

1. Check the browser console for errors
2. Check the Supabase dashboard for database issues
3. Check the Edge Function logs for server-side errors
4. Verify all environment variables are set correctly
