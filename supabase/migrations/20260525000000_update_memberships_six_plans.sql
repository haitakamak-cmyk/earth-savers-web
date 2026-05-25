-- Web 寄付サブスク: 5プラン実装から6プラン（TANE〜NANA）へ更新
-- 既に 20260524100000_create_memberships.sql を適用済みの環境向け。

DO $$
BEGIN
  IF to_regclass('public.memberships') IS NOT NULL THEN
    ALTER TABLE public.memberships
      DROP CONSTRAINT IF EXISTS memberships_plan_code_check;

    ALTER TABLE public.memberships
      ADD CONSTRAINT memberships_plan_code_check CHECK (
        plan_code IN (
          'tane',
          'midori',
          'mizu',
          'mori',
          'yama',
          'nana'
        )
      );
  END IF;
END $$;

