-- Seed script for SmartBrain application
-- This script populates the database with realistic test data

-- Insert sample subjects
INSERT INTO public.subjects (id, name) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Mathematics'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Physics'),
    ('550e8400-e29b-41d4-a716-446655440003', 'Chemistry'),
    ('550e8400-e29b-41d4-a716-446655440004', 'Biology'),
    ('550e8400-e29b-41d4-a716-446655440005', 'English Literature'),
    ('550e8400-e29b-41d4-a716-446655440006', 'History'),
    ('550e8400-e29b-41d4-a716-446655440007', 'Computer Science'),
    ('550e8400-e29b-41d4-a716-446655440008', 'Spanish'),
    ('550e8400-e29b-41d4-a716-446655440009', 'French'),
    ('550e8400-e29b-41d4-a716-446655440010', 'Art')
ON CONFLICT (id) DO NOTHING;

-- Note: We cannot directly insert into auth.users as it's managed by Supabase Auth
-- Users will be created through the signup process

-- Create a function to set up a tutor profile after user creation
CREATE OR REPLACE FUNCTION setup_tutor_profile()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert profile
    INSERT INTO public.profiles (id, role, full_name, avatar_url)
    VALUES (NEW.id, 'tutor', COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Tutor'), NULL);
    
    -- Insert credits
    INSERT INTO public.credits (user_id, available_balance, reserved_balance)
    VALUES (NEW.id, 100, 0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set up tutor profile
CREATE TRIGGER on_auth_user_created_tutor
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION setup_tutor_profile();

-- Create a function to set up a student profile after user creation
CREATE OR REPLACE FUNCTION setup_student_profile()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert profile
    INSERT INTO public.profiles (id, role, full_name, avatar_url)
    VALUES (NEW.id, 'student', COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Student'), NULL);
    
    -- Insert credits
    INSERT INTO public.credits (user_id, available_balance, reserved_balance)
    VALUES (NEW.id, 50, 0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set up student profile
CREATE TRIGGER on_auth_user_created_student
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION setup_student_profile();

-- Insert sample tutor subjects (these will be populated when tutors sign up)
-- Note: These will be created through the tutor setup process

-- Insert sample tutor availability (these will be created through the tutor setup process)
-- Note: These will be created through the tutor setup process

-- Insert sample bookings (these will be created through the booking process)
-- Note: These will be created through the booking process

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tutor_subjects_tutor_id ON public.tutor_subjects(tutor_id);
CREATE INDEX IF NOT EXISTS idx_tutor_subjects_subject_id ON public.tutor_subjects(subject_id);
CREATE INDEX IF NOT EXISTS idx_tutor_availability_tutor_id ON public.tutor_availability(tutor_id);
CREATE INDEX IF NOT EXISTS idx_tutor_availability_start_datetime ON public.tutor_availability(start_datetime_utc);
CREATE INDEX IF NOT EXISTS idx_bookings_tutor_id ON public.bookings(tutor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_student_id ON public.bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_bookings_start_datetime ON public.bookings(start_datetime_utc);
