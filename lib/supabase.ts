
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gepxkbfirhxtjlobditd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlcHhrYmZpcmh4dGpsb2JkaXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MTcyMzEsImV4cCI6MjA4MzI5MzIzMX0.EZoL6tf6wpibh6Tg4x67KOl_jL6B3podK0pjpoX8lsI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
