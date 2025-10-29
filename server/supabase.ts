import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ublpcmzsdgccxrqgiign.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVibHBjbXpzZGdjY3hycWdpaWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc0MjM4NywiZXhwIjoyMDc3MzE4Mzg3fQ.VSTsoH8J-jj3ESXdQLa0w58uvUqmcBuJhlKdBHSLEA0';

// Server-side client with service role key (has admin privileges)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database schema types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          open_id: string;
          name: string | null;
          email: string | null;
          login_method: string | null;
          role: 'user' | 'admin';
          phone_number: string | null;
          national_id: string | null;
          company: string | null;
          net_salary: number | null;
          currency: string;
          kyc_status: 'pending' | 'in_progress' | 'verified' | 'rejected';
          kyc_completed_at: string | null;
          pin: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          postal_code: string | null;
          country: string | null;
          created_at: string;
          updated_at: string;
          last_signed_in: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      bank_accounts: {
        Row: {
          id: number;
          user_id: number;
          account_title: string;
          account_number: string;
          bank_name: string;
          iban: string | null;
          is_default: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bank_accounts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bank_accounts']['Insert']>;
      };
      salary_advances: {
        Row: {
          id: number;
          user_id: number;
          amount: number;
          service_fee: number;
          total_amount: number;
          status: 'pending' | 'approved' | 'disbursed' | 'repaid' | 'rejected';
          bank_account_id: number | null;
          requested_at: string;
          approved_at: string | null;
          disbursed_at: string | null;
          repaid_at: string | null;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['salary_advances']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['salary_advances']['Insert']>;
      };
      transactions: {
        Row: {
          id: number;
          user_id: number;
          salary_advance_id: number | null;
          type: 'salary_advance' | 'repayment' | 'fee' | 'transfer';
          amount: number;
          status: 'pending' | 'completed' | 'failed';
          description: string | null;
          reference_number: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
      cards: {
        Row: {
          id: number;
          user_id: number;
          card_number: string;
          cardholder_name: string;
          expiry_month: number;
          expiry_year: number;
          cvv: string | null;
          card_type: string;
          status: 'active' | 'locked' | 'expired';
          balance: number;
          daily_limit: number | null;
          monthly_limit: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['cards']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['cards']['Insert']>;
      };
      card_transactions: {
        Row: {
          id: number;
          card_id: number;
          amount: number;
          merchant: string | null;
          category: string | null;
          status: 'pending' | 'completed' | 'failed';
          transaction_date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['card_transactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['card_transactions']['Insert']>;
      };
    };
  };
};
