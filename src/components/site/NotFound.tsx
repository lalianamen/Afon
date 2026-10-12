import { SiteLayout } from "./SiteLayout";
import { AppLink } from "./AppLink";
import { servicePath, services } from "@/lib/business";

export function NotFoundComponent() {
  return (
    <SiteLayout showCta={false}>
      <section className="section not-found">
        <div className="container">
          <div className="eyebrow">Error 404</div>
          <h1>We couldn't find that page</h1>
          <p className="not-found-lead">
            The page you're looking for doesn't exist or has moved. These links should get you where
            you need to go:
          </p>
          <div className="not-found-links">
            <div>
              <h2>Popular pages</h2>
              <ul>
                <li>
                  <AppLink href="/">Home</AppLink>
                </li>
                <li>
                  <AppLink href="/services">All services</AppLink>
                </li>
                <li>
                  <AppLink href="/service-areas">Service areas</AppLink>
                </li>
                <li>
                  <AppLink href="/faq">FAQ</AppLink>
                </li>
                <li>
                  <AppLink href="/contact">Contact &amp; free quote</AppLink>
                </li>
              </ul>
            </div>
            <div>
              <h2>Services</h2>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <AppLink href={servicePath(s)}>{s.title}</AppLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
