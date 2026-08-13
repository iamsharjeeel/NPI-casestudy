import { inScope, outOfScope } from "@/lib/content";
import { Kicker, Section } from "@/components/layout-bits";

export function Scope() {
  return (
    <Section>
      <Kicker>Scope transparency</Kicker>
      <h2
        className="max-w-[20ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
      >
        This result did not depend on Xovera AI.
      </h2>
      <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-foreground/85">
        For Newtown, the live system used HighLevel functionality, tailored pipelines, nurtures, staff assignment, tasks, follow-ups, bookings, unified conversations, and Google / Meta ads. Xovera AI, kiosk/walk-in payment functionality and sign-on displays were not live. The case proves the value of getting operating fundamentals right before adding more automation.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border/50 bg-card p-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">In this engagement</div>
          <ul className="mt-4 space-y-2 text-[15px] text-foreground/85">
            {inScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border/50 bg-card p-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Not live here</div>
          <ul className="mt-4 space-y-2 text-[15px] text-foreground/85">
            {outOfScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
