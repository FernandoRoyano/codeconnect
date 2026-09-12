-- ============================================================
-- SCHEMA: CodeConnect Dashboard
-- Ejecutar en Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: clients
-- ============================================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_user ON clients(user_id);

-- ============================================================
-- ENUM: proposal_status
-- ============================================================
CREATE TYPE proposal_status AS ENUM (
  'borrador',
  'enviada',
  'vista',
  'aceptada',
  'rechazada',
  'descartada'
);

-- ============================================================
-- TABLE: proposals
-- ============================================================
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  status proposal_status DEFAULT 'borrador',
  business_name TEXT NOT NULL DEFAULT 'CodeConnect',
  project_type TEXT NOT NULL,
  project_name TEXT NOT NULL,
  project_description TEXT,
  deliverables TEXT[] DEFAULT '{}',
  project_size TEXT DEFAULT 'medium',
  total_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  payment_structure TEXT DEFAULT 'two',
  estimated_days INTEGER,
  start_date DATE,
  extra_revision_price DECIMAL(10,2),
  notes TEXT,
  signature_data TEXT,
  signed_at TIMESTAMPTZ,
  signed_by_name TEXT,
  terms_accepted BOOLEAN DEFAULT FALSE,
  reference_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  first_viewed_at TIMESTAMPTZ,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rejection_reason TEXT,
  rejected_at TIMESTAMPTZ
);

CREATE INDEX idx_proposals_token ON proposals(token);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_client ON proposals(client_id);
CREATE INDEX idx_proposals_user ON proposals(user_id);
CREATE INDEX idx_proposals_created ON proposals(created_at DESC);

-- ============================================================
-- TABLE: payments
-- ============================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  percentage INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  due_date DATE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  payment_method TEXT,
  payment_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_proposal ON payments(proposal_id);
CREATE INDEX idx_payments_paid ON payments(paid);
CREATE INDEX idx_payments_due ON payments(due_date);

-- ============================================================
-- TABLE: proposal_views
-- ============================================================
CREATE TABLE proposal_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT
);

CREATE INDEX idx_proposal_views_proposal ON proposal_views(proposal_id);

-- ============================================================
-- ENUM: prospect_pipeline_status
-- ============================================================
CREATE TYPE prospect_pipeline_status AS ENUM (
  'identificado',
  'contactado',
  'respondido',
  'interesado',
  'negociando',
  'convertido',
  'descartado'
);

-- ============================================================
-- TABLE: prospects
-- ============================================================
CREATE TABLE prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  position TEXT,
  company TEXT,
  city TEXT,
  country TEXT,
  segment TEXT,
  why_good_prospect TEXT,
  contact_notes TEXT,
  website_url TEXT,
  has_online_booking BOOLEAN DEFAULT FALSE,
  has_app BOOLEAN DEFAULT FALSE,
  website_quality INTEGER,
  pipeline_status prospect_pipeline_status DEFAULT 'identificado',
  email TEXT,
  phone TEXT,
  contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_prospects_user ON prospects(user_id);
CREATE INDEX idx_prospects_pipeline ON prospects(pipeline_status);
CREATE INDEX idx_prospects_company ON prospects(company);

-- ============================================================
-- FUNCTION: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

-- Clients: admin autenticado puede gestionar
CREATE POLICY "Users can manage own clients"
  ON clients FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Proposals: admin ve solo las suyas
CREATE POLICY "Admin can manage own proposals"
  ON proposals FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Payments: admin puede gestionar pagos de sus propuestas
CREATE POLICY "Admin can manage payments"
  ON payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM proposals
      WHERE proposals.id = payments.proposal_id
      AND proposals.user_id = auth.uid()
    )
  );

-- Prospects: cada usuario gestiona solo los suyos
CREATE POLICY "Users can manage own prospects"
  ON prospects FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Proposal views: admin puede leer vistas de sus propuestas
CREATE POLICY "Admin can read views"
  ON proposal_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals
      WHERE proposals.id = proposal_views.proposal_id
      AND proposals.user_id = auth.uid()
    )
  );

-- ============================================================
-- ENUM: inquiry_status
-- ============================================================
CREATE TYPE inquiry_status AS ENUM (
  'new',
  'reviewed',
  'conversation',
  'proposal',
  'won',
  'discarded'
);

-- ============================================================
-- TABLE: inquiries  (diagnosticos inbound desde /diagnostico)
-- Separada de prospects a proposito: prospects es prospeccion saliente.
-- ============================================================
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status inquiry_status NOT NULL DEFAULT 'new',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  goal TEXT NOT NULL,
  current_process TEXT,
  tools TEXT,
  pain TEXT NOT NULL,
  frequency TEXT,
  time_spent TEXT,
  people_involved TEXT,
  consequences TEXT,
  business_impact TEXT,
  tried_so_far TEXT,
  extra_notes TEXT,
  landing_path TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  privacy_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  privacy_accepted_at TIMESTAMPTZ,
  internal_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT inquiries_privacy_required CHECK (privacy_accepted)
);

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_email ON inquiries(email);

CREATE TRIGGER inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS sin politicas a proposito: una inquiry no tiene dueno con el que comparar
-- auth.uid(). Con RLS activado y ninguna politica, ni la clave anonima ni una
-- sesion autenticada leen nada desde el navegador. El unico acceso es el
-- servidor, que usa la service-role despues de comprobar la sesion.
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
