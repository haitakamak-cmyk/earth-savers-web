"use client";

import dynamic from "next/dynamic";

const NationalMap = dynamic(() => import("@/components/NationalMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] items-center justify-center rounded-xl border border-wakakusa/25 bg-gray-100 sm:h-[70vh]">
      <p className="text-sm text-text-muted">地図を読み込んでいます...</p>
    </div>
  ),
});

export default function NationalMapLoader() {
  return <NationalMap />;
}
