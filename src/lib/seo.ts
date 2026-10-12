import {
  CONTENT_UPDATED,
  SITE_URL,
  areaPath,
  areas,
  business,
  isPlaceholder,
  servicePath,
  services,
  type Faq,
  type Service,
} from "./business";

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOGO_URL = `${SITE_URL}/afon-logo.png`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export type Crumb = { name: string; path: string };

export type PageInfo = { path: string; title: string; description: string };

/** Static (non-generated) pages. Titles ≤ 60 chars, descriptions ≤ 155 chars (enforced by tests). */
export const staticPages = {
  home: {
    path: "/",
    title: "AFON | Electrical Repair in Los Angeles — Upfront Prices",
    description:
      "Local, family-run electrical repair in Los Angeles: troubleshooting, outlets, switches, fixtures, fans and GFCIs. Upfront price before any work.",
  },
  services: {
    path: "/services",
    title: "Small Electrical Repair Services in Los Angeles | AFON",
    description:
      "Six small electrical repair services for Los Angeles homes — what each includes, what's out of scope, and how upfront pricing works.",
  },
  areas: {
    path: "/service-areas",
    title: "Service Areas: Los Angeles, Glendale, Burbank & More | AFON",
    description:
      "AFON handles small electrical repairs in Los Angeles, Glendale, Burbank, Pasadena, North Hollywood, Van Nuys, Sherman Oaks and Hollywood.",
  },
  about: {
    path: "/about",
    title: "About AFON | Local, Family-Run Electrical Repair in LA",
    description:
      "Who we are, why we keep every job small, and how we work: upfront prices, clear explanations and careful repairs for Los Angeles homes.",
  },
  faq: {
    path: "/faq",
    title: "Electrical Repair FAQ — Pricing, Scope & Scheduling | AFON",
    description:
      "Answers about AFON's pricing, service area, scheduling, payment and which small electrical jobs we take in Los Angeles — and which we don't.",
  },
  contact: {
    path: "/contact",
    title: "Contact AFON | Get a Free Electrical Repair Quote in LA",
    description:
      "Call, text or send a quote request to AFON for small electrical repairs in Los Angeles. Free phone consultation and an upfront price.",
  },
} satisfies Record<string, PageInfo>;

export function servicePage(service: Service): PageInfo {
  return {
    path: servicePath(service),
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export function areaPage(slug: string): PageInfo {
  const area = areas.find((a) => a.slug === slug);
  if (!area) throw new Error(`Unknown area ${slug}`);
  return { path: areaPath(area), title: area.metaTitle, description: area.metaDescription };
}

/** Every indexable page — the sitemap is generated from this list. */
export function allPages(): PageInfo[] {
  return [
    staticPages.home,
    staticPages.services,
    ...services.map(servicePage),
    staticPages.areas,
    ...areas.map((a) => areaPage(a.slug)),
    staticPages.about,
    staticPages.faq,
    staticPages.contact,
  ];
}

export const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

// ---------- JSON-LD builders ----------

export function electricianJsonLd() {
  const node: Record<string, unknown> = {
    "@type": "Electrician",
    "@id": BUSINESS_ID,
    name: business.name,
    alternateName: `${business.fullName} — ${business.tagline}`,
    description: business.description,
    url: `${SITE_URL}/`,
    logo: LOGO_URL,
    image: OG_IMAGE,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    areaServed: areas.map((a) => ({
      "@type": a.kind === "City" ? "City" : "Place",
      name: a.kind === "City" ? `${a.name}, CA` : `${a.name}, Los Angeles, CA`,
    })),
    knowsAbout: services.map((s) => s.title),
  };
  if (!isPlaceholder(business.phone.display)) node["telephone"] = business.phone.display;
  if (!isPlaceholder(business.email)) node["email"] = business.email;
  if (!isPlaceholder(business.googleBusinessProfileUrl))
    node["sameAs"] = [business.googleBusinessProfileUrl];
  return node;
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: business.name,
    alternateName: business.fullName,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(servicePath(service))}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: absoluteUrl(servicePath(service)),
    provider: { "@id": BUSINESS_ID },
    areaServed: areas.map((a) => a.name),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

type HeadOptions = {
  page: PageInfo;
  crumbs: Crumb[];
  extraJsonLd?: Record<string, unknown>[];
  links?: Record<string, string>[];
};

/** Builds the head() return value for a page: title, description, canonical, OG/Twitter, JSON-LD. */
export function pageHead({ page, crumbs, extraJsonLd = [], links = [] }: HeadOptions) {
  const url = absoluteUrl(page.path);
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: business.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${business.name} — ${business.tagline}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: OG_IMAGE },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@graph": [
            electricianJsonLd(),
            websiteJsonLd(),
            breadcrumbJsonLd(crumbs),
            ...extraJsonLd,
          ],
        },
      },
    ],
    links: [{ rel: "canonical", href: url }, ...links],
  };
}

export const HOME_CRUMB: Crumb = { name: "Home", path: "/" };

export function sitemapXml() {
  const urls = allPages()
    .map(
      (p) =>
        `  <url>\n    <loc>${absoluteUrl(p.path)}</loc>\n    <lastmod>${CONTENT_UPDATED}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p.path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function robotsTxt() {
  const bots = ["Googlebot", "Bingbot", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];
  return [
    "User-agent: *",
    "Allow: /",
    "",
    ...bots.flatMap((b) => [`User-agent: ${b}`, "Allow: /", ""]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

export function llmsTxt() {
  const lines = [
    `# ${business.name} — ${business.fullName}`,
    "",
    `> ${business.description}`,
    "",
    "AFON performs only small repair and replacement work under $1,000 in combined labor and materials that does not require a building permit. It does not do panel upgrades, rewiring, new circuits, EV charger or solar installation.",
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(servicePath(s))}): ${s.short}`),
    "",
    "## Service areas",
    ...areas.map((a) => `- [Electrician in ${a.name}](${absoluteUrl(areaPath(a))}): ${a.blurb}`),
    "",
    "## Company",
    `- [About](${absoluteUrl("/about")}): who AFON is and how it works`,
    `- [FAQ](${absoluteUrl("/faq")}): pricing, scope, scheduling and license status`,
    `- [Contact](${absoluteUrl("/contact")}): request a free quote`,
    "",
  ];
  return lines.join("\n");
}
