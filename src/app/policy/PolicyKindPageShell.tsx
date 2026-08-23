import { redirect } from "next/navigation";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";
import {
  POLICY_KIND_LABEL,
  POLICY_KIND_PUBLIC_LEAD,
  type PolicyKind,
  policiesByKind,
} from "@/lib/policies";

import { PolicyEntryCard } from "./PolicyEntryCard";
import { POLICY_KIND_PATH } from "./policy-kind-path";

export function PolicyKindPageShell({ kind }: { kind: PolicyKind }) {
  const list = policiesByKind(kind);
  if (list.length === 0) redirect("/policy");

  const segment = POLICY_KIND_PATH[kind];
  const path = `/policy/${segment}`;

  return (
    <div className="bg-ivory">
      <div className="border-b border-aqua/25 bg-aqua-light/35 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            tone="aqua"
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "政策提言", path: "/policy" },
              { name: POLICY_KIND_LABEL[kind], path },
            ]}
          />
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {POLICY_KIND_LABEL[kind]}
          </h1>
          <ResourceLead>{POLICY_KIND_PUBLIC_LEAD[kind]}</ResourceLead>
          <ul className="space-y-4">
            {list.map((p) => (
              <li key={p.slug}>
                <PolicyEntryCard policy={p} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
