import type { SupabaseClient } from "@supabase/supabase-js";

import type { MembershipStatus, PlanCode } from "@/lib/stripe/plans";

export interface MembershipRow {
  id: string;
  user_id: string | null;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  email: string;
  name: string | null;
  plan_code: PlanCode;
  status: MembershipStatus;
  current_period_end: string | null;
}

export async function upsertMembershipFromCheckout(params: {
  supabase: SupabaseClient;
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  email: string;
  name: string | null;
  planCode: PlanCode;
  status: MembershipStatus;
  currentPeriodEnd: Date | null;
}): Promise<void> {
  const { error } = await params.supabase.from("memberships").upsert(
    {
      stripe_customer_id: params.stripeCustomerId,
      stripe_subscription_id: params.stripeSubscriptionId,
      email: params.email,
      name: params.name,
      plan_code: params.planCode,
      status: params.status,
      current_period_end: params.currentPeriodEnd?.toISOString() ?? null,
      user_id: null,
    },
    { onConflict: "stripe_customer_id" },
  );

  if (error) {
    throw new Error(`memberships upsert failed: ${error.message}`);
  }
}

export async function updateMembershipBySubscriptionId(params: {
  supabase: SupabaseClient;
  stripeSubscriptionId: string;
  patch: Partial<
    Pick<
      MembershipRow,
      "status" | "plan_code" | "current_period_end" | "email" | "name"
    >
  >;
}): Promise<void> {
  const { error } = await params.supabase
    .from("memberships")
    .update(params.patch)
    .eq("stripe_subscription_id", params.stripeSubscriptionId);

  if (error) {
    throw new Error(`memberships update failed: ${error.message}`);
  }
}

export async function updateMembershipByCustomerId(params: {
  supabase: SupabaseClient;
  stripeCustomerId: string;
  patch: Partial<Pick<MembershipRow, "email" | "name" | "status">>;
}): Promise<void> {
  const { error } = await params.supabase
    .from("memberships")
    .update(params.patch)
    .eq("stripe_customer_id", params.stripeCustomerId);

  if (error) {
    throw new Error(`memberships customer update failed: ${error.message}`);
  }
}

export async function findStripeCustomerIdByEmail(params: {
  supabase: SupabaseClient;
  email: string;
}): Promise<string | null> {
  const { data, error } = await params.supabase
    .from("memberships")
    .select("stripe_customer_id")
    .eq("email", params.email.toLowerCase())
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`memberships lookup failed: ${error.message}`);
  }
  return data?.stripe_customer_id ?? null;
}
