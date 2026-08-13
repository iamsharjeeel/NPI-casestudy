import { beforeAfter } from "@/lib/content";
import { Kicker, Section } from "@/components/layout-bits";

export function BeforeAfter() {
  return (
    <Section>
      <Kicker>Before / after</Kicker>
      <h2
        className="max-w-[18ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
      >
        The work was the handoff, not another dashboard.
      </h2>
      <div className="mt-12 divide-y divide-border/40 border-y border-border/40">
        {beforeAfter.map((row) => (
          <div key={row.before} className="grid gap-4 py-8 md:grid-cols-2 md:gap-12">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Before</div>
              <p className="mt-2 text-[16px] leading-relaxed text-foreground/75">{row.before}</p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-glow">After</div>
              <p className="mt-2 text-[16px] leading-relaxed text-foreground">{row.after}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
