// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Prefer REACT_APP_* for CRA, fall back to VITE_*, and support import.meta.env
const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  (typeof import.meta !== 'undefined' ? import.meta.env.VITE_SUPABASE_URL : undefined);

const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  (typeof import.meta !== 'undefined' ? import.meta.env.VITE_SUPABASE_ANON_KEY : undefined);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);