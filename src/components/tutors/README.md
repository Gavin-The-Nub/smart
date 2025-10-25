# Tutor Setup Components

This directory contains components for the tutor setup flow, allowing tutors to configure their subjects and availability.

## Components

### SubjectSelector

- **File**: `SubjectSelector.tsx`
- **Purpose**: Allows tutors to select which subjects they want to teach
- **Features**:
  - Fetches all available subjects from the database
  - Displays subjects as checkboxes
  - Shows tutor's currently selected subjects
  - Allows adding/removing subjects
  - Saves changes to the `tutor_subjects` table

### AvailabilityCalendar

- **File**: `AvailabilityCalendar.tsx`
- **Purpose**: Allows tutors to set their available time slots
- **Features**:
  - Interactive calendar using react-day-picker
  - Click on dates to set availability
  - Add multiple time slots per day
  - Visual indicators for days with availability
  - Saves to the `tutor_availability` table

## Usage

The components are used in the main `TutorSetup` page (`/tutor-setup`):

1. **Subject Selection**: Tutors select subjects they want to teach
2. **Availability Setting**: Tutors set their available time slots using the calendar
3. **Completion**: Tutors can review their setup and proceed to the dashboard

## Database Integration

The components use the following database functions:

- `getAllSubjects()` - Get all available subjects
- `getTutorSubjects(tutorId)` - Get tutor's selected subjects
- `addTutorSubject(tutorSubject)` - Add a subject to tutor
- `removeTutorSubject(id)` - Remove a subject from tutor
- `getTutorAvailability(tutorId)` - Get tutor's availability
- `createAvailability(availability)` - Create new availability slot
- `deleteAvailability(id)` - Delete availability slot

## Dependencies

- `react-day-picker` - Calendar component
- `date-fns` - Date manipulation utilities
- `sonner` - Toast notifications
- `lucide-react` - Icons
