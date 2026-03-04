export type ProposalStatus = "borrador" | "enviada" | "vista" | "aceptada" | "rechazada" | "descartada";

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          phone?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
      };
      proposals: {
        Row: {
          id: string;
          token: string;
          client_id: string | null;
          status: ProposalStatus;
          business_name: string;
          project_type: string;
          project_name: string;
          project_description: string | null;
          deliverables: string[];
          project_size: string;
          total_price: number;
          currency: string;
          payment_structure: string;
          estimated_days: number | null;
          start_date: string | null;
          extra_revision_price: number | null;
          notes: string | null;
          signature_data: string | null;
          signed_at: string | null;
          signed_by_name: string | null;
          terms_accepted: boolean;
          reference_code: string;
          created_at: string;
          updated_at: string;
          sent_at: string | null;
          first_viewed_at: string | null;
          user_id: string;
          rejection_reason: string | null;
          rejected_at: string | null;
        };
        Insert: {
          id?: string;
          token: string;
          client_id?: string | null;
          status?: ProposalStatus;
          business_name?: string;
          project_type: string;
          project_name: string;
          project_description?: string | null;
          deliverables?: string[];
          project_size?: string;
          total_price: number;
          currency?: string;
          payment_structure?: string;
          estimated_days?: number | null;
          start_date?: string | null;
          extra_revision_price?: number | null;
          notes?: string | null;
          signature_data?: string | null;
          signed_at?: string | null;
          signed_by_name?: string | null;
          terms_accepted?: boolean;
          reference_code: string;
          sent_at?: string | null;
          first_viewed_at?: string | null;
          user_id: string;
          rejection_reason?: string | null;
          rejected_at?: string | null;
        };
        Update: {
          id?: string;
          token?: string;
          client_id?: string | null;
          status?: ProposalStatus;
          business_name?: string;
          project_type?: string;
          project_name?: string;
          project_description?: string | null;
          deliverables?: string[];
          project_size?: string;
          total_price?: number;
          currency?: string;
          payment_structure?: string;
          estimated_days?: number | null;
          start_date?: string | null;
          extra_revision_price?: number | null;
          notes?: string | null;
          signature_data?: string | null;
          signed_at?: string | null;
          signed_by_name?: string | null;
          terms_accepted?: boolean;
          reference_code?: string;
          sent_at?: string | null;
          first_viewed_at?: string | null;
          user_id?: string;
          rejection_reason?: string | null;
          rejected_at?: string | null;
        };
      };
      payments: {
        Row: {
          id: string;
          proposal_id: string;
          label: string;
          percentage: number;
          amount: number;
          currency: string;
          due_date: string | null;
          sort_order: number;
          paid: boolean;
          paid_at: string | null;
          payment_method: string | null;
          payment_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          proposal_id: string;
          label: string;
          percentage: number;
          amount: number;
          currency?: string;
          due_date?: string | null;
          sort_order?: number;
          paid?: boolean;
          paid_at?: string | null;
          payment_method?: string | null;
          payment_notes?: string | null;
        };
        Update: {
          id?: string;
          proposal_id?: string;
          label?: string;
          percentage?: number;
          amount?: number;
          currency?: string;
          due_date?: string | null;
          sort_order?: number;
          paid?: boolean;
          paid_at?: string | null;
          payment_method?: string | null;
          payment_notes?: string | null;
        };
      };
      proposal_views: {
        Row: {
          id: string;
          proposal_id: string;
          viewed_at: string;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          proposal_id: string;
          viewed_at?: string;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          proposal_id?: string;
          viewed_at?: string;
          user_agent?: string | null;
        };
      };
    };
    Enums: {
      proposal_status: ProposalStatus;
    };
  };
};
