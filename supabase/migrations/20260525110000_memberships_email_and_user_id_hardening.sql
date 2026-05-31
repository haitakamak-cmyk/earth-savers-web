-- memberships.email の小文字保証（Webhook / Portal 照会との整合）
DO $$
BEGIN
  IF to_regclass('public.memberships') IS NOT NULL THEN
    UPDATE public.memberships
    SET email = lower(email)
    WHERE email <> lower(email);

    ALTER TABLE public.memberships
      DROP CONSTRAINT IF EXISTS memberships_email_lowercase_check;

    ALTER TABLE public.memberships
      ADD CONSTRAINT memberships_email_lowercase_check CHECK (email = lower(email));
  END IF;
END $$;
