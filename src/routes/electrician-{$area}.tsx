import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro, SiteLayout, useQuoteHref } from "@/components/site/SiteLayout";
import { AppLink } from "@/components/site/AppLink";
import { AreaLinks, ScopeNote, ServiceCards, stagger } from "@/components/site/blocks";
import { areaBySlug, areaPath, serviceBySlug, servicePath, services } from "@/lib/business";
import { HOME_CRUMB, areaPage, pageHead } from "@/lib/seo";

function crumbsFor(name: string, path: string) {
  return [HOME_CRUMB, { name: "Service Areas", path: "/service-areas" }, { name, path }];
}

export const Route = createFileRoute("/electrician-{$area}")({
  loader: ({ params }) => {
    const area = areaBySlug(params.area);
    if (!area) throw notFound();
    return { slug: area.slug };
  },
  head: ({ loaderData }) => {
    const area = loaderData && areaBySlug(loaderData.slug);
    if (!area) return {};
    return pageHead({ page: areaPage(area.slug), crumbs: crumbsFor(area.name, areaPath(area)) });
  },
  component: AreaPage,
});

function AreaPage() {
  const { slug } = Route.useLoaderData();
  const area = areaBySlug(slug)!;
  const quoteHref = useQuoteHref();
  const popular = area.popularServices.map(serviceBySlug).filter((s) => !!s);
  return (
    <SiteLayout crumbs={crumbsFor(area.name, areaPath(area))}>
      <PageIntro
        eyebrow={`Service area · ${area.name}`}
        title={`Electrician for Small Repairs in ${area.name}`}
      >
        {area.intro.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
        <div className="page-intro-actions">
          <Button asChild variant="gold">
            <AppLink href={quoteHref}>
              Get a Free Quote <ArrowRight aria-hidden="true" />
            </AppLink>
          </Button>
        </div>
      </PageIntro>

      <section className="section" aria-labelledby="local-title">
        <div className="container">
          <h2 id="local-title" className="section-title reveal">
            Good to know in {area.name}
          </h2>
          <ul className="local-notes">
            {area.localNotes.map((n, i) => (
              <li className="local-note reveal" key={n.title} style={stagger(i)}>
                <Info aria-hidden="true" />
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="popular-title">
        <div className="container">
          <h2 id="popular-title" className="section-title reveal">
            Repairs we often do in {area.name}
          </h2>
          <ServiceCards list={popular} />
          <div className="prose center reveal">
            <p>
              We also handle{" "}
              {services
                .filter((s) => !area.popularServices.includes(s.slug))
                .map((s, i, arr) => (
                  <span key={s.slug}>
                    <AppLink href={servicePath(s)}>{s.title.toLowerCase()}</AppLink>
                    {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " and " : ""}
                  </span>
                ))}{" "}
              in {area.name}.
            </p>
          </div>
          <ScopeNote />
        </div>
      </section>

      <section className="section" aria-labelledby="nearby-title">
        <div className="container narrow">
          <div className="prose reveal">
            <h2 id="nearby-title">Nearby areas we serve</h2>
            <p>{area.closing}</p>
          </div>
          <AreaLinks current={area.slug} />
        </div>
      </section>
    </SiteLayout>
  );
}
