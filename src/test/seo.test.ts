import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { SITE_URL, areas, business, enabledPromises, promises, services } from "@/lib/business";
import { absoluteUrl, allPages, electricianJsonLd, robotsTxt, sitemapXml } from "@/lib/seo";

const words = (parts: string[]) => parts.join(" ").split(/\s+/).filter(Boolean).length;

describe("SEO metadata", () => {
  const pages = allPages();

  it("has unique titles <= 60 chars and descriptions <= 155 chars", () => {
    for (const p of pages) {
      expect(p.title.length, p.title).toBeLessThanOrEqual(60);
      expect(p.description.length, p.description).toBeLessThanOrEqual(155);
    }
    expect(new Set(pages.map((p) => p.title)).size).toBe(pages.length);
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length);
  });

  it("matches a real route for every sitemap page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const p of pages) {
      const last = router.matchRoutes(p.path).at(-1);
      expect(last?.routeId, p.path).not.toBe(rootRouteId);
    }
    expect(pages.length).toBe(6 + services.length + areas.length);
  });

  it("keeps the GitHub Pages subpath in absolute URLs", () => {
    expect(SITE_URL).toBe("https://lalianamen.github.io/Afon");
    expect(absoluteUrl("/")).toBe("https://lalianamen.github.io/Afon/");
    expect(absoluteUrl("/faq")).toBe("https://lalianamen.github.io/Afon/faq");
    const xml = sitemapXml();
    for (const p of pages) expect(xml).toContain(`<loc>${absoluteUrl(p.path)}</loc>`);
    expect(robotsTxt()).toContain("Sitemap: https://lalianamen.github.io/Afon/sitemap.xml");
    for (const bot of [
      "Googlebot",
      "Bingbot",
      "GPTBot",
      "ClaudeBot",
      "PerplexityBot",
      "Google-Extended",
    ]) {
      expect(robotsTxt()).toContain(`User-agent: ${bot}`);
    }
  });

  it("never puts placeholders, ratings or reviews into JSON-LD", () => {
    const json = JSON.stringify(electricianJsonLd());
    expect(json).not.toMatch(/\[[A-Z]|000\) 000|\.example|aggregateRating|review/i);
    expect(json).toContain('"priceRange":"$$"');
    expect(json).not.toContain(business.phone.display);
  });
});

describe("content", () => {
  it("gives every service and area page substantial unique copy", () => {
    for (const s of services) {
      const l = s.long;
      const count = words([
        ...l.intro,
        ...l.whenToCall,
        ...l.included,
        l.outOfScope,
        ...l.approach,
        ...l.faqs.flatMap((f) => [f.q, f.a]),
      ]);
      expect(count, s.slug).toBeGreaterThanOrEqual(300);
    }
    for (const a of areas) {
      const count = words([
        a.blurb,
        ...a.intro,
        ...a.localNotes.flatMap((n) => [n.title, n.text]),
        a.closing,
      ]);
      expect(count, a.slug).toBeGreaterThanOrEqual(300);
    }
  });

  it("shows only enabled promises", () => {
    expect(enabledPromises().every((p) => p.enabled)).toBe(true);
    expect(promises.map((p) => p.title)).toEqual([
      "Upfront price before work starts",
      "Free phone consultation",
      "On-time arrival or we call ahead",
      "Clean-up after every job",
      "Clear explanation of what we did",
    ]);
  });
});
