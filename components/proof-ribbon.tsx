"use client";

import { track } from "@/lib/analytics";
import { pipelineTotals } from "@/lib/content";

const items = [
  {
    value: "1,885",
    label: "records represented across six supplied pipeline snapshots",
  },
  {
    value: "707",
    label: "records explicitly in nurture / re-engagement stages",
  },
  {
    value: pipelineTotals.timeToVisibleResults,
    label: "client-reported time to visible operating results",
  },
] as const;

export function ProofRibbon() {
  return (
    <section id="proof" className="border-y border-border/40 bg-card/40">
      <div className="container mx-auto max-w-[1320px] px-5 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              className="text-left"
              onClick={() => track("proof_interaction", { location: "proof_ribbon" })}
            >
              <div className="heat-text text-[44px] font-semibold tracking-tight md:text-[52px]" style={{ fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                {item.value}
              </div>
              <p className="mt-2 max-w-[32ch] font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {item.label}
              </p>
            </button>
          ))}
        </div>
        <p className="mt-8 max-w-[72ch] text-[13px] leading-relaxed text-muted-foreground">
          Snapshot scale, not a claim of 1,885 net-new leads. Revenue conversion remains validated downstream in the client&apos;s club systems.
        </p>
      </div>
    </section>
  );
}
