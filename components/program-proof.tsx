"use client";

import { programs } from "@/lib/content";
import { track } from "@/lib/analytics";
import { Kicker, Section } from "@/components/layout-bits";

export function ProgramProof() {
  return (
    <Section id="programs">
      <Kicker>Program proof</Kicker>
      <h2
        className="max-w-[20ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
      >
        Six pipelines. Current-state distribution, not a conversion rate.
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {programs.map((program) => {
          const listed = program.stages.reduce((sum, stage) => sum + stage.count, 0);
          return (
            <article
              key={program.id}
              className="rounded-lg border border-border/50 bg-card p-6 shadow-card md:p-8"
            >
              <button
                type="button"
                className="flex w-full items-baseline justify-between gap-4 text-left"
                onClick={() => track("proof_interaction", { program: program.id, location: "program_grid" })}
              >
                <h3 className="text-xl font-semibold tracking-tight">{program.name}</h3>
                <span className="heat-text text-3xl font-semibold tabular-nums">{program.records}</span>
              </button>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                records in snapshot · {listed} shown in listed stages
              </p>
              <ul className="mt-6 space-y-2">
                {program.stages.map((stage) => (
                  <li key={stage.label} className="flex items-baseline justify-between gap-4 border-b border-border/30 pb-2 text-[14px]">
                    <span className="text-foreground/85">{stage.label}</span>
                    <span className="font-mono tabular-nums text-muted-foreground">{stage.count}</span>
                  </li>
                ))}
              </ul>
              {program.note ? (
                <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{program.note}</p>
              ) : null}
            </article>
          );
        })}
      </div>
      <p className="mt-8 max-w-[72ch] text-[13px] leading-relaxed text-muted-foreground">
        Current-state stage distribution is not a cohort conversion rate or attributable revenue.
      </p>
    </Section>
  );
}
