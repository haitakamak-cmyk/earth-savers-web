import type { Metadata } from "next";
import Link from "next/link";

import { ORGANIZATION_ADDRESS_LINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 財団法人 地球防衛群",
  description:
    "財団法人 地球防衛群（earth savers foundation）における個人情報の取扱いについて説明します。",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-wakakusa-light py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            プライバシーポリシー
          </h1>
          <p className="mt-3 text-text-secondary">Privacy Policy</p>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24">
        <article className="mx-auto max-w-3xl px-4 text-text-secondary sm:px-6">
          <p className="text-sm leading-relaxed">
            財団法人 地球防衛群（以下「当財団」）は、公式ウェブサイト（以下「本サイト」）における利用者の個人情報の重要性を認識し、個人情報の保護に関する法律（個人情報保護法）その他関連法令を遵守し、適切に取り扱います。
          </p>
          <p className="mt-2 text-xs text-text-muted">
            最終更新日：2026年4月2日
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            1. 取得する個人情報
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            当財団は、本サイトの「
            <Link
              href="/contact"
              className="font-medium text-wakakusa-dark underline underline-offset-2 hover:text-wakakusa"
            >
              お問い合わせ
            </Link>
            」フォームを通じて、お名前、メールアドレス、お問い合わせ内容、およびフォームで選択いただく種別等を取得する場合があります。
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            本サイトの閲覧にあたり、サーバーアクセスログとして IP
            アドレス、ブラウザ種別、日時等が自動的に記録されることがあります。
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            継続寄付のお申し込み、寄付内容の確認・変更・停止手続きにあたり、決済サービスを通じて、お名前、メールアドレス、寄付プラン、決済状況、決済に関する識別子等を取得または参照する場合があります。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            2. 利用目的
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed">
            <li>お問い合わせへの対応、連絡のため</li>
            <li>お問い合わせ受付の確認メール（自動返信）の送信のため</li>
            <li>継続寄付の受付、確認、変更、停止、決済状況の管理および運営上の控えの送信のため</li>
            <li>本サイトの運営・改善、不正利用の防止のため</li>
            <li>法令に基づく対応のため</li>
          </ul>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            3. 第三者への提供
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            当財団は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。お問い合わせメールの送信にあたり、当財団が利用するメール配信サービス（例：Resend
            等）の提供者に、送信処理に必要な範囲でデータが預託されることがあります。その場合、当財団は委託先の選定と適切な監督に努めます。
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            継続寄付の決済および寄付内容の管理には、当財団が利用する決済サービス（例：Stripe
            等）を使用します。また、継続寄付の受付、変更、停止等の運営控えの送信にあたり、メール配信サービスの提供者に、送信処理に必要な範囲で氏名、メールアドレス、寄付プラン、決済状況等が預託されることがあります。
          </p>

          <h3 className="mt-6 text-base font-bold text-text-primary">
            3-2. 環境相談における第三者情報の取扱い
          </h3>
          <p className="mt-3 text-sm leading-relaxed">
            環境相談において、相談者以外の第三者に関する情報（事業者名、土地所有者名、行政関係者名、資料画像等）が含まれる場合があります。当財団は、相談対応に必要な範囲でこれらを取り扱い、法令に基づく場合または本人の同意がある場合を除き、外部に公開しません。
          </p>

          <h3 className="mt-6 text-base font-bold text-text-primary">
            3-3. 弁護士・専門家との情報共有
          </h3>
          <p className="mt-3 text-sm leading-relaxed">
            ご相談内容について、専門的助言が必要と判断される場合、相談者の同意を得たうえで、弁護士、研究者、技術専門家その他の協力者に必要最小限の情報を共有することがあります。
          </p>

          <h3 className="mt-6 text-base font-bold text-text-primary">
            3-4. 匿名統計利用
          </h3>
          <p className="mt-3 text-sm leading-relaxed">
            当財団は、個人または特定の事業者・地域が識別されない形に加工したうえで、相談傾向の分析、活動改善、政策提言、啓発資料の作成に利用することがあります。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            4. 保管期間
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            お問い合わせ情報は、対応完了後原則3年間保管し、その後削除または匿名化します。ただし、継続相談、紛争対応、法令上の保存義務、活動記録として必要な場合はこの限りではありません。環境相談など経緯確認が必要な情報については、最長5年間保管する場合があります。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            5. 開示・訂正・削除等
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            個人情報保護法に定める手続に基づき、保有個人データの開示、訂正、利用停止等の請求ができる場合があります。ご希望の際は、下記お問い合わせ窓口までご連絡ください。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            6. Cookie（クッキー）等
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            本サイトでは、現時点で広告配信や行動ターゲティングを目的とした第三者によるトラッキング用
            Cookie を設置していません。サイトの技術的な動作に伴い、セッション管理やセキュリティのために必要最小限の情報がブラウザに保存される場合があります。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            7. 本ポリシーの変更
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            当財団は、法令の改正や事業内容の変更等に応じて、本ポリシーを改定することがあります。改定後の内容は、本サイトに掲載した時点から効力を生じます。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            8. お問い合わせ窓口
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            事務所所在地：{ORGANIZATION_ADDRESS_LINE}
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            個人情報の取扱いに関するお問い合わせは、
            <Link
              href="/contact"
              className="font-medium text-wakakusa-dark underline underline-offset-2 hover:text-wakakusa"
            >
              お問い合わせフォーム
            </Link>
            よりご連絡ください。
          </p>
        </article>
      </section>
    </>
  );
}
