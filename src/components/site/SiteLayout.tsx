import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, FileText, Menu, MessageSquare, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLink } from "./AppLink";
import { LEGAL_DISCLOSURE, areaPath, areas, business, servicePath, services } from "@/lib/business";
import type { Crumb } from "@/lib/seo";
import logoWebp from "@/assets/afon-logo-256.webp";
import logoPng from "@/assets/afon-logo-256.png";

const primaryNav = [
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Logo() {
  return (
    <AppLink href="/" className="logo-window" aria-label={`${business.name} — home`}>
      <picture>
        <source srcSet={logoWebp} type="image/webp" />
        <img
          src={logoPng}
          alt={`${business.name} — ${business.fullName} — ${business.tagline}`}
          width={256}
          height={202}
        />
      </picture>
    </AppLink>
  );
}

function usePathname() {
  return useRouterState({ select: (s) => s.location.pathname });
}

/** Where "Get a Free Quote" should point: the in-page form on home/contact, otherwise the contact page. */
export function useQuoteHref() {
  const pathname = usePathname();
  return pathname === "/" || pathname === "/contact" ? "#quote" : "/contact#quote";
}

/** Scroll-reveal: progressive enhancement only. Content is visible without JS (see styles.css). */
function useReveal(pathname: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not([data-revealed])"));
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

function NavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: { name: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  const id = `menu-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div
      className="nav-dropdown"
      data-open={open ? "" : undefined}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <AppLink href={href} className="nav-link">
        {label}
      </AppLink>
      <button
        type="button"
        className="nav-dropdown-toggle"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`Show ${label.toLowerCase()} menu`}
        onClick={() => setOpen((o) => !o)}
      >
        <ChevronDown aria-hidden="true" />
      </button>
      <ul className="dropdown-panel" id={id}>
        {items.map((item) => (
          <li key={item.href}>
            <AppLink href={item.href}>{item.name}</AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

const serviceItems = services.map((s) => ({ name: s.title, href: servicePath(s) }));
const areaItems = areas.map((a) => ({ name: a.name, href: areaPath(a) }));

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMenuOpen(false), [pathname]);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavDropdown label="Services" href="/services" items={serviceItems} />
          <NavDropdown label="Service Areas" href="/service-areas" items={areaItems} />
          {primaryNav.map((item) => (
            <AppLink className="nav-link" key={item.href} href={item.href}>
              {item.name}
            </AppLink>
          ))}
        </nav>
        <div className="header-actions">
          <Button asChild variant="gold" className="header-call">
            <a
              href={business.phone.tel}
              aria-label={`Call AFON at ${business.phone.display} (placeholder number)`}
            >
              <Phone aria-hidden="true" />
              Call Now
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-group">
            <AppLink href="/services" className="mobile-nav-heading">
              Services
            </AppLink>
            {serviceItems.map((i) => (
              <AppLink key={i.href} href={i.href}>
                {i.name}
              </AppLink>
            ))}
          </div>
          <div className="mobile-nav-group">
            <AppLink href="/service-areas" className="mobile-nav-heading">
              Service Areas
            </AppLink>
            {areaItems.map((i) => (
              <AppLink key={i.href} href={i.href}>
                {i.name}
              </AppLink>
            ))}
          </div>
          <div className="mobile-nav-group">
            {primaryNav.map((i) => (
              <AppLink key={i.href} href={i.href} className="mobile-nav-heading">
                {i.name}
              </AppLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path}>
              {last ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <>
                  <AppLink href={c.path}>{c.name}</AppLink>
                  <ChevronRight aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function CtaBand() {
  const quoteHref = useQuoteHref();
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band-inner reveal">
        <div>
          <h2 id="cta-band-title">Have a small electrical problem?</h2>
          <p>
            Tell us what's going on. You'll get a free phone consultation and an upfront price
            before any work starts.
          </p>
        </div>
        <div className="cta-band-actions">
          <Button asChild variant="gold">
            <AppLink href={quoteHref}>Get a Free Quote</AppLink>
          </Button>
          <Button asChild variant="heroOutline">
            <a href={business.phone.tel}>
              <Phone aria-hidden="true" />
              Call {business.phone.display}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              {business.fullName}
              <br />
              {business.tagline}
              <br />
              Small repairs. Thoughtful service.
            </p>
          </div>
          <nav aria-label="Footer: services">
            <h2 className="footer-heading">Services</h2>
            <ul>
              {serviceItems.map((i) => (
                <li key={i.href}>
                  <AppLink href={i.href}>{i.name}</AppLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer: service areas">
            <h2 className="footer-heading">Service Areas</h2>
            <ul>
              {areaItems.map((i) => (
                <li key={i.href}>
                  <AppLink href={i.href}>Electrician in {i.name}</AppLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="footer-heading">Company</h2>
            <ul>
              <li>
                <AppLink href="/about">About</AppLink>
              </li>
              <li>
                <AppLink href="/faq">FAQ</AppLink>
              </li>
              <li>
                <AppLink href="/contact">Contact</AppLink>
              </li>
              <li>
                <a href={business.phone.tel}>{business.phone.display}</a>
              </li>
              <li>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
              <li>{business.hours}</li>
            </ul>
          </div>
        </div>
        <div className="legal-disclosure" role="note" aria-label="Legal disclosure">
          <p data-testid="legal-disclosure">{LEGAL_DISCLOSURE}</p>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AFON. All rights reserved.</p>
          <p>{business.fullName} · Los Angeles, CA</p>
        </div>
      </div>
    </footer>
  );
}

function MobileActionBar() {
  const quoteHref = useQuoteHref();
  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      <a
        href={business.phone.tel}
        className="mobile-bar-call"
        aria-label={`Call AFON at ${business.phone.display}`}
      >
        <Phone aria-hidden="true" />
        Call
      </a>
      <a href={business.sms} aria-label={`Text AFON at ${business.phone.display}`}>
        <MessageSquare aria-hidden="true" />
        Text
      </a>
      <AppLink href={quoteHref} className="mobile-bar-quote">
        <FileText aria-hidden="true" />
        Get Quote
      </AppLink>
    </nav>
  );
}

export function SiteLayout({
  children,
  crumbs,
  showCta = true,
}: {
  children: ReactNode;
  crumbs?: Crumb[];
  showCta?: boolean;
}) {
  const pathname = usePathname();
  useReveal(pathname);
  return (
    <div className="site">
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {crumbs && crumbs.length > 1 && (
          <div className="container">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        )}
        {children}
      </main>
      {showCta && <CtaBand />}
      <SiteFooter />
      <MobileActionBar />
    </div>
  );
}

/** Standard header block for inner pages (single H1 per page). */
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-intro">
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {children && <div className="page-intro-lead">{children}</div>}
      </div>
    </header>
  );
}
