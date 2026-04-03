import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | 財団法人 地球防衛群",
  description:
    "財団法人 地球防衛群（earth savers foundation）公式ウェブサイトのご利用条件です。",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-wakakusa-light py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            利用規約
          </h1>
          <p className="mt-3 text-text-secondary">Terms of Use</p>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24">
        <article className="mx-auto max-w-3xl px-4 text-text-secondary sm:px-6">
          <p className="text-sm leading-relaxed">
            本規約は、財団法人 地球防衛群（以下「当財団」）が運営する公式ウェブサイト（以下「本サイト」）の利用条件を定めるものです。本サイトをご利用いただく前に、本規約をお読みいただき、同意のうえご利用ください。
          </p>
          <p className="mt-2 text-xs text-text-muted">
            最終更新日：2026年4月2日
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            第1条（適用）
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            本規約は、本サイトの利用に関する当財団と利用者との間の一切の関係に適用されます。当財団が本サイト上で掲載する個別の案内やガイドライン等は、本規約の一部を構成するものとします。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            第2条（利用上の注意）
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed">
            <li>
              本サイトに掲載する文章、画像、ロゴ、デザイン等の著作権その他の権利は、当財団または正当な権利者に帰属します。私的利用の範囲を超える複製、改変、公衆送信等は、法令で認められる場合を除き、事前の書面による承諾が必要です。
            </li>
            <li>
              本サイトの情報は、公開時点のものです。内容の正確性・完全性について当財団は最善を尽くしますが、将来の変更や第三者情報の性質上、一切を保証するものではありません。
            </li>
          </ul>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            第3条（禁止事項）
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            利用者は、本サイトの利用にあたり、法令または公序良俗に違反する行為、当財団または第三者の権利を侵害する行為、本サイトの運営を妨害する行為、その他当財団が不適切と判断する行為をしてはなりません。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            第4条（外部サイトへのリンク）
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            本サイトからリンクされる第三者のウェブサイトの内容は、当該第三者の責任で管理されるものであり、当財団はその内容・可用性について責任を負いません。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            第5条（免責）
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            当財団は、本サイトの利用または利用不能により利用者に生じた損害について、当財団に故意または重過失がある場合を除き、責任を負いません。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            第6条（規約の変更）
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            当財団は、必要に応じて本規約を変更できます。変更後の規約は、本サイト上に掲載した時点から効力を生じるものとします。重要な変更がある場合は、合理的な方法で周知するよう努めます。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            第7条（準拠法・管轄）
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            本規約の準拠法は日本法とし、本サイトに関する紛争については、当財団の所在地を管轄する裁判所を第一審の専属的合意管轄とします。
          </p>

          <h2 className="mt-10 text-lg font-bold text-text-primary">
            お問い合わせ
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            本規約に関するお問い合わせは、
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
