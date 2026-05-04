import Link from "next/link";
import { redirect } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ResourceLead } from "@/components/ResourceLead";
import {
  POLICY_KIND_LABEL,
  POLICY_KIND_PUBLIC_LEAD,
  type PolicyKind,
  policiesByKind,
} from "@/lib/policies";

import { POLICY_KIND_PATH } from "./policy-kind-path";

export function PolicyKindPageShell({ kind }: { kind: PolicyKind }) {
  const list = policiesByKind(kind);
  if (list.length === 0) redirect("/policy");

  const segment = POLICY_KIND_PATH[kind];
  const path = `/policy/${segment}`;

  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "政策提言", path: "/policy" },
          { name: POLICY_KIND_LABEL[kind], path },
        ]}
      />
      <div className="border-b border-aqua/25 bg-aqua-light/35 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {POLICY_KIND_LABEL[kind]}
          </h1>
          <ResourceLead>{POLICY_KIND_PUBLIC_LEAD[kind]}</ResourceLead>
          <ul className="space-y-3">
            {list.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/policy/${p.slug}`}
                  className="block rounded-xl border border-border bg-white px-4 py-4 text-[15px] font-medium shadow-sm hover:border-aqua/35 hover:bg-aqua-light/25"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
