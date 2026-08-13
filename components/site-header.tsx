"use client";

import { ButtonLink } from "@/components/button";
import { XOVERA_GO, XOVERA_HOME } from "@/lib/site";

export function SiteHeader() {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.classList.contains("light") ? "dark" : "light";
    root.classList.remove("dark", "light");
    root.classList.add(next);
    window.localStorage.setItem("xovera-theme", next);
  }

  return (
    <header className="glass-surface fixed inset-x-0 top-0 z-50 border-b border-border/40">
      <div className="container mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:px-8">
        <a aria-label="Xovera home" href={XOVERA_HOME}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/xovera-color.svg"
            alt="Xovera"
            width={93}
            height={28}
            className="block select-none"
            style={{ height: 28, width: "auto" }}
            draggable={false}
          />
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle color theme"
            title="Toggle color theme"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-fast hover:border-primary/40 hover:text-foreground"
          >
            <span className="sr-only">Toggle theme</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="hidden dark:block">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="block dark:hidden">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
          <a
            href={XOVERA_GO}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-fast hover:text-foreground md:inline-flex"
          >
            Sign in
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
          <ButtonLink href="#review" variant="primary" size="md" className="h-10 px-4 text-[13px] sm:text-sm">
            Request a Growth Systems Review
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
