// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     VITE_* env injection, @ path alias, React/TanStack dedupe, error logger plugins.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
//
// AFON is published as a fully static, prerendered site on GitHub Pages under the
// /Afon/ project subpath. `vite build` writes the site to dist/client (see README).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { allPages } from "./src/lib/seo";

/** Public subpath of the GitHub Pages project site. Must match SITE_URL in src/lib/business.ts. */
const BASE = "/Afon/";

export default defineConfig({
  // No server runtime on GitHub Pages: skip nitro, every route is prerendered to static files.
  nitro: false,
  vite: { base: BASE },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    prerender: {
      enabled: true,
      // The page list below is explicit and complete (derived from business.ts). Link crawling
      // is off because crawled hrefs carry the /Afon base and would render pages twice.
      crawlLinks: false,
      autoStaticPathsDiscovery: false,
      failOnError: true,
      // /about -> about.html (GitHub Pages serves it at /Afon/about without a redirect).
      autoSubfolderIndex: false,
    },
    pages: [
      ...allPages().map((p) => ({ path: p.path })),
      { path: "/sitemap.xml", prerender: { outputPath: "/sitemap.xml" } },
      { path: "/robots.txt", prerender: { outputPath: "/robots.txt" } },
      { path: "/llms.txt", prerender: { outputPath: "/llms.txt" } },
      // Rendered by the /404 route; GitHub Pages serves 404.html for unknown paths.
      { path: "/404", prerender: { outputPath: "/404.html" } },
    ],
  },
});
