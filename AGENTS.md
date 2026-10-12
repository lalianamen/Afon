<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- AFON is a multi-page, SEO-focused site: home, /services, /services/<slug>, /service-areas, /electrician-<area>, /about, /faq, /contact and a prerendered 404. Every page uses the shared SiteLayout (header nav, breadcrumbs, CTA band, footer with the legal disclosure, mobile action bar).
- All business facts (contact details, services, areas, promises, FAQ, SITE_URL) live in src/lib/business.ts; pages, meta tags, JSON-LD, sitemap.xml, robots.txt and llms.txt are generated from it via src/lib/seo.ts. Don't hard-code facts in routes.
- The site is deployed as static files on GitHub Pages under the /Afon/ subpath: vite base "/Afon/", nitro disabled, every route prerendered by TanStack Start (page list in vite.config.ts comes from allPages()). `bun run build` = `vite build` + scripts/postbuild-pages.mjs (static 404.html, .nojekyll); output is dist/client. Keep SITE_URL and the vite base in sync. Static files in public/ must be referenced via import.meta.env.BASE_URL.
- Define brand styling centrally in src/styles.css and use Button variants for actions, so the visual system stays consistent. Animations are CSS + IntersectionObserver only, respect prefers-reduced-motion, and content must stay visible without JS (`.reveal` hides only when <html> has the `js` class).
- Keep service scope and eligibility in a browser-safe domain module with numeric tests, so legal limits remain enforceable independently of copy.
- Legal copy rules are enforced by src/test/legal-content.test.tsx: the word "licensed" only in LEGAL_DISCLOSURE and the license FAQ; no "guarantee", "certified", "insured", ratings, fake reviews or emergency/same-day promises; placeholders never go into JSON-LD.
- The quote request form is explicitly a non-delivering preview; submission goes through submitQuoteRequest() in src/lib/quote.ts only. Do not add submission persistence or imply delivery without implementing a real owner-visible submission flow there.
