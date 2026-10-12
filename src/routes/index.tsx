import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AppLink } from "@/components/site/AppLink";
import { ContactCard, QuoteForm } from "@/components/site/QuoteForm";
import {
  AreaLinks,
  FaqList,
  FounderBlock,
  HowItWorks,
  PromisesGrid,
  ReviewsBlock,
  ScopeNote,
  SectionHeading,
  ServiceCards,
  WarningSigns,
  stagger,
} from "@/components/site/blocks";
import { business, generalFaqs, homeCopy } from "@/lib/business";
import { HOME_CRUMB, faqJsonLd, pageHead, staticPages } from "@/lib/seo";
import heroJpg from "@/assets/electrical-detail.jpg";
import hero768 from "@/assets/hero-768.webp";
import hero1920 from "@/assets/hero-1920.webp";

const heroSrcSet = `${hero768} 768w, ${hero1920} 1920w`;

export const Route = createFileRoute("/")({
  component: Index,
  head: () =>
    pageHead({
      page: staticPages.home,
      crumbs: [HOME_CRUMB],
      extraJsonLd: [faqJsonLd(generalFaqs)],
      links: [
        {
          rel: "preload",
          as: "image",
          href: hero1920,
          imageSrcSet: heroSrcSet,
          imageSizes: "100vw",
          type: "image/webp",
          fetchPriority: "high",
        },
      ],
    }),
});

function Index() {
  return (
    <SiteLayout crumbs={[HOME_CRUMB]}>
      <section className="hero" aria-labelledby="hero-title">
        <picture>
          <source type="image/webp" srcSet={heroSrcSet} sizes="100vw" />
          <img
            className="hero-image"
            src={heroJpg}
            alt=""
            width={1920}
            height={1024}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="container hero-content">
          <div className="eyebrow hero-anim">
            {business.name} · {business.tagline}
          </div>
          <h1 id="hero-title" className="hero-anim">
            {homeCopy.heroTitle}
          </h1>
          <p className="hero-description hero-anim">{homeCopy.heroSubline}</p>
          <div className="hero-buttons hero-anim">
            <Button variant="gold" asChild>
              <a href="#quote">
                Get a Free Quote
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button variant="heroOutline" asChild>
              <a
                href={business.phone.tel}
                aria-label={`Call Now — ${business.phone.display} (placeholder number)`}
              >
                <Phone aria-hidden="true" />
                Call Now
              </a>
            </Button>
          </div>
          <ul className="trust-chips hero-anim" aria-label="Why customers call AFON">
            {homeCopy.trustChips.map((chip) => (
              <li key={chip}>
                <Check aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>
          <p className="hero-note hero-anim">
            <MapPin aria-hidden="true" />
            Serving Los Angeles, Glendale, Burbank, Pasadena and the San Fernando Valley
          </p>
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="who-title">
        <div className="container who-layout">
          <div className="reveal">
            <div className="eyebrow">Who we are</div>
            <h2 id="who-title">A local, family-run company for the small electrical jobs.</h2>
          </div>
          <div className="who-text reveal" style={stagger(1)}>
            <p>
              AFON is a small, family-run electrical repair company based in Los Angeles. We focus
              on the jobs that bigger outfits often don't want: a dead outlet, a buzzing switch, a
              fixture or ceiling fan that needs replacing, a GFCI that won't reset.
            </p>
            <p>
              Small doesn't mean rushed. We take the time to find the actual cause, explain it in
              plain English, give you a price before any work begins, and leave your home as tidy as
              we found it.
            </p>
            <AppLink href="/about" className="text-link">
              More about AFON <ArrowRight aria-hidden="true" />
            </AppLink>
          </div>
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="how-title">
        <div className="container">
          <SectionHeading eyebrow="How it works" title="Three simple steps" id="how-title">
            No pressure, no surprises — you know the price before we start.
          </SectionHeading>
          <HowItWorks />
        </div>
      </section>

      <section id="services" className="section" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading
            eyebrow="Our services"
            title="The small fixes that make a big difference"
            id="services-title"
          >
            Practical electrical repair and replacement for the homes and small businesses you rely
            on.
          </SectionHeading>
          <ServiceCards />
          <ScopeNote />
        </div>
      </section>

      <section className="section dark-section" aria-labelledby="promises-title">
        <div className="container">
          <SectionHeading eyebrow="Our promises" title="What you can count on" id="promises-title">
            Simple commitments we make on every job.
          </SectionHeading>
          <PromisesGrid />
        </div>
      </section>

      <section className="section" aria-labelledby="signs-title">
        <div className="container">
          <SectionHeading
            eyebrow="Know the signs"
            title="Warning signs you need an electrician"
            id="signs-title"
          >
            Electrical problems usually give a warning first. Don't ignore these.
          </SectionHeading>
          <WarningSigns />
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="founder-title">
        <div className="container">
          <FounderBlock />
        </div>
      </section>

      <section className="section" aria-labelledby="reviews-title">
        <div className="container">
          <ReviewsBlock />
        </div>
      </section>

      <section id="service-areas" className="section muted-section" aria-labelledby="areas-title">
        <div className="container areas-layout">
          <div className="reveal">
            <div className="eyebrow">Close to home</div>
            <h2 id="areas-title">Your neighborhood, our service area</h2>
            <p>
              We serve homes and small businesses across Los Angeles and nearby communities. Each
              area page covers local details — utilities, housing, and the repairs we see most.
            </p>
          </div>
          <div className="reveal" style={stagger(1)}>
            <AreaLinks />
          </div>
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-title">
        <div className="container narrow">
          <SectionHeading eyebrow="FAQ" title="Questions we hear often" id="faq-title" />
          <FaqList faqs={generalFaqs} />
          <p className="center-link">
            <AppLink href="/faq" className="text-link">
              See all questions <ArrowRight aria-hidden="true" />
            </AppLink>
          </p>
        </div>
      </section>

      <section id="quote" className="section muted-section" aria-labelledby="quote-title">
        <div className="container">
          <SectionHeading eyebrow="Let's get it fixed" title="Get a free quote" id="quote-title">
            Tell us what's going on. You'll get an upfront price before any work starts.
          </SectionHeading>
          <div className="contact-layout">
            <ContactCard />
            <QuoteForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
