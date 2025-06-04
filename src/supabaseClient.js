// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ckgpwsgsjmtdoipnerch.supabase.com';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZ3B3c2dzam10ZG9pcG5lcmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTc1OTksImV4cCI6MjA2NDEzMzU5OX0.Dbt6OnjcPSw8Xuw3AwVa8683PcfsKkSyhZgTvxTP8Dk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);