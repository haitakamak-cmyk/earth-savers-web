import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "導入・訴訟事例（移転）",
  alternates: { canonical: "/toolkit/cases" },
};

export default function LegacyToolkitCaseStudiesRedirect() {
  permanentRedirect("/toolkit/cases");
}
