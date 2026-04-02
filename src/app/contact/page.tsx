import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | 財団法人 地球防衛群",
  description:
    "財団法人 地球防衛群へのお問い合わせ・環境トラブル相談窓口（駆け込み寺）はこちら。",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-wakakusa-light py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary font-serif">
            お問い合わせ
          </h1>
          <p className="mt-3 text-text-secondary">Contact</p>
        </div>
      </section>

      {/* Two Forms */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* General Contact */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-wakakusa-light rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-wakakusa"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    一般のお問い合わせ
                  </h2>
                  <p className="text-xs text-text-muted">
                    活動・寄付・取材等に関するご質問
                  </p>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    お名前 <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-wakakusa/30 focus:border-wakakusa text-sm"
                    placeholder="山田 花子"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    メールアドレス <span className="text-coral">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-wakakusa/30 focus:border-wakakusa text-sm"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    お問い合わせ種別
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-wakakusa/30 focus:border-wakakusa text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="activity">活動について</option>
                    <option value="donation">寄付・支援について</option>
                    <option value="volunteer">ボランティアについて</option>
                    <option value="media">取材・メディアについて</option>
                    <option value="other">その他</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    お問い合わせ内容 <span className="text-coral">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-wakakusa/30 focus:border-wakakusa text-sm resize-none"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-wakakusa hover:bg-wakakusa-dark text-white font-bold rounded-full transition-colors shadow-sm"
                >
                  送信する
                </button>
              </form>
            </div>

            {/* Help Desk */}
            <div
              id="helpdesk"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-aqua"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-aqua-light rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-aqua"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    駆け込み寺（環境トラブル相談）
                  </h2>
                  <p className="text-xs text-aqua font-medium">
                    メガソーラー・乱開発でお困りの方へ
                  </p>
                </div>
              </div>

              {/* Flow */}
              <div className="mb-6 bg-aqua-light/50 rounded-xl p-4">
                <p className="text-xs font-bold text-aqua-dark mb-2">
                  ご相談から解決までの流れ
                </p>
                <ol className="text-xs text-text-secondary space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 w-5 h-5 bg-aqua text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      1
                    </span>
                    下記フォームよりご相談内容をお送りください
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 w-5 h-5 bg-aqua text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      2
                    </span>
                    事務局より48時間以内にご連絡いたします
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 w-5 h-5 bg-aqua text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      3
                    </span>
                    専門スタッフがヒアリングし、対応策をご提案
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 w-5 h-5 bg-aqua text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      4
                    </span>
                    必要に応じて法的支援・行政連携へつなぎます
                  </li>
                </ol>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="help-name"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      お名前 <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      id="help-name"
                      name="help-name"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-aqua/30 focus:border-aqua text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="help-phone"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      電話番号
                    </label>
                    <input
                      type="tel"
                      id="help-phone"
                      name="help-phone"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-aqua/30 focus:border-aqua text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="help-email"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    メールアドレス <span className="text-coral">*</span>
                  </label>
                  <input
                    type="email"
                    id="help-email"
                    name="help-email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-aqua/30 focus:border-aqua text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="help-location"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    お住まいの地域 <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="help-location"
                    name="help-location"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-aqua/30 focus:border-aqua text-sm"
                    placeholder="例: 岡山県津山市"
                  />
                </div>
                <div>
                  <label
                    htmlFor="help-type"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    トラブルの種類 <span className="text-coral">*</span>
                  </label>
                  <select
                    id="help-type"
                    name="help-type"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-aqua/30 focus:border-aqua text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="mega-solar">
                      メガソーラー計画
                    </option>
                    <option value="forest">山林の乱開発</option>
                    <option value="water">水源地の買収</option>
                    <option value="pollution">
                      水質汚染・PFAS
                    </option>
                    <option value="wildlife">
                      野生動物の被害
                    </option>
                    <option value="other">その他</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="help-detail"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    ご相談内容 <span className="text-coral">*</span>
                  </label>
                  <textarea
                    id="help-detail"
                    name="help-detail"
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-ivory focus:outline-none focus:ring-2 focus:ring-aqua/30 focus:border-aqua text-sm resize-none"
                    placeholder="現在お困りの状況を、できるだけ詳しくお聞かせください。秘密は厳守いたします。"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-aqua hover:bg-aqua-dark text-white font-bold rounded-full transition-colors shadow-sm"
                >
                  相談する（秘密厳守）
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
