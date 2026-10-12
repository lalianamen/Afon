import type { CSSProperties, ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  Brush,
  Check,
  Clock3,
  Fan,
  Flame,
  Lightbulb,
  MapPin,
  MessageSquareText,
  PhoneCall,
  Plug,
  Search,
  Shield,
  ToggleRight,
  User,
  Wrench,
  Zap,
} from "lucide-react";
import { AppLink } from "./AppLink";
import {
  areaPath,
  areas,
  business,
  enabledPromises,
  isPlaceholder,
  servicePath,
  services,
  warningSigns,
  type Area,
  type Faq,
  type Service,
} from "@/lib/business";

export const serviceIcons: Record<string, typeof Search> = {
  diagnostics: Search,
  outlets: Plug,
  lighting: Lightbulb,
  fans: Fan,
  gfci: Shield,
  repairs: Wrench,
};

const promiseIcons: Record<string, typeof Search> = {
  "upfront-price": BadgeDollarSign,
  "free-consultation": PhoneCall,
  "on-time": Clock3,
  "clean-up": Brush,
  "clear-explanation": MessageSquareText,
};

const signIcons = [Lightbulb, Plug, ToggleRight, Zap, Flame];

/** Stagger index for the scroll-reveal transition delay. */
export const stagger = (i: number) => ({ "--stagger": i }) as CSSProperties;

export function SectionHeading({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading reveal">
      <div className="eyebrow">{eyebrow}</div>
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function ServiceCards({
  list = services,
  headingLevel = 3,
}: {
  list?: Service[];
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="services-grid">
      {list.map((service, i) => {
        const Icon = serviceIcons[service.id] ?? Wrench;
        return (
          <li className="service-card card-lift reveal" key={service.id} style={stagger(i)}>
            <div className="service-icon" aria-hidden="true">
              <Icon />
            </div>
            <H>
              <AppLink href={servicePath(service)} className="card-link">
                {service.title}
              </AppLink>
            </H>
            <p>{service.short}</p>
            <span className="card-more" aria-hidden="true">
              Learn more <ArrowRight />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function PromisesGrid() {
  return (
    <ul className="promises-grid">
      {enabledPromises().map((p, i) => {
        const Icon = promiseIcons[p.id] ?? Check;
        return (
          <li className="promise-item reveal" key={p.id} style={stagger(i)}>
            <Icon aria-hidden="true" />
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function HowItWorks() {
  const steps = [
    {
      title: "Tell us the problem",
      text: "Call, text or send the quote form. Describe what's happening — photos help. The phone consultation is free.",
    },
    {
      title: "Get an upfront price",
      text: "We tell you whether it's a job for us and what it will cost before any work starts. No surprises.",
    },
    {
      title: "We fix it and clean up",
      text: "We do the repair carefully, test it, explain what we did, and leave your space tidy.",
    },
  ];
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li className="step reveal" key={s.title} style={stagger(i)}>
          <span className="step-number" aria-hidden="true">
            {i + 1}
          </span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function WarningSigns() {
  return (
    <>
      <ul className="signs-grid">
        {warningSigns.map((sign, i) => {
          const Icon = signIcons[i] ?? AlertTriangle;
          return (
            <li className="sign-item card-lift reveal" key={sign.title} style={stagger(i)}>
              <Icon aria-hidden="true" />
              <div>
                <h3>{sign.title}</h3>
                <p>{sign.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="safety-note reveal" role="note" aria-label="Safety warning">
        <AlertTriangle aria-hidden="true" />
        <p>
          <strong>Safety first:</strong> if you smell burning or see smoke, sparks or flames, leave
          the building and <strong>call 911</strong>. Don't look for the source yourself. We don't
          offer emergency service.
        </p>
      </div>
    </>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <details className="faq-item reveal" key={f.q} style={stagger(Math.min(i, 6))}>
          <summary>
            <h3>{f.q}</h3>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function AreaLinks({ list = areas, current }: { list?: Area[]; current?: string }) {
  return (
    <ul className="area-tags">
      {list
        .filter((a) => a.slug !== current)
        .map((a) => (
          <li key={a.slug}>
            <AppLink className="area-tag" href={areaPath(a)}>
              <MapPin aria-hidden="true" />
              Electrician in {a.name}
            </AppLink>
          </li>
        ))}
    </ul>
  );
}

export function FounderBlock() {
  const { founder } = business;
  return (
    <div className="founder reveal">
      <div className="founder-photo" role="img" aria-label={founder.photoAlt}>
        <User aria-hidden="true" />
        <span>Founder photo coming soon</span>
      </div>
      <div className="founder-text">
        <div className="eyebrow">Meet the founder</div>
        <h2 id="founder-title">{founder.name}</h2>
        <p className="founder-role">
          {founder.role}, {business.name}
        </p>
        <p>{founder.bio}</p>
      </div>
    </div>
  );
}

export function ReviewsBlock() {
  const url = business.googleBusinessProfileUrl;
  return (
    <div className="reviews-block reveal">
      <h2 id="reviews-title">We're a new local company — be one of our first customers</h2>
      <p>
        We won't post testimonials we haven't earned. After your repair, we'd be grateful if you
        shared your honest experience on our Google Business Profile, so the next neighbor knows
        what to expect.
      </p>
      {isPlaceholder(url) ? (
        <span className="placeholder-pill">{url} — link coming soon</span>
      ) : (
        <a className="text-link" href={url} rel="noopener" target="_blank">
          Find us on Google <ArrowRight aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function ScopeNote() {
  return (
    <p className="scope-note">
      <Shield aria-hidden="true" />
      Small repair and replacement jobs only — under $1,000 in combined labor and materials, and no
      work that requires a building permit.
    </p>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
