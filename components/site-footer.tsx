import { XOVERA_ADS, XOVERA_AI, XOVERA_EMAIL, XOVERA_GO, XOVERA_HOME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto max-w-[1320px] px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/xovera-color.svg" alt="Xovera" width={93} height={28} style={{ height: 28, width: "auto" }} />
            <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-foreground/80">
              Revenue architecture for appointment-driven service businesses. This page is a client success story, not a product tour.
            </p>
            <a className="mt-4 inline-block text-[14px] text-foreground/80 transition-fast hover:text-primary" href={`mailto:${XOVERA_EMAIL}`}>
              {XOVERA_EMAIL}
            </a>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Product</div>
            <ul className="mt-3 space-y-2.5">
              <li><a className="text-[14px] text-foreground/80 transition-fast hover:text-primary" href={XOVERA_HOME}>Xovera</a></li>
              <li><a className="text-[14px] text-foreground/80 transition-fast hover:text-primary" href={XOVERA_ADS}>Xovera Ads</a></li>
              <li><a className="text-[14px] text-foreground/80 transition-fast hover:text-primary" href={XOVERA_AI}>Xovera AI</a></li>
              <li><a className="text-[14px] text-foreground/80 transition-fast hover:text-primary" href={XOVERA_GO}>Xovera Go</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Legal</div>
            <ul className="mt-3 space-y-2.5">
              <li><a className="text-[14px] text-foreground/80 transition-fast hover:text-primary" href={`${XOVERA_HOME}/privacy`}>Privacy</a></li>
              <li><a className="text-[14px] text-foreground/80 transition-fast hover:text-primary" href={`${XOVERA_HOME}/terms`}>Terms</a></li>
              <li><a className="text-[14px] text-foreground/80 transition-fast hover:text-primary" href={`${XOVERA_HOME}/acceptable-use`}>Acceptable use</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/50 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            © {new Date().getFullYear()} Xovera · One accountable system, end-to-end
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Newtown Athletic Club / NPI · Pennsylvania
          </p>
        </div>
      </div>
    </footer>
  );
}
