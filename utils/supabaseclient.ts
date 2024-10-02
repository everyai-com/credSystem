import { createClient } from '@supabase/supabase-js';


if (!process.env.NEXT_PROJECT_KEY) {
  throw new Error('Missing env.NEXT_PROJECT_KEY');
}
if (!process.env.NEXT_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PROJECT_KEY,
  process.env.NEXT_SUPABASE_ANON_KEY
);