import type { PolicyKind } from "@/lib/policies";

export const POLICY_KIND_PATH: Record<PolicyKind, string> = {
  national: "national",
  local: "local",
  legislative: "legislative",
  "public-comments": "public-comments",
  statements: "statements",
  petitions: "petitions",
};
