-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tutor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    start_datetime_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_in_minutes INTEGER NOT NULL,
    credits_required INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN (
        'pending',
        'upcoming',
        'completed',
        'student_no_show',
        'tutor_no_show',
        'pending_review'
    )),
    meeting_link TEXT,
    student_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT valid_time_range CHECK (end_datetime_utc > start_datetime_utc)
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bookings table
-- Students and tutors can view their own bookings
CREATE POLICY "Students and tutors can view own bookings"
    ON public.bookings
    FOR SELECT
    USING (
        auth.uid() = student_id OR
        auth.uid() = tutor_id
    );

-- Students can create bookings
CREATE POLICY "Students can create bookings"
    ON public.bookings
    FOR INSERT
    WITH CHECK (
        auth.uid() = student_id AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'student')
    );

-- Students and tutors can update their own bookings
CREATE POLICY "Students and tutors can update own bookings"
    ON public.bookings
    FOR UPDATE
    USING (
        auth.uid() = student_id OR
        auth.uid() = tutor_id
    );

-- Students can delete their own bookings (only pending bookings should be deleted)
CREATE POLICY "Students can delete own bookings"
    ON public.bookings
    FOR DELETE
    USING (
        auth.uid() = student_id AND
        status = 'pending'
    );

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at_bookings
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_student_id ON public.bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_bookings_tutor_id ON public.bookings(tutor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_start_datetime ON public.bookings(start_datetime_utc);
