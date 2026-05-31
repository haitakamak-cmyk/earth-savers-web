-- Webhook の out-of-order 配信で membership が古い状態に戻らないよう、Stripe event.created を保持
DO $$
BEGIN
  IF to_regclass('public.memberships') IS NOT NULL THEN
    ALTER TABLE public.memberships
      ADD COLUMN IF NOT EXISTS last_stripe_event_created_at bigint;

    COMMENT ON COLUMN public.memberships.last_stripe_event_created_at IS
      'Unix seconds (Stripe Event.created). Older webhook events are ignored.';
  END IF;
END $$;
