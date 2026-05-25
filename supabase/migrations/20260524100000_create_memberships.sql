-- 20260524100000_create_memberships.sql
CREATE TABLE public.memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  stripe_customer_id text NOT NULL UNIQUE,
  stripe_subscription_id text UNIQUE,
  email text NOT NULL,
  name text,
  plan_code text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  current_period_end timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT memberships_status_check CHECK (
    status IN ('active', 'past_due', 'canceled', 'incomplete')
  ),
  CONSTRAINT memberships_plan_code_check CHECK (
    plan_code IN (
      'tane',
      'midori',
      'mizu',
      'mori',
      'yama',
      'nana'
    )
  )
);

ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_read_memberships" ON public.memberships
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid()
      AND u.role IN ('super_admin', 'secretariat')
    )
  );

CREATE INDEX idx_memberships_stripe_customer ON public.memberships(stripe_customer_id);
CREATE INDEX idx_memberships_email ON public.memberships(email);
CREATE INDEX idx_memberships_stripe_subscription ON public.memberships(stripe_subscription_id);

DROP TRIGGER IF EXISTS trg_memberships_updated_at ON public.memberships;
CREATE TRIGGER trg_memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
