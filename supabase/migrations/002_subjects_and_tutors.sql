-- Create subjects table
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tutor_subjects table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.tutor_subjects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tutor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(tutor_id, subject_id)
);

-- Create tutor_availability table
CREATE TABLE IF NOT EXISTS public.tutor_availability (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tutor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    start_datetime_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT valid_time_range CHECK (end_datetime_utc > start_datetime_utc)
);

-- Enable Row Level Security
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_availability ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subjects table
-- Anyone can read subjects
CREATE POLICY "Anyone can view subjects"
    ON public.subjects
    FOR SELECT
    USING (true);

-- RLS Policies for tutor_subjects table
-- Anyone can read tutor_subjects
CREATE POLICY "Anyone can view tutor_subjects"
    ON public.tutor_subjects
    FOR SELECT
    USING (true);

-- Tutors can insert their own subjects
CREATE POLICY "Tutors can insert own subjects"
    ON public.tutor_subjects
    FOR INSERT
    WITH CHECK (
        auth.uid() = tutor_id AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
    );

-- Tutors can delete their own subjects
CREATE POLICY "Tutors can delete own subjects"
    ON public.tutor_subjects
    FOR DELETE
    USING (
        auth.uid() = tutor_id AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
    );

-- RLS Policies for tutor_availability table
-- Tutors can create their own availability slots
CREATE POLICY "Tutors can create own availability"
    ON public.tutor_availability
    FOR INSERT
    WITH CHECK (
        auth.uid() = tutor_id AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
    );

-- Tutors can read their own availability slots
CREATE POLICY "Tutors can read own availability"
    ON public.tutor_availability
    FOR SELECT
    USING (
        auth.uid() = tutor_id AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
    );

-- Anyone can read availability (for booking purposes)
CREATE POLICY "Anyone can view availability"
    ON public.tutor_availability
    FOR SELECT
    USING (true);

-- Tutors can update their own availability slots
CREATE POLICY "Tutors can update own availability"
    ON public.tutor_availability
    FOR UPDATE
    USING (
        auth.uid() = tutor_id AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
    );

-- Tutors can delete their own availability slots
CREATE POLICY "Tutors can delete own availability"
    ON public.tutor_availability
    FOR DELETE
    USING (
        auth.uid() = tutor_id AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
    );

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at_subjects
    BEFORE UPDATE ON public.subjects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_tutor_subjects
    BEFORE UPDATE ON public.tutor_subjects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_tutor_availability
    BEFORE UPDATE ON public.tutor_availability
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert some sample subjects
INSERT INTO public.subjects (name) VALUES
    ('Math'),
    ('Physics'),
    ('Chemistry'),
    ('Biology'),
    ('English'),
    ('History'),
    ('Computer Science'),
    ('Spanish'),
    ('French'),
    ('Art')
ON CONFLICT (name) DO NOTHING;
