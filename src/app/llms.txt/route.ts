import { NextResponse } from "next/server";

import {
  ORGANIZATION_NAME,
  SITE_ALLOW_SEARCH_INDEXING,
  SITE_ORGANIZATION_DESCRIPTION_SHORT,
  SITE_URL,
} from "@/lib/site";

/**
 * llmstxt.org 書式の AI 向けサイト案内。
 * 公開スイッチOFF中は robots/sitemap と同様に 404（先行公開しない）。
 */
export function GET() {
  if (!SITE_ALLOW_SEARCH_INDEXING) {
    return new NextResponse(null, { status: 404 });
  }

  const body = `# ${ORGANIZATION_NAME}

> ${SITE_ORGANIZATION_DESCRIPTION_SHORT}

## 主要ページ

- [法人概要](${SITE_URL}/about): 設立趣旨・事務所所在地・代表理事など法人の基本情報
- [政策提言](${SITE_URL}/policy): 国・自治体向けの制度提言（実質的支配者開示など）
- [学ぶ](${SITE_URL}/learn): 解説記事・フィールドレポート・用語集・全国マップ
- [フィールドから](${SITE_URL}/learn/field-reports): 現地インタビュー・当事者の記録
- [使える道具](${SITE_URL}/toolkit): 条例ひな型・事例・チェックリストなどの実務資料
- [参加する](${SITE_URL}/join): 会員・寄付・支援の案内

## お問い合わせ

- [お問い合わせフォーム](${SITE_URL}/contact)
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
