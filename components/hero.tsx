import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { Kicker } from "@/components/layout-bits";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto grid max-w-[1320px] items-center gap-12 px-5 md:grid-cols-[1.15fr_0.85fr] md:px-8">
        <div>
          <Kicker>Success story / Fitness + Sports</Kicker>
          <h1
            className="max-w-[18ch] text-balance text-[2.15rem] font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.35rem]"
            style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
          >
            A faster growth operation for a club that{" "}
            <span className="text-gradient">refuses to stand still.</span>
          </h1>
          <p className="mt-6 max-w-[58ch] text-balance text-lg leading-relaxed text-foreground/80 md:text-[1.2rem]">
            How Xovera helped the Newtown Athletic Club / Newtown Performance Institute ecosystem bring paid acquisition, lead routing, staff follow-up, bookings and nurture into one accountable growth operation — with visible results in under three months.
          </p>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
            Featuring Doug, Director of Newtown Performance Institute.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#review" variant="primary" size="lg" conic>
              Request a Growth Systems Review
            </ButtonLink>
          </div>
          <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground">
            Tell us what you are already running, where leads are leaking, and what the business is doing today. If there is a real fit, someone senior from Xovera will respond.
          </p>
        </div>
        <figure className="relative">
          <div className="overflow-hidden rounded-lg border border-border/50 shadow-card">
            <Image
              src="/images/npi-coaches-hero.jpg"
              alt="Coaches and athletes at Newtown Performance Institute, Newtown, Pennsylvania."
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 768px) 100vw, 44vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Newtown Performance Institute · Pennsylvania
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
