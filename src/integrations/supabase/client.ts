
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://isqgmjhyhnlckmzxwmfo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcWdtamh5aG5sY2ttenh3bWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTU1NTMsImV4cCI6MjA1NzA5MTU1M30.HMIlNR2AxVz2oha-YA1MesYMtH1vwrC4psAfsH8zv8w";

// Initialize the Supabase client with options
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
