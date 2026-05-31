# Stripe 本番移行チェックリスト

対象: Earth Savers Web の継続寄付（マンスリーサポーター）導線。

## 0. 方針

- 初回 Checkout では住所・電話・配送先を必須取得しない。
- 将来、お礼の品・紙の会報誌などの送付が必要になった場合は、登録者へ案内し Customer Portal で住所を任意更新してもらう。
- Customer Portal は Stripe の no-code login link を使う。自社 API では登録有無を判定しない。
- 本番では Stripe test mode と live mode の値を混在させない。

## 1. コード側の事前確認

- `npm run verify-deploy`
- `npx tsc --noEmit --incremental false`
- `npm run lint`
- `npm run build`
- `npm run verify-ratelimit`

## 2. Supabase 本番/共有DB

マイグレーションを新コードの本番デプロイ前に適用する。

適用順:

1. `20260524000000_prerequisite_users_for_memberships.sql`
2. `20260524100000_create_memberships.sql`
3. `20260525000000_update_memberships_six_plans.sql`
4. `20260525100000_create_stripe_events.sql`
5. `20260525110000_memberships_email_and_user_id_hardening.sql`
6. `20260525120000_stripe_events_add_status.sql`
7. `20260530100000_memberships_stripe_event_watermark.sql`
8. `20260530110000_memberships_atomic_webhook_rpc.sql`

確認項目:

- `memberships.last_stripe_event_created_at` が存在する。
- RPC `upsert_membership_from_checkout` が存在する。
- RPC `update_membership_by_subscription_if_event_newer` が存在する。
- RPC `update_membership_by_customer_if_event_newer` が存在する。

## 3. Stripe Live

Live mode で 6 つの Product / Price を作成する。

| env | プラン | 月額 |
| --- | --- | ---: |
| `STRIPE_PRICE_TANE` | 種の友 | ¥1,000 |
| `STRIPE_PRICE_MIDORI` | 緑の友 | ¥5,000 |
| `STRIPE_PRICE_MIZU` | 水の守人 | ¥10,000 |
| `STRIPE_PRICE_MORI` | 森の番人 | ¥30,000 |
| `STRIPE_PRICE_YAMA` | 山の守護者 | ¥50,000 |
| `STRIPE_PRICE_NANA` | 七世代の大使 | ¥100,000 |

Customer Portal:

- Live mode の Customer Portal login link を有効化する。
- 顧客情報の更新を許可する。住所は将来送付が必要になったときの受け皿として任意。
- 決済手段の更新を許可する。
- サブスクリプションのキャンセルを許可する。
- 必要に応じてプラン変更を許可する。

Webhook:

- Endpoint: `https://earth-savers.org/api/stripe/webhook`
- Events:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `customer.updated`
  - `invoice.paid`
  - `invoice.payment_failed`
- Signing secret `whsec_...` を Vercel Production env に設定する。

## 4. Vercel Production Env

必須:

- `SITE_URL=https://earth-savers.org`
- `NEXT_PUBLIC_SUPABASE_URL=...`
- `SUPABASE_SERVICE_ROLE_KEY=...`
- `STRIPE_SECRET_KEY=sk_live_...`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
- `STRIPE_WEBHOOK_SECRET=whsec_...`
- `NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=https://billing.stripe.com/p/login/...`
- `STRIPE_PRICE_TANE=price_...`
- `STRIPE_PRICE_MIDORI=price_...`
- `STRIPE_PRICE_MIZU=price_...`
- `STRIPE_PRICE_MORI=price_...`
- `STRIPE_PRICE_YAMA=price_...`
- `STRIPE_PRICE_NANA=price_...`

本番推奨:

- `UPSTASH_REDIS_REST_URL=...`
- `UPSTASH_REDIS_REST_TOKEN=...`

任意:

- `NEXT_PUBLIC_SITE_URL=https://earth-savers.org`

## 5. 本番デプロイ

1. マイグレーション適用後にデプロイする。
2. Vercel Production の Environment Variables が live 値だけになっていることを確認する。
3. Production deploy を実行する。
4. `/join/subscribe` と `/join/manage` が 500 にならないことを確認する。

## 6. Live E2E

最小額の `種の友` で 1 件だけ実カード決済を行う。

確認項目:

- Checkout で住所・電話・配送先が必須表示されない。
- 決済後に Success 画面でプラン名・月額が表示される。
- Stripe Dashboard の Webhook 配信が 200。
- Supabase `memberships` に対象メールが `active` で作成/更新される。
- `/join/manage` から Portal login link へ進める。
- Portal でプラン変更・決済手段更新・キャンセル導線が表示される。

テスト後:

- 必要なら Stripe Dashboard で該当 subscription をキャンセルする。
- Webhook によって `memberships.status` が `canceled` へ反映されるか確認する。

## 7. メール変更・住所対応

メールアドレスが古くなり Portal link を受け取れない人が出た場合:

1. 登録時の名前、旧メールアドレス、新メールアドレスを受け取る。
2. Stripe Dashboard で旧メールアドレスを検索し、名前と重複の有無を確認する。
3. 一意に特定できる場合のみ、Stripe Customer のメールを新メールアドレスへ手動更新する。
4. 必要なら Supabase `memberships.email` も同じ値へ更新する。
5. 新メールアドレスで `/join/manage` を試してもらう。

住所が必要になった場合:

1. 対象者へ「お礼の品等の送付に必要な方のみ、登録情報を更新してください」と案内する。
2. `/join/manage` から Portal を開いてもらう。
3. Portal の顧客情報で住所を任意更新してもらう。
4. 必要なときだけ Stripe Dashboard から CSV 等で抽出する。

## 8. ロールバック

- アプリ: Vercel で前回の Production deployment を Promote する。
- 導線停止: `STRIPE_SECRET_KEY` を一時的に空にし、Checkout を準備中/エラーに落とす。
- DB: 今回の migration は CREATE/ADD/RPC 中心。原則 DROP しない。
- Stripe: 既存 subscription は Stripe 側で継続する。アプリを止めても課金は止まらないため、必要な subscription は Dashboard で個別対応する。
