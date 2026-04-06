import type { Metadata } from "next";
import Link from "next/link";

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

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            2. 利用目的
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed">
            <li>お問い合わせへの対応、連絡のため</li>
            <li>お問い合わせ受付の確認メール（自動返信）の送信のため</li>
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

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            4. 保管期間
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            取得した個人情報は、利用目的の達成に必要な期間を超えて保持しないよう努めます。具体的な保存期間は、お問い合わせの性質および法令上の保存義務に応じて定めます。
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
            当財団の所在地：岡山県津山市小田中1403
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
