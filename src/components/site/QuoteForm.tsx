import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, services } from "@/lib/business";
import { preferredTimes, readQuoteForm, submitQuoteRequest, type QuoteResult } from "@/lib/quote";

export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [pending, setPending] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    try {
      const res = await submitQuoteRequest(readQuoteForm(event.currentTarget));
      setResult(res);
      requestAnimationFrame(() => statusRef.current?.focus());
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div className="quote-result" role="status" aria-live="polite" tabIndex={-1} ref={statusRef}>
        {result.delivered ? (
          <>
            <h3>Request sent</h3>
            <p>Thanks — we received your request and will be in touch.</p>
          </>
        ) : (
          <>
            <h3>
              <AlertCircle aria-hidden="true" /> Preview only — your request was NOT sent
            </h3>
            <p>
              This form isn't connected yet, so nothing you entered was delivered, saved or shared.
              To reach AFON, please use one of these instead:
            </p>
            <ul className="quote-result-contacts">
              <li>
                <Phone aria-hidden="true" /> Call{" "}
                <a href={business.phone.tel}>{business.phone.display}</a>
              </li>
              <li>
                <MessageSquare aria-hidden="true" /> Text{" "}
                <a href={business.sms}>{business.phone.display}</a>
              </li>
              <li>
                <Mail aria-hidden="true" /> Email{" "}
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
            </ul>
            <p className="form-preview-note">
              Contact details shown are placeholders until launch.
            </p>
          </>
        )}
        <Button type="button" variant="outline" onClick={() => setResult(null)}>
          Back to the form
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Quote request (preview — not sent)"
      className="quote-form"
    >
      <div className="form-grid">
        <label className="field">
          Name
          <input
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
            maxLength={120}
          />
        </label>
        <label className="field">
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            required
            maxLength={30}
          />
        </label>
        <label className="field">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </label>
        <label className="field">
          ZIP code
          <input
            name="zip"
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="[0-9]{5}"
            title="Enter a five-digit ZIP code"
            placeholder="90001"
            required
            maxLength={5}
          />
        </label>
        <label className="field">
          Service
          <select name="service" required defaultValue={defaultService}>
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="not-sure">Not sure — help me figure it out</option>
          </select>
        </label>
        <label className="field">
          Preferred time
          <select name="preferredTime" defaultValue="Flexible — any time">
            {preferredTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="field field-full">
          Describe the problem
          <textarea
            name="description"
            placeholder="What's happening, where, and since when?"
            required
            maxLength={3000}
          />
        </label>
      </div>
      <div className="submit-row">
        <Button variant="gold" type="submit" disabled={pending}>
          Preview my request
          <ArrowRight aria-hidden="true" />
        </Button>
        <span className="form-preview-note">
          Preview only: this form doesn't send or save anything yet. Please call or text to reach
          us.
        </span>
      </div>
    </form>
  );
}

export function ContactCard() {
  return (
    <div className="contact-intro reveal">
      <h3>Prefer to talk?</h3>
      <p>
        The phone consultation is free. Describe the problem and we'll tell you honestly whether
        it's a job for us.
      </p>
      <dl className="contact-methods">
        <div>
          <dt>Phone · placeholder</dt>
          <dd>
            <a href={business.phone.tel}>{business.phone.display}</a>
          </dd>
        </div>
        <div>
          <dt>Text · placeholder</dt>
          <dd>
            <a href={business.sms}>{business.phone.display}</a>
          </dd>
        </div>
        <div>
          <dt>Email · placeholder</dt>
          <dd>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </dd>
        </div>
        <div>
          <dt>Hours</dt>
          <dd>{business.hours}</dd>
        </div>
      </dl>
      <p className="placeholder-note">Real contact details will be added before launch.</p>
    </div>
  );
}
