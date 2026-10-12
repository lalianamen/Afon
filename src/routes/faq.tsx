import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SiteLayout } from "@/components/site/SiteLayout";
import { AppLink } from "@/components/site/AppLink";
import { FaqList } from "@/components/site/blocks";
import { generalFaqs, servicePath, services, type Faq } from "@/lib/business";
import { HOME_CRUMB, faqJsonLd, pageHead, staticPages } from "@/lib/seo";

const crumbs = [HOME_CRUMB, { name: "FAQ", path: "/faq" }];

const moreFaqs: Faq[] = [
  {
    q: "Do you work on small businesses as well as homes?",
    a: "Yes — small shops and offices have the same small problems homes do: worn outlets, dead fixtures, GFCIs that won't reset. The same limits apply: under $1,000 in labor and materials and no permit work.",
  },
  {
    q: "Can I supply my own fixture, fan or parts?",
    a: "Yes. Send us the model before the visit so we can confirm it suits your existing box and wiring. We'll bring the smaller parts — wire connectors, cover plates and the like.",
  },
  {
    q: "I rent my home. Can I book a repair?",
    a: "Usually your landlord or property manager is responsible for electrical repairs and needs to approve them. We're happy to speak with them directly.",
  },
  {
    q: "What happens if you find a bigger problem?",
    a: "We stop, show you what we found, and explain it. If the proper fix needs a permit or would go over $1,000, we won't do it — and we'll tell you what kind of contractor to call instead.",
  },
];

const allFaqs = [...generalFaqs, ...moreFaqs];
const serviceFaqs = services.flatMap((s) =>
  s.long.faqs.slice(0, 1).map((f) => ({ ...f, service: s })),
);

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () =>
    pageHead({
      page: staticPages.faq,
      crumbs,
      extraJsonLd: [faqJsonLd([...allFaqs, ...serviceFaqs])],
    }),
});

function FaqPage() {
  return (
    <SiteLayout crumbs={crumbs}>
      <PageIntro eyebrow="FAQ" title="Frequently Asked Questions">
        <p>
          Straight answers about pricing, scheduling, which jobs we take and which we don't. If your
          question isn't here, call or text — the phone consultation is free.
        </p>
      </PageIntro>
      <section className="section" aria-labelledby="general-title">
        <div className="container narrow">
          <h2 id="general-title" className="section-title reveal">
            Pricing, scope &amp; scheduling
          </h2>
          <FaqList faqs={allFaqs} />
        </div>
      </section>
      <section className="section muted-section" aria-labelledby="service-faq-title">
        <div className="container narrow">
          <h2 id="service-faq-title" className="section-title reveal">
            Questions about specific services
          </h2>
          <FaqList faqs={serviceFaqs} />
          <ul className="inline-links reveal">
            {services.map((s) => (
              <li key={s.slug}>
                <AppLink href={servicePath(s)}>{s.title}</AppLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
