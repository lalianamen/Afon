import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro, SiteLayout } from "@/components/site/SiteLayout";
import { AppLink } from "@/components/site/AppLink";
import {
  CheckList,
  HowItWorks,
  ScopeNote,
  SectionHeading,
  ServiceCards,
} from "@/components/site/blocks";
import { HOME_CRUMB, pageHead, staticPages } from "@/lib/seo";

const crumbs = [HOME_CRUMB, { name: "Services", path: "/services" }];

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => pageHead({ page: staticPages.services, crumbs }),
});

function ServicesPage() {
  return (
    <SiteLayout crumbs={crumbs}>
      <PageIntro eyebrow="Services" title="Small Electrical Repair Services in Los Angeles">
        <p>
          AFON does one kind of electrical work, and tries to do it well: small repairs and
          replacements on the wiring that's already in your home. If an outlet stopped working, a
          switch buzzes, or a fixture, fan or GFCI outlet needs replacing, you're in the right
          place.
        </p>
      </PageIntro>

      <section className="section" aria-labelledby="list-title">
        <div className="container">
          <h2 id="list-title" className="visually-hidden">
            Our six services
          </h2>
          <ServiceCards />
          <ScopeNote />
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="scope-title">
        <div className="container two-col">
          <div className="prose reveal">
            <h2 id="scope-title">Why we keep every job small</h2>
            <p>
              In California, work that requires a building permit, or that adds up to $1,000 or more
              in labor and materials, has to be done by a contractor holding the right state license
              classification. AFON stays below that line on every job. That's not a limitation we
              hide in fine print; it's how the company is built.
            </p>
            <p>
              In practice, it means we replace and repair what's already there — devices, fixtures,
              fans — rather than add new circuits or run new wire. When we troubleshoot a problem
              and find that the real fix is bigger, we tell you so, explain why, and stop. You'll
              know exactly what to ask for when you call a C-10 electrical contractor.
            </p>
            <p>
              <AppLink href="/faq" className="text-link">
                Read our FAQ on scope and pricing <ArrowRight aria-hidden="true" />
              </AppLink>
            </p>
          </div>
          <div className="prose reveal">
            <h2>Jobs we don't take</h2>
            <CheckList
              items={[
                "Panel upgrades or any work inside the electrical panel",
                "Rewiring, new circuits or new wire runs",
                "Adding outlets, switches or lights where none exist",
                "EV charger, solar or battery installation",
                "Any job over $1,000 in labor and materials combined",
                "Anything that requires a building permit",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <SectionHeading
            eyebrow="How pricing works"
            title="An upfront price, every time"
            id="how-title"
          >
            You describe the problem, we tell you the price, and nothing starts until you say yes.
            If something unexpected turns up, we stop and talk to you first.
          </SectionHeading>
          <HowItWorks />
        </div>
      </section>
    </SiteLayout>
  );
}
