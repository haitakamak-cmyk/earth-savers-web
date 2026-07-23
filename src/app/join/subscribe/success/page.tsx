import type { Metadata } from "next";

import { verifySubscribeCheckoutSession } from "@/lib/stripe/checkout-session";

import {
  DetailedSubscribeSuccess,
  GenericSubscribeSuccess,
} from "./SubscribeSuccessView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "毎月の寄付のお申し込み完了",
  description: "毎月の継続寄付のお申し込みありがとうございます。",
  robots: {
    index: false,
    follow: false,
  },
};

type SubscribeSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SubscribeSuccessPage({
  searchParams,
}: SubscribeSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const verified = await verifySubscribeCheckoutSession(sessionId);

  if (verified) {
    return <DetailedSubscribeSuccess checkout={verified} />;
  }

  return <GenericSubscribeSuccess />;
}
