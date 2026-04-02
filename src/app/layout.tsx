import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "財団法人 地球防衛群 | 水と森の未来を守る",
  description:
    "水源を守る。山を守る。未来を守る。七世代先の子どもたちへ、水と森を残すために。公益財団法人 地球防衛群（Earth Savers）の公式サイトです。",
  openGraph: {
    title: "財団法人 地球防衛群 | 水と森の未来を守る",
    description:
      "七世代先の子どもたちへ、水と森を残すために。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenMaru.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
