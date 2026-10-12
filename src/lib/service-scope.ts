import { JOB_COST_LIMIT, areas, services } from "./business";

/**
 * Browser-safe scope rules. Copy lives in business.ts; this module keeps the
 * legal limits enforceable (and tested) independently of the wording.
 */
export const serviceScope = {
  combinedCostLimit: JOB_COST_LIMIT,
  permitWorkAllowed: false,
  services: services.map((s) => ({ id: s.id, slug: s.slug, title: s.title, description: s.short })),
  areas: areas.map((a) => a.name),
} as const;

export function isWithinServiceScope(labor: number, materials: number, requiresPermit: boolean) {
  return (
    Number.isFinite(labor) &&
    Number.isFinite(materials) &&
    labor >= 0 &&
    materials >= 0 &&
    labor + materials < serviceScope.combinedCostLimit &&
    !requiresPermit
  );
}
