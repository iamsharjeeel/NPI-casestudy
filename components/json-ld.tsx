import { CANONICAL_URL, SITE_NAME, XOVERA_EMAIL, XOVERA_HOME } from "@/lib/site";
import { testimonial } from "@/lib/content";

export function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: XOVERA_HOME,
      logo: `${XOVERA_HOME}/brand/xovera-color.svg`,
      email: XOVERA_EMAIL,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Newtown Athletic Club / NPI success story — Xovera",
      url: CANONICAL_URL,
      description:
        "How Xovera helped Newtown Athletic Club and Newtown Performance Institute put paid acquisition, routing, follow-up, bookings and nurture into one growth operation.",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: XOVERA_HOME },
      about: [
        { "@type": "Organization", name: "Newtown Athletic Club", address: { "@type": "PostalAddress", addressLocality: "Newtown", addressRegion: "PA", addressCountry: "US" } },
        { "@type": "Organization", name: "Newtown Performance Institute" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "A faster growth operation for a club that refuses to stand still.",
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${XOVERA_HOME}/brand/xovera-color.svg` } },
      mainEntityOfPage: CANONICAL_URL,
      articleSection: "Customer success",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Doug",
      jobTitle: testimonial.title,
      worksFor: { "@type": "Organization", name: "Newtown Performance Institute" },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
