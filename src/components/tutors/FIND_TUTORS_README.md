# Find a Tutor Logic Implementation

This document explains the implementation of the "Find a Tutor" functionality, which filters tutors based on subject and availability.

## Architecture

The solution consists of three main components:

### 1. Supabase Edge Function (`supabase/functions/get-filtered-tutors/`)

**Purpose**: Server-side function that performs the complex filtering logic.

**Location**: `supabase/functions/get-filtered-tutors/index.ts`

**Logic**:

1. Accepts `subject_id` as input
2. Queries `tutor_subjects` table to find tutors who teach the subject
3. Joins with `profiles` table to get tutor information
4. Filters tutors who have at least one availability slot with `end_datetime_utc` in the future
5. Returns tutor profile data (id, full_name, avatar_url)

**Key Features**:

- CORS support for web requests
- Error handling and logging
- Efficient database queries with proper joins
- Future availability filtering

### 2. Client-side Database Function (`src/lib/database.ts`)

**Function**: `getFilteredTutors(subjectId: string)`

**Purpose**: Client-side wrapper that calls the Supabase Edge Function.

**Usage**:

```typescript
import { getFilteredTutors } from "@/lib/database";

const tutors = await getFilteredTutors("subject-uuid");
```

**Returns**: Array of tutor objects with `id`, `full_name`, and `avatar_url`.

### 3. React Component (`src/components/tutors/FilteredTutorsList.tsx`)

**Purpose**: UI component that demonstrates the filtered tutors functionality.

**Features**:

- Subject selection dropdown
- Loading states
- Tutor cards with avatars
- Empty state handling
- Responsive grid layout

## Database Schema Requirements

The function relies on these tables:

### `tutor_subjects`

- Links tutors to subjects they teach
- Required fields: `tutor_id`, `subject_id`

### `tutor_availability`

- Stores tutor availability time slots
- Required fields: `tutor_id`, `start_datetime_utc`, `end_datetime_utc`
- Filtering: `end_datetime_utc > NOW()`

### `profiles`

- Tutor profile information
- Required fields: `id`, `full_name`, `avatar_url`

## Deployment Instructions

### 1. Deploy Supabase Edge Function

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Deploy the function
supabase functions deploy get-filtered-tutors
```

### 2. Configure Environment

Ensure your Supabase project has the Edge Functions enabled and properly configured.

### 3. Test the Function

Visit `/test-filtered-tutors` to test the functionality.

## API Reference

### Edge Function Endpoint

**URL**: `https://your-project.supabase.co/functions/v1/get-filtered-tutors`

**Method**: POST

**Headers**:

```
Content-Type: application/json
Authorization: Bearer <supabase-anon-key>
```

**Request Body**:

```json
{
  "subject_id": "uuid"
}
```

**Response**:

```json
{
  "tutors": [
    {
      "id": "uuid",
      "full_name": "John Doe",
      "avatar_url": "https://example.com/avatar.jpg"
    }
  ]
}
```

## Error Handling

The implementation includes comprehensive error handling:

1. **Input Validation**: Checks for required `subject_id`
2. **Database Errors**: Catches and logs database query errors
3. **Network Errors**: Handles Supabase function invocation errors
4. **Empty Results**: Gracefully handles cases with no available tutors

## Performance Considerations

1. **Database Indexes**: Ensure proper indexes on:

   - `tutor_subjects(tutor_id, subject_id)`
   - `tutor_availability(tutor_id, end_datetime_utc)`

2. **Query Optimization**: The Edge Function uses efficient joins and filters

3. **Caching**: Consider implementing client-side caching for frequently accessed data

## Testing

Use the test page at `/test-filtered-tutors` to verify:

1. Subject selection works
2. Tutors are filtered correctly
3. Loading states display properly
4. Empty states handle no results
5. Error handling works

## Future Enhancements

Potential improvements:

1. **Pagination**: Add pagination for large result sets
2. **Sorting**: Add sorting options (by name, availability, etc.)
3. **Caching**: Implement Redis caching for better performance
4. **Real-time Updates**: Use Supabase real-time for live availability updates
5. **Advanced Filtering**: Add filters for time slots, ratings, etc.
