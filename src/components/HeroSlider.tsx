"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/photos/hero-stumps.jpeg",
    alt: "切り株とメガソーラー - 失われゆく森",
    imageClassName: "object-cover object-center",
  },
  {
    src: "/images/photos/hero-pool-waterfall.png",
    alt: "森の中の清らかな湧水と小さな滝",
    // 滝は写真の上側。縦の % は小さいほど上が見える（大きいと下寄りで滝が枠外に出る）
    imageClassName:
      "object-cover object-[center_30%] sm:object-[center_26%] md:object-[center_22%]",
  },
  {
    src: "/images/photos/hero-forest-sun.png",
    alt: "木漏れ日と森の木々 - 守るべき山の息吹",
    imageClassName: "object-cover object-[center_45%]",
  },
] as const;

const INTERVAL_MS = 5000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative h-[80vh] max-h-[700px] min-h-[500px] w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label="トップビジュアル"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "z-0 opacity-100" : "z-0 opacity-0"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className={slide.imageClassName}
            sizes="100vw"
          />
        </div>
      ))}

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/30 to-black/10"
        aria-hidden
      />
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-3xl font-bold leading-tight tracking-wide text-white drop-shadow-lg sm:text-4xl md:text-5xl">
          <span className="block lg:inline">水源を守る。</span>
          <span className="block lg:inline">山を守る。</span>
          <span className="block lg:inline">未来を守る。</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 drop-shadow sm:mt-6 sm:text-lg md:text-xl">
          日本の宝「命の水と森」を子どもたちへ残す。
          <br className="hidden sm:block" />
          財団法人「地球防衛群」
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/join"
            className="rounded-full bg-wakakusa px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-wakakusa-dark"
          >
            今すぐ支援する
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-white/30 bg-white/20 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            私たちについて
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="スライドの選択"
      >
        {slides.map((slide, i) => (
          <button
            key={`indicator-${slide.src}`}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`スライド ${i + 1} を表示`}
            onClick={() => setCurrent(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === current
                ? "scale-125 bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
