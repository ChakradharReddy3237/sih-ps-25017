import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserRole = 'Student' | 'Alumni' | 'Admin';
export type EventStatus = 'Upcoming' | 'Ongoing' | 'Past';
export type OpportunityType = 'Internship' | 'Full-Time' | 'Referral';
export type RequestType = 'Mentorship' | 'Seminar Talk';
export type RequestStatus = 'Pending' | 'Accepted' | 'Declined';