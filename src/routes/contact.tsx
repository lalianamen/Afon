import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SiteLayout } from "@/components/site/SiteLayout";
import { CheckList } from "@/components/site/blocks";
import { ContactCard, QuoteForm } from "@/components/site/QuoteForm";
import { HOME_CRUMB, pageHead, staticPages } from "@/lib/seo";

const crumbs = [HOME_CRUMB, { name: "Contact", path: "/contact" }];

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => pageHead({ page: staticPages.contact, crumbs }),
});

function ContactPage() {
  return (
    <SiteLayout crumbs={crumbs} showCta={false}>
      <PageIntro eyebrow="Contact" title="Contact AFON & Get a Free Quote">
        <p>
          The fastest way to reach us is a phone call or a text. Tell us what's going on, and we'll
          tell you honestly whether it's a small repair we can take on — and what it will cost
          before any work starts.
        </p>
      </PageIntro>

      <section id="quote" className="section" aria-labelledby="quote-title">
        <div className="container">
          <h2 id="quote-title" className="section-title reveal">
            Request a quote
          </h2>
          <div className="contact-layout">
            <ContactCard />
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="include-title">
        <div className="container two-col">
          <div className="prose reveal">
            <h2 id="include-title">What to tell us</h2>
            <p>
              A few details help us give you an accurate upfront price, often without a separate
              visit:
            </p>
            <CheckList
              items={[
                "What stopped working or what you'd like replaced",
                "When it started and whether anything changed around then",
                "Which room, and whether other outlets or lights are affected",
                "Photos of the outlet, switch, fixture or fan — and of the new one, if you've bought it",
                "Your ZIP code and the times that work for you",
              ]}
            />
          </div>
          <div className="prose reveal">
            <h2>What happens next</h2>
            <p>
              We'll talk the problem through by phone. If it's within our scope — a small repair or
              replacement under $1,000 that doesn't need a permit — we'll give you a price and agree
              on an appointment time. If we're running late, we call ahead.
            </p>
            <p>
              If it isn't a job for us, we'll say so straight away and explain why, so you don't
              lose time. We don't offer emergency or after-hours service; if you smell burning or
              see smoke, leave the building and call 911.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
