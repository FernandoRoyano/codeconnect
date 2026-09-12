-- Pone al dia una base creada con una version anterior de supabase-schema.sql.
-- La tabla prospects y las dos columnas de rechazo existen desde hace tiempo en
-- el proyecto de Supabase, pero nunca llegaron al esquema versionado: un entorno
-- nuevo levantado desde el repositorio se quedaba sin ellas y el panel fallaba.
--
-- Reconstruida por introspeccion del esquema real, no a mano. Es idempotente:
-- se puede ejecutar sobre una base que ya las tenga.

-- ------------------------------------------------------------
-- proposals: motivo y fecha de rechazo
-- ------------------------------------------------------------
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ;

-- ------------------------------------------------------------
-- prospects
-- ------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'prospect_pipeline_status') THEN
    CREATE TYPE prospect_pipeline_status AS ENUM (
      'identificado',
      'contactado',
      'respondido',
      'interesado',
      'negociando',
      'convertido',
      'descartado'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS prospects (
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

CREATE INDEX IF NOT EXISTS idx_prospects_user ON prospects(user_id);
CREATE INDEX IF NOT EXISTS idx_prospects_pipeline ON prospects(pipeline_status);
CREATE INDEX IF NOT EXISTS idx_prospects_company ON prospects(company);

DROP TRIGGER IF EXISTS prospects_updated_at ON prospects;
CREATE TRIGGER prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own prospects" ON prospects;
CREATE POLICY "Users can manage own prospects" ON prospects FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
