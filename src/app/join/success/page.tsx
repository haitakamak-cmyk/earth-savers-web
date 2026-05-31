import type { Metadata } from "next";

import { GenericSubscribeSuccess } from "../subscribe/success/SubscribeSuccessView";

export const metadata: Metadata = {
  title: "毎月の寄付のお申し込み完了",
  description: "毎月の継続寄付のお申し込みありがとうございます。",
};

export default function SubscribeSuccessPage() {
  return <GenericSubscribeSuccess />;
}
