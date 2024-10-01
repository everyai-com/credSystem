import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

const supabaseUrl = 'https://qitptulsoazdxvvnvaxj.supabase.co';
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

