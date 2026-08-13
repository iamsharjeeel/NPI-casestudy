import Image from "next/image";
import { Kicker, Section } from "@/components/layout-bits";

export function Challenge() {
  return (
    <Section id="story">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1fr]">
        <div>
          <Kicker>The challenge</Kicker>
          <h2
            className="max-w-[20ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl"
            style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
          >
            Different programs. Different sales paths. One team still needs to know what happens next.
          </h2>
        </div>
        <div>
          <p className="text-[17px] leading-relaxed text-foreground/85">
            Personal training, MMA, youth performance, parties, events and sports-center inquiries do not move through the same decision process. The growth problem was not simply collecting leads. It was making sure every inquiry entered the right process, reached the right staff member, created the right task, received the right follow-up and stayed visible when it did not convert immediately.
          </p>
          <div className="mt-8 overflow-hidden rounded-lg border border-border/50">
            <Image
              src="/images/npi-training.jpg"
              alt="Training in session at Newtown Performance Institute."
              width={1400}
              height={788}
              sizes="(max-width: 768px) 100vw, 44vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
