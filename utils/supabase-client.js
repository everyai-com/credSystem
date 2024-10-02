import { createClient } from '@supabase/supabase-js';
require ("dotenv").config()

const supabaseUrl = process.env.NEXT_PROJECT_KEY;
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl,supabaseAnonKey );

// import { createClient } from '@supabase/supabase-js';
// import { Database } from './types/supabase';

// if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
//   throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
// }
// if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//   throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
// }

// export const supabase = createClient<Database>(
//   process.env.NEXT_PROJECT_KEY,
//   process.env.NEXT_SUPABASE_ANON_KEY
// );