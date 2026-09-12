ALTER TABLE clients ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

UPDATE clients AS c
SET user_id = p.user_id
FROM proposals AS p
WHERE p.client_id = c.id AND c.user_id IS NULL;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM clients WHERE user_id IS NULL) THEN
    RAISE EXCEPTION 'Hay clientes sin propietario. Asígnalos antes de completar la migración.';
  END IF;
END $$;

ALTER TABLE clients ALTER COLUMN user_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_clients_user ON clients(user_id);
DROP POLICY IF EXISTS "Admin can manage clients" ON clients;
DROP POLICY IF EXISTS "Users can manage own clients" ON clients;
CREATE POLICY "Users can manage own clients" ON clients FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
