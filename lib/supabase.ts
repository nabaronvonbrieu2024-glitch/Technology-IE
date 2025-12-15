import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase Configuration
// We use the provided credentials. In a production environment with a build process, 
// these are typically stored in environment variables, but we include them here 
// to ensure the app connects immediately for your demo.

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://jnmgukwkynnjexajncmt.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubWd1a3dreW5uamV4YWpuY210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5ODk4NDIsImV4cCI6MjA3ODU2NTg0Mn0.zqvpTV4hP1hyxQW8jrEMRmf2E_fjqNPQmApH0CDmACI';

// Initialize the Supabase client
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);