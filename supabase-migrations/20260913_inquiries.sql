-- Tabla de entradas inbound del diagnostico publico (/diagnostico).
--
-- Deliberadamente separada de prospects: un prospecto es alguien a quien
-- nosotros salimos a buscar, y una inquiry es alguien que nos escribe. Mezclarlas
-- confunde el pipeline y obligaria a aflojar el aislamiento por usuario que
-- prospects ya tiene.
--
-- Idempotente: se puede ejecutar sobre una base que ya la tenga.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'inquiry_status') THEN
    CREATE TYPE inquiry_status AS ENUM (
      'new',
      'reviewed',
      'conversation',
      'proposal',
      'won',
      'discarded'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status inquiry_status NOT NULL DEFAULT 'new',

  -- Contacto
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,

  -- Proceso actual
  goal TEXT NOT NULL,
  current_process TEXT,
  tools TEXT,

  -- Problema
  pain TEXT NOT NULL,
  frequency TEXT,
  time_spent TEXT,
  people_involved TEXT,
  consequences TEXT,
  business_impact TEXT,

  -- Contexto
  tried_so_far TEXT,
  extra_notes TEXT,

  -- Origen de la visita
  landing_path TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,

  -- Consentimiento: solo el necesario para gestionar la solicitud.
  privacy_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  privacy_accepted_at TIMESTAMPTZ,

  -- Gestion interna
  internal_notes TEXT,
  reviewed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT inquiries_privacy_required CHECK (privacy_accepted)
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);

DROP TRIGGER IF EXISTS inquiries_updated_at ON inquiries;
CREATE TRIGGER inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ------------------------------------------------------------
-- RLS: sin politicas a proposito.
--
-- Una inquiry no tiene dueno en el momento de crearse, asi que no hay un
-- auth.uid() con el que compararla. Con RLS activado y ninguna politica, ni la
-- clave anonima ni una sesion autenticada pueden leer o escribir nada desde el
-- navegador. El unico camino es el servidor: la ruta publica inserta con la
-- service-role, y el panel lee y actualiza con la service-role despues de haber
-- comprobado la sesion. Asi la lectura nunca queda expuesta al cliente.
-- ------------------------------------------------------------
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon can read inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated can read inquiries" ON inquiries;
