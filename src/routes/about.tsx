import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro, SiteLayout } from "@/components/site/SiteLayout";
import { AppLink } from "@/components/site/AppLink";
import { FounderBlock, PromisesGrid, ReviewsBlock, SectionHeading } from "@/components/site/blocks";
import { HOME_CRUMB, pageHead, staticPages } from "@/lib/seo";

const crumbs = [HOME_CRUMB, { name: "About", path: "/about" }];

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => pageHead({ page: staticPages.about, crumbs }),
});

function AboutPage() {
  return (
    <SiteLayout crumbs={crumbs}>
      <PageIntro eyebrow="About AFON" title="About AFON: Small Electrical Repairs, Done Carefully">
        <p>
          AFON — short for Advanced Field Operations Network — is a new, family-run electrical
          repair company in Los Angeles. We started it for a simple reason: small electrical
          problems deserve the same care as big ones, and they're often the hardest to get anyone to
          show up for.
        </p>
      </PageIntro>

      <section className="section" aria-labelledby="what-title">
        <div className="container two-col">
          <div className="prose reveal">
            <h2 id="what-title">What we do</h2>
            <p>
              We handle small repair and replacement jobs on the wiring that's already in your home
              or small business: troubleshooting outlets and lights that stopped working, replacing
              worn outlets and switches, swapping existing light fixtures and ceiling fans, and
              replacing GFCI outlets that no longer protect you.
            </p>
            <p>
              Every job is under $1,000 in labor and materials combined and never includes work that
              requires a building permit. When a problem turns out to be bigger than that, we say so
              plainly and help you understand what kind of contractor to call.
            </p>
            <p>
              <AppLink href="/services" className="text-link">
                See our services <ArrowRight aria-hidden="true" />
              </AppLink>
            </p>
          </div>
          <div className="prose reveal">
            <h2>How we work</h2>
            <p>
              We listen first. Before anyone picks up a tool, we want to know what happened, when it
              started and what you've already tried. Then you get an upfront price. Nothing starts
              until you agree to it, and if something unexpected turns up halfway through, we stop
              and talk to you.
            </p>
            <p>
              We treat your home the way we'd want ours treated: drop cloths down, tools contained,
              old parts and packaging taken away. Before we leave, we show you what we found and
              what we changed, in plain English.
            </p>
            <p>
              As a new company, we don't have a long list of reviews yet, and we won't pretend
              otherwise. We'd rather earn them one careful job at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="founder-title">
        <div className="container">
          <FounderBlock />
        </div>
      </section>

      <section className="section dark-section" aria-labelledby="promises-title">
        <div className="container">
          <SectionHeading
            eyebrow="Our promises"
            title="What you can count on"
            id="promises-title"
          />
          <PromisesGrid />
        </div>
      </section>

      <section className="section" aria-labelledby="reviews-title">
        <div className="container">
          <ReviewsBlock />
          <p className="center-link">
            <AppLink href="/faq" className="text-link">
              Questions about scope, pricing or our license status? Read the FAQ{" "}
              <ArrowRight aria-hidden="true" />
            </AppLink>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
