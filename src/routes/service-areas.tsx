import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { PageIntro, SiteLayout } from "@/components/site/SiteLayout";
import { AppLink } from "@/components/site/AppLink";
import { stagger } from "@/components/site/blocks";
import { areaPath, areas } from "@/lib/business";
import { HOME_CRUMB, pageHead, staticPages } from "@/lib/seo";

const crumbs = [HOME_CRUMB, { name: "Service Areas", path: "/service-areas" }];

export const Route = createFileRoute("/service-areas")({
  component: AreasPage,
  head: () => pageHead({ page: staticPages.areas, crumbs }),
});

function AreasPage() {
  return (
    <SiteLayout crumbs={crumbs}>
      <PageIntro eyebrow="Service areas" title="Where AFON Works: Los Angeles & Nearby">
        <p>
          AFON is based in Los Angeles and handles small electrical repairs across the city and in
          the communities around it — the San Fernando Valley neighborhoods of North Hollywood, Van
          Nuys and Sherman Oaks, plus Hollywood, Glendale, Burbank and Pasadena.
        </p>
        <p>
          Every area has its own mix of homes and its own quirks. Each page below covers the local
          details we think are worth knowing: which utility serves the area, the kinds of houses and
          buildings we see, and the repairs that come up most.
        </p>
      </PageIntro>

      <section className="section" aria-labelledby="areas-list-title">
        <div className="container">
          <h2 id="areas-list-title" className="section-title reveal">
            Choose your area
          </h2>
          <ul className="area-cards">
            {areas.map((a, i) => (
              <li className="area-card card-lift reveal" key={a.slug} style={stagger(i)}>
                <MapPin aria-hidden="true" />
                <h3>
                  <AppLink href={areaPath(a)} className="card-link">
                    Electrician in {a.name}
                  </AppLink>
                </h3>
                <p>{a.blurb}</p>
                <span className="area-meta">Utility: {a.utility}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section muted-section" aria-labelledby="outage-title">
        <div className="container two-col">
          <div className="prose reveal">
            <h2 id="outage-title">Power out? Check your utility first</h2>
            <p>
              Four different utilities serve the areas we work in. Most of the City of Los Angeles —
              including Hollywood, North Hollywood, Van Nuys and Sherman Oaks — is served by LADWP.
              Glendale, Burbank and Pasadena each run their own city-owned utility: Glendale Water
              &amp; Power, Burbank Water and Power, and Pasadena Water and Power.
            </p>
            <p>
              If your neighbors have lost power too, the problem is almost certainly on the
              utility's side, and they're the ones to contact. If only part of your home is dark, or
              one outlet or light stopped working, that's where a troubleshooting call makes sense.
            </p>
          </div>
          <div className="prose reveal">
            <h2>Not on the list?</h2>
            <p>
              If you're close to one of these areas and not sure whether we come to you, call or
              text and ask. We'll give you a straight answer rather than take a job we can't get to
              on time.
            </p>
            <p>
              <AppLink href="/contact" className="text-link">
                Contact AFON <ArrowRight aria-hidden="true" />
              </AppLink>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
