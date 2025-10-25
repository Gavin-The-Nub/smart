# Supabase Edge Functions

This directory contains Supabase Edge Functions for the SmartBrain application.

## Functions

### get-filtered-tutors

**Purpose**: Returns tutors who teach a specific subject and have future availability.

**Input**:

```json
{
  "subject_id": "uuid"
}
```

**Output**:

```json
{
  "tutors": [
    {
      "id": "uuid",
      "full_name": "string",
      "avatar_url": "string | null"
    }
  ]
}
```

**Logic**:

1. Finds all tutors who teach the specified subject (via `tutor_subjects` table)
2. Filters to only include tutors with at least one availability slot where `end_datetime_utc` is in the future
3. Returns tutor profile information (id, full_name, avatar_url)

## Deployment

To deploy the Edge Functions:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Deploy the functions
supabase functions deploy get-filtered-tutors
```

## Local Development

To test the functions locally:

```bash
# Start Supabase locally
supabase start

# Serve the functions locally
supabase functions serve
```

## Usage in Client

```typescript
import { getFilteredTutors } from "@/lib/database";

// Get tutors for a specific subject
const tutors = await getFilteredTutors("subject-uuid");
console.log(tutors); // Array of tutor objects
```
