import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { SiteFooter } from "@/components/site/SiteLayout";
import { LEGAL_DISCLOSURE, LICENSE_FAQ_ANSWER, generalFaqs } from "@/lib/business";
import { llmsTxt, robotsTxt, sitemapXml } from "@/lib/seo";

const SRC = path.resolve(__dirname, "..");
const EXACT_DISCLOSURE =
  "AFON is not licensed under the California Contractors State License Law (Bus. & Prof. Code §7027.1). We perform only work under $1,000 in combined labor and materials that does not require a building permit.";
const EXACT_FAQ =
  "Not yet. Our CSLB C-10 license application is in progress. Until it is issued, we only take small repair and replacement jobs under $1,000 (labor and materials combined) that don't require a permit.";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    if (
      !/\.(ts|tsx|css|md)$/.test(name) ||
      /\.test\.tsx?$/.test(name) ||
      name === "routeTree.gen.ts"
    )
      return [];
    return [full];
  });
}

const FORBIDDEN = [
  /guarantee/i,
  /certified/i,
  /\binsured\b/i,
  /\bstars\b/i,
  /reviews from/i,
  /same[- ]day/i,
  /24\/7/,
];

describe("legal copy rules", () => {
  it("keeps the disclosure and FAQ answer verbatim", () => {
    expect(LEGAL_DISCLOSURE).toBe(EXACT_DISCLOSURE);
    expect(LICENSE_FAQ_ANSWER).toBe(EXACT_FAQ);
    expect(generalFaqs.some((f) => f.q === "Are you licensed?" && f.a === EXACT_FAQ)).toBe(true);
  });

  it('uses "licensed" only inside the two approved strings and no forbidden claims anywhere in src', () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(SRC)) {
      const raw = readFileSync(file, "utf8");
      const rel = path.relative(SRC, file);
      const stripped = raw.split(EXACT_DISCLOSURE).join("").split(EXACT_FAQ).join("");
      // "Are you licensed?" is the approved FAQ question for that answer.
      const withoutQuestion = stripped.split('"Are you licensed?"').join("");
      if (/licensed/i.test(withoutQuestion)) offenders.push(`${rel}: "licensed"`);
      for (const re of FORBIDDEN) if (re.test(raw)) offenders.push(`${rel}: ${re}`);
    }
    expect(offenders).toEqual([]);
  });

  it("keeps generated text files free of license claims", () => {
    for (const text of [llmsTxt(), robotsTxt(), sitemapXml()]) {
      expect(text).not.toMatch(/licensed|guarantee|certified|insured/i);
    }
  });

  it("renders the exact disclosure in the footer", async () => {
    const rootRoute = createRootRoute({ component: () => <SiteFooter /> });
    const index = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: () => null,
    });
    const router = createRouter({
      routeTree: rootRoute.addChildren([index]),
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    render(<RouterProvider router={router} />);
    const disclosure = await screen.findByTestId("legal-disclosure");
    expect(disclosure.textContent).toBe(EXACT_DISCLOSURE);
    expect(disclosure.closest("footer")).not.toBeNull();
  });
});
