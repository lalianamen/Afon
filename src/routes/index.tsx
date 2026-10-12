import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Phone, Menu, X, MapPin, ShieldCheck, Clock3, BadgeDollarSign, Sparkles, Search, Plug, Lightbulb, Fan, Shield, Wrench, Check, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { serviceScope } from "@/lib/service-scope";
import logo from "@/assets/afon-logo.png.asset.json";
import electricalDetail from "@/assets/electrical-detail.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AFON | Electrical Repair Services in Los Angeles" },
      { name: "description", content: "Looking for electrician services in Los Angeles? AFON offers small electrical repairs, outlet and switch repairs, and fixture replacements for homes and small businesses. Work under $1,000; no permit-required jobs." },
      { property: "og:title", content: "AFON — Reliable Electrical Service in Los Angeles" },
      { property: "og:description", content: "Safe, honest electrical repair and replacement for homes and small businesses in Los Angeles and nearby communities. Small jobs. Thoughtful service." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navigation = [{ name: "Services", id: "services" }, { name: "About", id: "about" }, { name: "Service Areas", id: "service-areas" }, { name: "Contact", id: "contact" }];
const icons = [Search, Plug, Lightbulb, Fan, Shield, Wrench];
const values = [
  { icon: BadgeDollarSign, title: "Upfront pricing", text: "Clear costs before work begins. No surprises, just honest service." },
  { icon: Clock3, title: "Fast response", text: "Prompt communication and thoughtful scheduling for your repair." },
  { icon: ShieldCheck, title: "Safety first", text: "A careful approach to every job, with your home’s safety in mind." },
  { icon: Sparkles, title: "Clean, respectful work", text: "Your space matters. We treat it with care and leave it tidy." },
];
function Logo() {
  return <a href="#top" className="logo-window" aria-label="AFON home"><img src={logo.url} alt="AFON — Advanced Field Operations Network — Electrical Systems & Power Solutions" width={962} height={760} /></a>;
}
function CallButton({ hero = false }: { hero?: boolean }) {
  return <Button asChild variant={hero ? "heroOutline" : "gold"} className={hero ? undefined : "header-call"}><a href="tel:0000000000" aria-label="Call Now — placeholder phone number"><Phone size={14} />Call Now</a></Button>;
}
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  function handlePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Your request preview is complete", { description: "This demo form does not send or save requests. Contact details are placeholders." });
  }
  return (
    <div id="top">
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a className="nav-link" key={item.id} href={`#${item.id}`}>{item.name}</a>)}</nav>
          <div className="header-actions"><CallButton /><Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
        </div>
        {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <a className="nav-link" href={`#${item.id}`} key={item.id} onClick={() => setMenuOpen(false)}>{item.name}</a>)}</nav>}
      </header>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src={electricalDetail} alt="Charcoal light switches with a brushed brass surround" width={1920} height={1024} fetchPriority="high" />
          <div className="container hero-content">
            <div className="eyebrow">AFON · Electrical Systems & Power Solutions</div>
            <h1 id="hero-title">Reliable Electrical<br />Service in<br /><span>Los Angeles.</span></h1>
            <p className="hero-description">Small repairs. Lasting peace of mind.<br />Fast, safe, honest electrical work for your home or small business — with care in every detail.</p>
            <div className="hero-buttons"><Button variant="gold" asChild><a href="#contact">Request Service<ArrowRight /></a></Button><CallButton hero /></div>
            <div className="hero-note"><MapPin size={14} />Serving Los Angeles & surrounding communities</div>
          </div>
        </section>
        <div className="assurance-bar"><div className="container assurance-inner"><div className="assurance-item"><ShieldCheck />Safety-minded service</div><div className="assurance-item"><BadgeDollarSign />Honest, upfront pricing</div><div className="assurance-item"><Check />Small jobs. Done with care.</div></div></div>
        <section id="services" className="section">
          <div className="container">
            <div className="section-heading"><div className="eyebrow">Our services</div><h2>The small fixes that make<br />a big difference.</h2><p>Practical electrical repair and replacement for the spaces you rely on.</p></div>
            <div className="services-grid">{serviceScope.services.map((service, i) => { const Icon = icons[i] ?? Wrench; return <article className="service-card" key={service.id}><div className="service-icon"><Icon /></div><h3>{service.title}</h3><p>{service.description}</p></article>; })}</div>
            <p className="scope-note"><ShieldCheck />Small repair and replacement jobs only. Under $1,000 in combined labor and materials. No permit-required work.</p>
          </div>
        </section>
        <section className="section why-section" id="about">
          <div className="container"><div className="section-heading"><div className="eyebrow">Why AFON</div><h2>Good work. Clear communication.<br />No unnecessary complications.</h2><p>We believe getting a small electrical issue fixed should feel straightforward.</p></div><div className="why-grid">{values.map(value => <article className="why-item" key={value.title}><value.icon /><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div>
        </section>
        <section id="service-areas" className="section areas-section"><div className="container areas-layout"><div><div className="eyebrow">Close to home</div><h2>Your neighborhood.<br />Our service area.</h2><p>Proudly serving homes and small businesses across Los Angeles and nearby communities.</p></div><div className="area-tags">{serviceScope.areas.map(area => <span className="area-tag" key={area}>{area}</span>)}</div></div></section>
        <section id="contact" className="section"><div className="container"><div className="section-heading"><div className="eyebrow">Let’s get it fixed</div><h2>A small problem?<br />Let’s take a look.</h2><p>Tell us what’s going on with your electrical repair.</p></div><div className="contact-layout">
          <div className="contact-intro"><h3>Start a conversation.</h3><p>From a troublesome outlet to a fixture that needs replacing, we’re here for the little things that matter.</p><div className="contact-method"><Phone /><div><span>Phone · placeholder</span><a href="tel:0000000000">(000) 000-0000</a></div></div><div className="contact-method"><Mail /><div><span>Email · placeholder</span><a href="mailto:info@afon.example">info@afon.example</a></div></div><div className="contact-method"><MapPin /><div><span>Based in</span><p>Los Angeles, California</p></div></div><p className="placeholder-note">Our real contact details will be added before launch.</p></div>
          <form onSubmit={handlePreview} aria-label="Service request preview"><div className="form-grid"><label className="field">Name<input name="name" autoComplete="name" placeholder="Your full name" required maxLength={120} /></label><label className="field">Phone<input name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" required maxLength={30} /></label><label className="field">Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label><label className="field">ZIP code<input name="zip" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" title="Enter a five-digit ZIP code" placeholder="90001" required maxLength={5} /></label><label className="field field-full">Describe the problem<textarea name="problem" placeholder="What needs repairing or replacing?" required maxLength={3000} /></label></div><div className="submit-row"><Button variant="gold" type="submit">Request Service<ArrowRight /></Button><span className="form-preview-note">Preview only — requests are not sent or saved.</span></div></form>
        </div></div></section>
      </main>
      <footer className="site-footer"><div className="container"><div className="footer-top"><div className="footer-brand"><Logo /><p>Electrical Systems & Power Solutions.<br />Small repairs. Thoughtful service.</p></div><nav className="footer-nav" aria-label="Footer navigation">{navigation.map(item => <a href={`#${item.id}`} key={item.id}>{item.name}</a>)}</nav></div><div className="legal-disclosure"><h3>Important service disclosure</h3><p>AFON is not licensed under the California Contractors State License Law (Bus. &amp; Prof. Code §7027.1). We perform only work under $1,000 in combined labor and materials that does not require a building permit.</p></div><div className="footer-bottom"><p>© 2026 AFON. All rights reserved.</p><p>Advanced Field Operations Network · Los Angeles, CA</p></div></div></footer>
      <Toaster position="bottom-right" />
    </div>
  );
}
