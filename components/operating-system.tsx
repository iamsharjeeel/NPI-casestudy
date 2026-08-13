import { operatingSteps } from "@/lib/content";
import { Kicker, Section } from "@/components/layout-bits";

export function OperatingSystem() {
  return (
    <Section id="system" className="bg-gradient-subtle">
      <Kicker>Operating system</Kicker>
      <h2
        className="max-w-[20ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
      >
        One accountable path from demand to the next conversation.
      </h2>
      <ol className="mt-10 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {operatingSteps.map((step, i) => (
          <li key={step.id} className="flex items-center gap-2">
            <span className="text-primary-glow">{step.label}</span>
            {i < operatingSteps.length - 1 ? <span aria-hidden="true">→</span> : null}
          </li>
        ))}
      </ol>
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {operatingSteps.map((step, index) => (
          <li key={step.id} className="rounded-lg border border-border/50 bg-card p-6 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} · {step.label}
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{step.copy}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
