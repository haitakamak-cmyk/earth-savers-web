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
  last_stripe_event_created_at: number | null;
}

export type MembershipUpdateResult = "applied" | "skipped_stale" | "not_found";

function parseMembershipUpdateResult(value: unknown): MembershipUpdateResult {
  if (value === "applied" || value === "skipped_stale" || value === "not_found") {
    return value;
  }
  throw new Error(`unexpected membership update result: ${String(value)}`);
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
  stripeEventCreatedAt: number;
}): Promise<MembershipUpdateResult> {
  const { data, error } = await params.supabase.rpc("upsert_membership_from_checkout", {
    p_stripe_customer_id: params.stripeCustomerId,
    p_stripe_subscription_id: params.stripeSubscriptionId,
    p_email: params.email,
    p_name: params.name,
    p_plan_code: params.planCode,
    p_status: params.status,
    p_current_period_end: params.currentPeriodEnd?.toISOString() ?? null,
    p_event_created_at: params.stripeEventCreatedAt,
  });

  if (error) {
    throw new Error(`memberships upsert failed: ${error.message}`);
  }

  return parseMembershipUpdateResult(data);
}

export async function updateMembershipBySubscriptionIdIfEventNewer(params: {
  supabase: SupabaseClient;
  stripeSubscriptionId: string;
  stripeEventCreatedAt: number;
  patch: Partial<
    Pick<
      MembershipRow,
      "status" | "plan_code" | "current_period_end" | "email" | "name"
    >
  >;
}): Promise<MembershipUpdateResult> {
  const { data, error } = await params.supabase.rpc(
    "update_membership_by_subscription_if_event_newer",
    {
      p_stripe_subscription_id: params.stripeSubscriptionId,
      p_event_created_at: params.stripeEventCreatedAt,
      p_status: params.patch.status ?? null,
      p_plan_code: params.patch.plan_code ?? null,
      p_current_period_end: params.patch.current_period_end ?? null,
    },
  );

  if (error) {
    throw new Error(`memberships update failed: ${error.message}`);
  }

  return parseMembershipUpdateResult(data);
}

export async function updateMembershipByCustomerIdIfEventNewer(params: {
  supabase: SupabaseClient;
  stripeCustomerId: string;
  stripeEventCreatedAt: number;
  patch: Partial<Pick<MembershipRow, "email" | "name" | "status">>;
}): Promise<MembershipUpdateResult> {
  const { data, error } = await params.supabase.rpc(
    "update_membership_by_customer_if_event_newer",
    {
      p_stripe_customer_id: params.stripeCustomerId,
      p_event_created_at: params.stripeEventCreatedAt,
      p_email: params.patch.email ?? null,
      p_name: params.patch.name ?? null,
      p_status: params.patch.status ?? null,
    },
  );

  if (error) {
    throw new Error(`memberships customer update failed: ${error.message}`);
  }

  return parseMembershipUpdateResult(data);
}

export type StripeWebhookEventClaimResult =
  | "claimed"
  | "already_processed"
  | "in_progress";

const STALE_PROCESSING_MS = 10 * 60 * 1000;

function isStaleProcessing(startedAt: string | null | undefined): boolean {
  if (!startedAt) return true;
  return Date.now() - new Date(startedAt).getTime() >= STALE_PROCESSING_MS;
}

function reclaimProcessingUpdate(eventType: string) {
  const now = new Date().toISOString();
  return {
    status: "processing" as const,
    event_type: eventType,
    processing_started_at: now,
    processed_at: null,
    failed_at: null,
  };
}

export async function claimStripeWebhookEvent(params: {
  supabase: SupabaseClient;
  eventId: string;
  eventType: string;
}): Promise<StripeWebhookEventClaimResult> {
  const now = new Date().toISOString();
  const { error } = await params.supabase.from("stripe_events").insert({
    event_id: params.eventId,
    event_type: params.eventType,
    status: "processing",
    processing_started_at: now,
  });

  if (!error) {
    return "claimed";
  }

  if (error.code !== "23505") {
    throw new Error(`stripe_events insert failed: ${error.message}`);
  }

  const { data, error: fetchError } = await params.supabase
    .from("stripe_events")
    .select("status, processing_started_at, processed_at")
    .eq("event_id", params.eventId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(`stripe_events lookup failed: ${fetchError.message}`);
  }

  if (data?.status === "processed") {
    return "already_processed";
  }

  if (data?.status === "failed") {
    const { data: reclaimed, error: reclaimError } = await params.supabase
      .from("stripe_events")
      .update(reclaimProcessingUpdate(params.eventType))
      .eq("event_id", params.eventId)
      .eq("status", "failed")
      .select("event_id")
      .maybeSingle();

    if (reclaimError) {
      throw new Error(`stripe_events reclaim failed: ${reclaimError.message}`);
    }

    return reclaimed ? "claimed" : "in_progress";
  }

  if (data?.status === "processing") {
    const startedAt = data.processing_started_at ?? data.processed_at;
    if (!isStaleProcessing(startedAt)) {
      return "in_progress";
    }

    const staleBefore = new Date(Date.now() - STALE_PROCESSING_MS).toISOString();
    const { data: reclaimed, error: reclaimError } = await params.supabase
      .from("stripe_events")
      .update(reclaimProcessingUpdate(params.eventType))
      .eq("event_id", params.eventId)
      .eq("status", "processing")
      .lt("processing_started_at", staleBefore)
      .select("event_id")
      .maybeSingle();

    if (reclaimError) {
      throw new Error(`stripe_events stale reclaim failed: ${reclaimError.message}`);
    }

    if (reclaimed) {
      return "claimed";
    }

    return "in_progress";
  }

  return "in_progress";
}

export async function markStripeWebhookEventProcessed(params: {
  supabase: SupabaseClient;
  eventId: string;
}): Promise<void> {
  const { error } = await params.supabase
    .from("stripe_events")
    .update({
      status: "processed",
      processed_at: new Date().toISOString(),
    })
    .eq("event_id", params.eventId)
    .eq("status", "processing");

  if (error) {
    throw new Error(`stripe_events mark processed failed: ${error.message}`);
  }
}

export async function failStripeWebhookEventClaim(params: {
  supabase: SupabaseClient;
  eventId: string;
}): Promise<void> {
  const { error } = await params.supabase
    .from("stripe_events")
    .update({
      status: "failed",
      failed_at: new Date().toISOString(),
    })
    .eq("event_id", params.eventId)
    .eq("status", "processing");

  if (error) {
    throw new Error(`stripe_events mark failed failed: ${error.message}`);
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
