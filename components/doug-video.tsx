"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { testimonial } from "@/lib/content";
import { TESTIMONIAL_VIDEO_DURATION, TESTIMONIAL_VIDEO_URL } from "@/lib/site";
import { Kicker, Section } from "@/components/layout-bits";

export function DougVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fired = useRef(new Set<string>());
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(TESTIMONIAL_VIDEO_URL);

  function mark(event: "testimonial_play" | "testimonial_25" | "testimonial_50" | "testimonial_75" | "testimonial_complete") {
    if (fired.current.has(event)) return;
    fired.current.add(event);
    track(event);
  }

  function onTime() {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const ratio = el.currentTime / el.duration;
    if (ratio >= 0.25) mark("testimonial_25");
    if (ratio >= 0.5) mark("testimonial_50");
    if (ratio >= 0.75) mark("testimonial_75");
  }

  return (
    <Section id="doug">
      <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Kicker>Client voice</Kicker>
          <h2
            className="max-w-[18ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl"
            style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
          >
            The system had to move as fast as the team.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-foreground/80">
            Doug runs Newtown Performance Institute inside a broader club ecosystem with multiple programs, teams and sales motions. His testimonial centers on responsiveness, ease of use, fast changes, support, forms and sales-process structure. This is the operating layer behind that experience.
          </p>
          <div className="mt-6">
            <div className="text-[15px] font-medium text-foreground">{testimonial.speaker}</div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {testimonial.title}
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-card">
            <div className="relative aspect-video bg-black">
              {hasVideo && TESTIMONIAL_VIDEO_URL ? (
                <video
                  ref={videoRef}
                  className="h-full w-full"
                  controls
                  playsInline
                  preload="none"
                  poster="/images/testimonial-poster.jpg"
                  onPlay={() => mark("testimonial_play")}
                  onTimeUpdate={onTime}
                  onEnded={() => mark("testimonial_complete")}
                >
                  <source src={TESTIMONIAL_VIDEO_URL} />
                </video>
              ) : (
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/testimonial-poster.jpg"
                    alt="Training floor at Newtown Performance Institute. Doug’s recorded testimonial will play here once the client-approved file is published."
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                    <div className="max-w-[36ch] px-6 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white" aria-hidden="true">
                        ▶
                      </div>
                      <p className="text-sm text-white/90">
                        16:9 player ready. Client-approved recording is not published on this page yet.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 px-4 py-3">
              <div>
                <div className="text-[14px] font-medium">{testimonial.speaker}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {testimonial.title}
                </div>
              </div>
              <div className="font-mono text-[11px] tabular-nums text-muted-foreground">
                {TESTIMONIAL_VIDEO_DURATION || "Duration pending"}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 text-[13px] text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide transcript" : "Open transcript"}
          </button>
          {open ? (
            <div className="mt-3 rounded-md border border-border/50 bg-card p-4 text-[14px] leading-relaxed text-foreground/80">
              <p>
                A client-approved verbatim transcript has not been cleared for publication. No quotes have been invented.
              </p>
              <p className="mt-3">Doug’s recorded remarks, as briefed, center on:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {testimonial.themes.map((theme) => (
                  <li key={theme}>{theme}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
