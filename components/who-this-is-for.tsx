import { icp } from "@/lib/content";
import { Kicker, Section } from "@/components/layout-bits";

const stats = [
  { value: icp.employees, label: "employees" },
  { value: icp.revenue, label: "annual revenue" },
  { value: icp.locations, label: "locations" },
  { value: icp.acv, label: "avg customer value" },
] as const;

export function WhoThisIsFor() {
  return (
    <Section id="fit">
      <Kicker>Who this is for</Kicker>
      <h2
        className="max-w-[18ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
      >
        For businesses that already have something worth scaling.
      </h2>
      <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-foreground/85">
        Xovera is for established appointment-driven and membership businesses with real revenue, existing demand or media activity, a team, and a measurable handoff problem. If leads already arrive and then stall — owner unclear, follow-up late, nurture absent, ads judged only by clicks — this is the conversation.
      </p>
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="heat-text text-3xl font-semibold tracking-tight md:text-4xl">{stat.value}</div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-[62ch] text-[14px] leading-relaxed text-muted-foreground">
        Those ranges are the live corporate ICP, not a hard gate. Qualified exceptions exist — including operators with more locations or revenue, if the handoff problem is real and the business is already producing.
      </p>
    </Section>
  );
}
