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

## 団体情報

- 正式名称: ${ORGANIZATION_NAME}
- 英語表記: Earth Savers
- 主な活動地域: 日本
- 主な活動分野: 水源地保全、里山再生、生態系復活、環境教育
- [法人概要](${SITE_URL}/about): 設立趣旨・所在地・代表理事・活動方針
- [情報公開](${SITE_URL}/about/disclosure): 法人運営に関する公開資料

## 主要ページ

- [活動内容](${SITE_URL}/activities): 水源地保全・里山再生・生態系復活の取り組み
- [政策提言](${SITE_URL}/policy): 国・自治体向けの制度提言（実質的支配者開示など）
- [学ぶ](${SITE_URL}/learn): 解説記事・フィールドレポート・用語集・全国マップ
- [用語集](${SITE_URL}/learn/glossary): 環境・制度・技術に関する用語と一次資料
- [フィールドから](${SITE_URL}/learn/field-reports): 現地インタビュー・当事者の記録
- [使える道具](${SITE_URL}/toolkit): 条例ひな型・事例・チェックリストなどの実務資料
- [お知らせ](${SITE_URL}/news): 財団からの公式発表・活動更新
- [参加する](${SITE_URL}/join): 会員・寄付・支援の案内

## サイトポリシー

- [プライバシーポリシー](${SITE_URL}/privacy)
- [利用規約](${SITE_URL}/terms)

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
