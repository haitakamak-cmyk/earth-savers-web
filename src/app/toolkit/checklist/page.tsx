import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "実務チェックリスト（移転）",
  alternates: { canonical: "/toolkit/operations" },
};

export default function LegacyToolkitChecklistRedirect() {
  permanentRedirect("/toolkit/operations");
}
