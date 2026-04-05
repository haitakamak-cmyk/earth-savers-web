import type { Metadata } from "next";

const SHOP_URL = "https://back-nature-store.com/";

export const metadata: Metadata = {
  title: "買って応援",
  description:
    "地球防衛群ショップでのお買い物が、地球防衛群の活動支援につながります。自然に還るプロダクトで、毎日の暮らしから地球を守ろう。",
};

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

const steps = [
  "地球防衛群ショップでお買い物",
  "購入金額の一部が環境活動へ",
  "水源地保全・里山再生の活動などに使われます",
];

export default function ShopPage() {
  return (
    <>
      <section className="bg-wakakusa-light py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            買って応援
          </h1>
          <p className="mt-3 text-text-secondary">Support by Shopping</p>
        </div>
      </section>

      <section className="bg-ivory py-14 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-text-primary">
            「お買い物が、地球を守る支援になる」
          </h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            地球防衛群ショップは、自然に還る素材・環境負荷を抑えたプロダクトを厳選したオンラインショップです。
            <br />
            購入金額の一部が地球防衛群の活動支援に充てられます。
          </p>
        </div>
      </section>

      <section className="bg-ivory-warm py-16 sm:py-24">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          <div className="rounded-2xl border-2 border-wakakusa/30 bg-white p-8 shadow-sm">
            <p className="text-xl font-bold text-text-primary">Back Nature Store</p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              自然素材・無添加・サステナブルにこだわったプロダクトを届けるオンラインショップ
            </p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-wakakusa px-8 py-4 font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              ショップを見る
              <ExternalLinkIcon className="h-4 w-4 shrink-0" />
            </a>
            <p className="mt-3 text-xs text-text-muted">
              外部サイト (back-nature-store.com) へ移動します
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary">
            仕組み
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {steps.map((text, i) => (
              <div key={text} className="text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-wakakusa text-lg font-bold text-white">
                  {i + 1}
                </div>
                <p className="text-sm font-medium leading-relaxed text-text-secondary sm:text-base">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
