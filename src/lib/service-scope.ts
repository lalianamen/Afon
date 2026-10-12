export const serviceScope = {
  combinedCostLimit: 1000,
  permitWorkAllowed: false,
  services: [
    { id: "diagnostics", title: "Troubleshooting & diagnostics", description: "Find the cause of flickering lights, faulty outlets, and everyday electrical issues." },
    { id: "outlets", title: "Outlet & switch repair", description: "Repair or replace worn outlets and switches for a dependable connection." },
    { id: "lighting", title: "Light fixture replacement", description: "Refresh an existing fixture and bring the right light back to your space." },
    { id: "fans", title: "Ceiling fan replacement", description: "Replace an existing ceiling fan for a more comfortable room." },
    { id: "gfci", title: "GFCI outlet replacement", description: "Replace an existing GFCI outlet to restore its protective function." },
    { id: "repairs", title: "Minor electrical repairs", description: "Careful attention to the small electrical problems that interrupt your day." },
  ],
  areas: ["Los Angeles", "Glendale", "Burbank", "Pasadena", "North Hollywood", "Van Nuys", "Sherman Oaks", "Hollywood"],
} as const;

export function isWithinServiceScope(labor: number, materials: number, requiresPermit: boolean) {
  return Number.isFinite(labor) && Number.isFinite(materials) && labor >= 0 && materials >= 0 &&
    labor + materials < serviceScope.combinedCostLimit && !requiresPermit;
}