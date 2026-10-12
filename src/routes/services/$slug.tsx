import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro, SiteLayout, useQuoteHref } from "@/components/site/SiteLayout";
import { AppLink } from "@/components/site/AppLink";
import { AreaLinks, CheckList, FaqList, ScopeNote, ServiceCards } from "@/components/site/blocks";
import { serviceBySlug, servicePath, services } from "@/lib/business";
import { HOME_CRUMB, pageHead, serviceJsonLd, servicePage } from "@/lib/seo";

function crumbsFor(title: string, path: string) {
  return [HOME_CRUMB, { name: "Services", path: "/services" }, { name: title, path }];
}

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const service = loaderData && serviceBySlug(loaderData.slug);
    if (!service) return {};
    return pageHead({
      page: servicePage(service),
      crumbs: crumbsFor(service.title, servicePath(service)),
      extraJsonLd: [serviceJsonLd(service)],
    });
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const service = serviceBySlug(slug)!;
  const quoteHref = useQuoteHref();
  const related = service.related.map((s) => services.find((x) => x.slug === s)).filter((s) => !!s);
  const { long } = service;
  return (
    <SiteLayout crumbs={crumbsFor(service.title, servicePath(service))}>
      <PageIntro eyebrow="Service" title={`${service.title} in Los Angeles`}>
        {long.intro.map((p) => (
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

      <section className="section" aria-labelledby="when-title">
        <div className="container two-col">
          <div className="prose reveal">
            <h2 id="when-title">When to call</h2>
            <CheckList items={long.whenToCall} />
          </div>
          <div className="prose reveal">
            <h2>What's included</h2>
            <CheckList items={long.included} />
          </div>
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="approach-title">
        <div className="container two-col">
          <div className="prose reveal">
            <h2 id="approach-title">How we approach it</h2>
            {long.approach.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="prose reveal">
            <h2>What's outside our scope</h2>
            <p>{long.outOfScope}</p>
            <ScopeNote />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="service-faq-title">
        <div className="container narrow">
          <h2 id="service-faq-title" className="section-title reveal">
            {service.title}: common questions
          </h2>
          <FaqList faqs={long.faqs} />
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="where-title">
        <div className="container">
          <h2 id="where-title" className="section-title reveal">
            Where we offer {service.title.toLowerCase()}
          </h2>
          <AreaLinks />
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className="section-title reveal">
            Related services
          </h2>
          <ServiceCards list={related} />
          <p className="center-link">
            <AppLink href="/services" className="text-link">
              All services <ArrowRight aria-hidden="true" />
            </AppLink>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
