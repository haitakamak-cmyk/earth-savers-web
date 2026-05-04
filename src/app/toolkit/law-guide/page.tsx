import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "法律ガイド（移転）",
  alternates: { canonical: "/toolkit/legal" },
};

export default function LegacyToolkitLawGuideRedirect() {
  permanentRedirect("/toolkit/legal");
}
