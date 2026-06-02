#earth-savers-web #セキュリティ #本番前 #gap-check

# Earth Savers Web — 本番前セキュリティ Gap Check（2026-06-01）

**作成**: ロクロー  
**更新**: 2026-06-01（HANDOVER / STRIPE_PRODUCTION_CHECKLIST 精読 + 全検証コマンド実行）  
**正本**: `HANDOVER.md` / `STRIPE_PRODUCTION_CHECKLIST.md`

---

## 1. コード状態サマリ

| 領域 | 状態 | 備考 |
| --- | --- | --- |
| Stripe Phase 1 セキュリティ | **done** | CSRF / rate-limit / webhook 冪等 / DB 硬化 / portal 列挙対策 / atomic RPC |
| Stripe UI | **done** | Checkout overlay / Success 検証 |
| Sentry SDK | **コード導入済** | `@sentry/nextjs` + PII scrub + `/api/internal/sentry-test`。**DSN 未設定のため受信未確認** |
| GitHub Dependabot | **earth-savers-web ON** | alerts + security updates enabled（2026-06-01） |
| GitHub Secret Scanning | **earth-savers-web ON** | push protection enabled |
| Cloudflare | **未導入（PMO フェーズ2保留）** | |
| Supabase migration SQL | **main 上 8 本揃い** | 共有 DB 適用は HANDOVER 記載。本ターン DB 再接続なし |

---

## 2. 検証コマンド結果（2026-06-01 実行）

| コマンド | 要否 | 結果 |
| --- | --- | --- |
| `npm run verify-deploy` | 必須 | **OK** — クリーン・main・origin/main 一致 |
| `npx tsc --noEmit --incremental false` | 必須 | **OK** |
| `npm run lint` | 必須 | **OK**（既存 warning 3 件のみ） |
| `npm run build` | 必須 | **OK**（Sentry 導入後も成功） |
| `npm run verify-ratelimit` | 必須 | **OK** — checkout `10:60000` / portal `3:3600000` |

---

## 3. STRIPE_PRODUCTION_CHECKLIST 対応表

| チェックリスト | 内容 | 分類 | 状態 |
| --- | --- | --- | --- |
| §0 方針 | 住所任意 / Portal Stripe 委譲 / test-live 分離 | コード | **OK** |
| §1 コード検証 | verify-deploy / tsc / lint / build / verify-ratelimit | コード | **OK** |
| §2 Supabase migration 8 本 | watermark + atomic RPC 含む | 本番操作承認待ち | SQL **OK** / DB 実在 **未確認** |
| §3 Stripe Live | 6 Price / Portal / Webhook endpoint | 環境設定 + マスター確認 | **未** |
| §4 Vercel Production env | live keys / SITE_URL / Upstash 推奨 | 環境設定 + 本番操作承認待ち | **未確認** |
| §5 本番 deploy | migration 後 deploy | 本番操作承認待ち | **未** |
| §6 Live E2E | 種の友 ¥1,000 1 件 | マスター確認 + 本番操作承認待ち | **未** |
| §7 運用（メール/住所） | 手順のみ | マスター確認 | 文書 **OK** |
| §8 ロールバック | Vercel Promote / Stripe 継続課金注意 | 文書 | **OK** |

---

## 4. 未完了項目の分類

### 4-A. コード対応

| 項目 | 優先度 | 状態 |
| --- | --- | --- |
| Sentry SDK + `beforeSend` PII フィルタ | 高 | **完了**（DSN 設定後に `/api/internal/sentry-test` で受信確認） |
| Cloudflare 前段化時 IP / Webhook WAF 除外 | 中（フェーズ2） | 未着手（PMO 保留） |
| asset copy path audit | 低 | todo |

**Stripe セキュリティ実装ギャップ**: **なし**（live E2E 前のコード要件は充足）。

### 4-B. 環境設定

| 項目 | 優先度 | 担当 |
| --- | --- | --- |
| Stripe live 6 Price + webhook secret + Portal URL | 高 | マスター |
| `SITE_URL=https://earth-savers.org` | 高 | マスター |
| Upstash Redis（本番 rate limit） | 高 | マスター |
| `SENTRY_DSN` → Vercel **Preview** | 高 | マスター（Sentry アカウント作成後） |
| `SENTRY_DSN` → Vercel **Production** | 中 | **マスター承認必須** |
| GitHub Dependabot（earth-savers-web） | 高 | **完了** |
| GitHub Dependabot（team-sanada-ai-work） | 中 | alerts ON / secret scanning **要再確認** |
| GitHub（czlonkowski/n8n-skills） | 低 | **権限なし**（404）— マスター操作 |

### 4-C. マスター確認

| 項目 |
| --- |
| Stripe Dashboard Live: 6 Product/Price / Portal login link |
| Live Webhook 配信 200 |
| Supabase `memberships` Live 決済反映 |
| `/join/manage` → Portal 導線 |
| Vercel Production env が live 値のみか |
| Sentry 受信（Preview で test route 実行後） |

### 4-D. 本番操作承認待ち（マスター承認必須）

| 操作 | 前提 | 復旧 |
| --- | --- | --- |
| Supabase migration（未適用環境のみ） | §4 Migration ゲート G1–G6 | `STRIPE_PRODUCTION_CHECKLIST.md` §8 |
| Vercel Production deploy（live コード） | env + migration | Vercel Promote |
| Vercel Production live secrets | §3–4 完了 | secret ローテーション |
| Stripe Live E2E | 上記完了後 | Dashboard でキャンセル可 |
| Sentry Production DSN | Preview 受信確認後 | env 削除 |

---

## 5. Supabase Migration ゲート

**原則**: 条件未充足なら **STOP**（実行はマスター承認後）。

| # | 条件 | 状態 |
| --- | --- | --- |
| G1 | migration SQL on main | **OK** |
| G2 | tsc / lint / build / verify-ratelimit | **OK** |
| G3 | 復旧方針 | **OK** §8 |
| G4 | 本番後確認手順 | **OK** §6 |
| G5 | マスター承認 | **未** |
| G6 | DB 上 RPC / watermark 確認 | **未確認** |

**TASK_2026-05-30_supabase_migration_apply**: テスト環境 3 本（100000→120000→110000）は**別セッション**。本番は G5 後。

---

## 6. 未確認（明示）

| 項目 |
| --- |
| Supabase 本番 DB の RPC 実在 |
| Stripe live env / Live E2E |
| Vercel Production env の live/test 混在 |
| Sentry イベント受信（`SENTRY_DSN` 未設定） |
| team-sanada-ai-work の Secret Scanning 状態 |
| czlonkowski/n8n-skills GitHub 設定 |

---

## 7. 次アクション

1. **マスター**: Sentry アカウント + Preview `SENTRY_DSN` → `/api/internal/sentry-test` 確認
2. **マスター**: Stripe Live env + migration G5 + Live E2E
3. **ロクロー**: team-sanada-ai-work の GitHub Security 再確認 / n8n-skills はマスター依頼
4. **サスケ**: Cloudflare 一次情報審査（フェーズ2）
