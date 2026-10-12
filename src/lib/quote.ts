export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  service: string;
  preferredTime: string;
  description: string;
};

export type QuoteResult =
  { delivered: false; mode: "preview" } | { delivered: true; mode: "sent"; reference?: string };

export const preferredTimes = ["Morning", "Midday", "Afternoon", "Flexible — any time"] as const;

export function readQuoteForm(form: HTMLFormElement): QuoteRequest {
  const data = new FormData(form);
  const get = (k: string) => String(data.get(k) ?? "").trim();
  return {
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    zip: get("zip"),
    service: get("service"),
    preferredTime: get("preferredTime"),
    description: get("description"),
  };
}

/**
 * The ONE place quote requests are submitted.
 *
 * Right now the form is a non-delivering PREVIEW (see AGENTS.md): nothing is
 * sent, stored or logged, and the UI says so. To add real delivery later
 * (e.g. a TanStack server function that emails the owner), implement it here
 * and return `{ delivered: true, mode: "sent" }` only after the owner-visible
 * delivery has actually succeeded.
 */
export async function submitQuoteRequest(_request: QuoteRequest): Promise<QuoteResult> {
  return { delivered: false, mode: "preview" };
}
