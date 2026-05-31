-- Webhook membership 更新を event.created 条件付きの単一 SQL で atomic に実行

CREATE OR REPLACE FUNCTION public.upsert_membership_from_checkout(
  p_stripe_customer_id text,
  p_stripe_subscription_id text,
  p_email text,
  p_name text,
  p_plan_code text,
  p_status text,
  p_current_period_end timestamptz,
  p_event_created_at bigint
) RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH upserted AS (
    INSERT INTO public.memberships (
      stripe_customer_id,
      stripe_subscription_id,
      email,
      name,
      plan_code,
      status,
      current_period_end,
      last_stripe_event_created_at
    ) VALUES (
      p_stripe_customer_id,
      p_stripe_subscription_id,
      lower(p_email),
      p_name,
      p_plan_code,
      p_status,
      p_current_period_end,
      p_event_created_at
    )
    ON CONFLICT (stripe_customer_id) DO UPDATE SET
      stripe_subscription_id = EXCLUDED.stripe_subscription_id,
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      plan_code = EXCLUDED.plan_code,
      status = EXCLUDED.status,
      current_period_end = EXCLUDED.current_period_end,
      last_stripe_event_created_at = EXCLUDED.last_stripe_event_created_at
    WHERE memberships.last_stripe_event_created_at IS NULL
       OR memberships.last_stripe_event_created_at <= EXCLUDED.last_stripe_event_created_at
    RETURNING id
  )
  SELECT CASE
    WHEN EXISTS (SELECT 1 FROM upserted) THEN 'applied'
    WHEN EXISTS (
      SELECT 1
      FROM public.memberships m
      WHERE m.stripe_customer_id = p_stripe_customer_id
    ) THEN 'skipped_stale'
    ELSE 'not_found'
  END;
$$;

CREATE OR REPLACE FUNCTION public.update_membership_by_subscription_if_event_newer(
  p_stripe_subscription_id text,
  p_event_created_at bigint,
  p_status text DEFAULT NULL,
  p_plan_code text DEFAULT NULL,
  p_current_period_end timestamptz DEFAULT NULL
) RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH updated AS (
    UPDATE public.memberships m
    SET
      status = COALESCE(p_status, m.status),
      plan_code = COALESCE(p_plan_code, m.plan_code),
      current_period_end = COALESCE(p_current_period_end, m.current_period_end),
      last_stripe_event_created_at = p_event_created_at
    WHERE m.stripe_subscription_id = p_stripe_subscription_id
      AND (
        m.last_stripe_event_created_at IS NULL
        OR m.last_stripe_event_created_at <= p_event_created_at
      )
    RETURNING m.id
  )
  SELECT CASE
    WHEN EXISTS (SELECT 1 FROM updated) THEN 'applied'
    WHEN EXISTS (
      SELECT 1
      FROM public.memberships m
      WHERE m.stripe_subscription_id = p_stripe_subscription_id
    ) THEN 'skipped_stale'
    ELSE 'not_found'
  END;
$$;

CREATE OR REPLACE FUNCTION public.update_membership_by_customer_if_event_newer(
  p_stripe_customer_id text,
  p_event_created_at bigint,
  p_email text DEFAULT NULL,
  p_name text DEFAULT NULL,
  p_status text DEFAULT NULL
) RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH updated AS (
    UPDATE public.memberships m
    SET
      email = COALESCE(lower(p_email), m.email),
      name = COALESCE(p_name, m.name),
      status = COALESCE(p_status, m.status),
      last_stripe_event_created_at = p_event_created_at
    WHERE m.stripe_customer_id = p_stripe_customer_id
      AND (
        m.last_stripe_event_created_at IS NULL
        OR m.last_stripe_event_created_at <= p_event_created_at
      )
    RETURNING m.id
  )
  SELECT CASE
    WHEN EXISTS (SELECT 1 FROM updated) THEN 'applied'
    WHEN EXISTS (
      SELECT 1
      FROM public.memberships m
      WHERE m.stripe_customer_id = p_stripe_customer_id
    ) THEN 'skipped_stale'
    ELSE 'not_found'
  END;
$$;
