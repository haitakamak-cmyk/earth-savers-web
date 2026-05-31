-- stripe_events: status / 時刻列の追加（旧 100000 適用済み環境向け）
DO $$
BEGIN
  IF to_regclass('public.stripe_events') IS NOT NULL THEN
    ALTER TABLE public.stripe_events
      ADD COLUMN IF NOT EXISTS status text;

    ALTER TABLE public.stripe_events
      ADD COLUMN IF NOT EXISTS processing_started_at timestamptz;

    ALTER TABLE public.stripe_events
      ADD COLUMN IF NOT EXISTS failed_at timestamptz;

    ALTER TABLE public.stripe_events
      ALTER COLUMN processed_at DROP NOT NULL;

    ALTER TABLE public.stripe_events
      ALTER COLUMN processed_at DROP DEFAULT;

    UPDATE public.stripe_events
    SET status = 'processed'
    WHERE status IS NULL;

    UPDATE public.stripe_events
    SET processing_started_at = COALESCE(processing_started_at, processed_at, now())
    WHERE processing_started_at IS NULL;

    ALTER TABLE public.stripe_events
      ALTER COLUMN status SET DEFAULT 'processing';

    ALTER TABLE public.stripe_events
      ALTER COLUMN status SET NOT NULL;

    ALTER TABLE public.stripe_events
      ALTER COLUMN processing_started_at SET DEFAULT now();

    ALTER TABLE public.stripe_events
      ALTER COLUMN processing_started_at SET NOT NULL;

    ALTER TABLE public.stripe_events
      DROP CONSTRAINT IF EXISTS stripe_events_status_check;

    ALTER TABLE public.stripe_events
      ADD CONSTRAINT stripe_events_status_check CHECK (
        status IN ('processing', 'processed', 'failed')
      );
  END IF;
END $$;
