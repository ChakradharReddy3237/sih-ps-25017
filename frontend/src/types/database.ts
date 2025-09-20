export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
      };
      alumni_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          photo_url: string;
          phone_number: string;
          current_address: string;
          graduation_year: number;
          department_id: string;
          current_company: string;
          current_role: string;
          linkedin_profile_url: string;
          students_recruited: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          full_name: string;
          photo_url?: string;
          phone_number?: string;
          current_address?: string;
          graduation_year: number;
          department_id?: string;
          current_company?: string;
          current_role?: string;
          linkedin_profile_url?: string;
          students_recruited?: string;
        };
      };
      student_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          department_id: string;
          joined_year: number;
          created_at: string;
          updated_at: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          start_time: string;
          end_time: string;
          status: 'Upcoming' | 'Ongoing' | 'Past';
          funding_goal: number;
          banner_image_url: string;
          gallery_images: string[];
          created_at: string;
          updated_at: string;
        };
      };
      donations: {
        Row: {
          id: string;
          donor_id: string;
          event_id: string | null;
          amount: number;
          transaction_id: string;
          donation_date: string;
          created_at: string;
        };
      };
      opportunities: {
        Row: {
          id: string;
          posted_by: string;
          company_name: string;
          role_title: string;
          type: 'Internship' | 'Full-Time' | 'Referral';
          description: string;
          created_at: string;
          updated_at: string;
        };
      };
      requests: {
        Row: {
          id: string;
          requested_by: string;
          requested_to: string;
          type: 'Mentorship' | 'Seminar Talk';
          message: string;
          status: 'Pending' | 'Accepted' | 'Declined';
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}