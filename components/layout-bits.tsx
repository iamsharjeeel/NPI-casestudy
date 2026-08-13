import type { ReactNode } from "react";

export function Kicker({ children }: { children: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      <span className="inline-block h-px w-6 bg-gradient-to-r from-primary to-transparent" />
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full py-20 md:py-28 ${className}`}>
      <div className="container mx-auto max-w-[1320px] px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Divider() {
  return <div className="letterbox-divider" aria-hidden="true" />;
}
