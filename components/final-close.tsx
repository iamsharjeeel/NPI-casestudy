import { ButtonLink } from "@/components/button";
import { Kicker, Section } from "@/components/layout-bits";

export function FinalClose() {
  return (
    <Section className="bg-gradient-subtle">
      <Kicker>Close</Kicker>
      <h2
        className="max-w-[22ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
        style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
      >
        You do not need another layer of software. You need the layers you already pay for to produce a cleaner handoff.
      </h2>
      <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-foreground/85">
        If that is the problem, show us the current operation. We will tell you where Xovera fits, what we would leave alone, and what we would change first.
      </p>
      <div className="mt-9">
        <ButtonLink href="#review" variant="primary" size="lg" conic>
          Request a Growth Systems Review
        </ButtonLink>
      </div>
    </Section>
  );
}
