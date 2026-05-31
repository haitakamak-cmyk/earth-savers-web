-- Stripe Webhook イベントの冪等化（at-least-once 配信対策）
CREATE TABLE IF NOT EXISTS public.stripe_events (
  event_id text PRIMARY KEY,
  event_type text NOT NULL,
  status text NOT NULL DEFAULT 'processing',
  processing_started_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  failed_at timestamptz,
  CONSTRAINT stripe_events_status_check CHECK (
    status IN ('processing', 'processed', 'failed')
  )
);

ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;
