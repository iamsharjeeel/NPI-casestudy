import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { JsonLd } from "@/components/json-ld";
import { CANONICAL_URL, SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Newtown Athletic Club success story — Xovera",
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "How Xovera helped Newtown Athletic Club / Newtown Performance Institute bring paid acquisition, lead routing, staff follow-up, bookings and nurture into one accountable growth operation — with visible results in under three months.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "Xovera",
    "Newtown Athletic Club",
    "Newtown Performance Institute",
    "GoHighLevel",
    "gym CRM",
    "fitness lead routing",
    "club growth operations",
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: "A faster growth operation for a club that refuses to stand still.",
    description:
      "Xovera × Newtown Athletic Club / NPI. Pipeline snapshots, operating design, and a qualification path for established businesses.",
    url: CANONICAL_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newtown Athletic Club success story — Xovera",
    description:
      "Paid acquisition, routing, follow-up, bookings and nurture in one growth operation. Visible results in under three months.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#070708" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("xovera-theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <JsonLd />
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
