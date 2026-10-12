/**
 * AFON business facts — the single place to edit company details, services,
 * service areas and promises. Pages, SEO tags, JSON-LD, sitemap and llms.txt
 * are all generated from this file.
 *
 * Values in [square brackets], the (000) 000-0000 phone and the .example
 * email are deliberate placeholders. `isPlaceholder()` detects them so they
 * are never emitted into structured data (JSON-LD).
 */

/** Production origin. Canonical URLs, Open Graph, sitemap and JSON-LD derive from it. */
export const SITE_URL = "https://lalianamen.github.io/Afon";

/** Date the site copy was last reviewed — used for sitemap <lastmod>. */
export const CONTENT_UPDATED = "2026-10-12";

/** Hard limit for any single job (labor + materials combined), in US dollars. */
export const JOB_COST_LIMIT = 1000;

/** Required California disclosure (Bus. & Prof. Code §7027.1). Render verbatim in every footer. */
export const LEGAL_DISCLOSURE =
  "AFON is not licensed under the California Contractors State License Law (Bus. & Prof. Code §7027.1). We perform only work under $1,000 in combined labor and materials that does not require a building permit.";

/** The only other place the license status may be discussed. */
export const LICENSE_FAQ_QUESTION = "Are you licensed?";
export const LICENSE_FAQ_ANSWER =
  "Not yet. Our CSLB C-10 license application is in progress. Until it is issued, we only take small repair and replacement jobs under $1,000 (labor and materials combined) that don't require a permit.";

export const business = {
  name: "AFON",
  fullName: "Advanced Field Operations Network",
  tagline: "Electrical Systems & Power Solutions",
  description:
    "AFON is a small, family-run electrical repair company in Los Angeles. We handle troubleshooting, outlet and switch repair, and replacement of existing fixtures, fans and GFCI outlets — with an upfront price before any work starts.",
  city: "Los Angeles",
  region: "CA",
  country: "US",
  phone: { display: "(000) 000-0000", tel: "tel:0000000000" },
  sms: "sms:0000000000",
  email: "info@afon.example",
  hours: "[Business Hours]",
  paymentMethods: "[Payment Methods]",
  googleBusinessProfileUrl: "[Google Business Profile URL]",
  founder: {
    name: "[Founder Name]",
    role: "Founder",
    photoPlaceholder: true,
    photoAlt: "Photo of the AFON founder (placeholder)",
    bio: "[Founder story — a few sentences about who you are, how you got into electrical work, why you started AFON, and what customers can expect when you show up. Replace before launch.]",
  },
} as const;

export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /\[[^\]]*\]|\(000\)|0000000|\.example\b/.test(value);
}

export type Faq = { q: string; a: string };

export type Service = {
  id: string;
  slug: string;
  title: string;
  /** One-line summary for cards and lists. */
  short: string;
  metaTitle: string;
  metaDescription: string;
  /** Long-form copy for the service page. */
  long: {
    intro: string[];
    whenToCall: string[];
    included: string[];
    outOfScope: string;
    approach: string[];
    faqs: Faq[];
  };
  related: string[];
};

export const services: Service[] = [
  {
    id: "diagnostics",
    slug: "electrical-troubleshooting",
    title: "Electrical Troubleshooting",
    short:
      "Tracking down the cause of dead outlets, flickering lights and breakers that won't stay on — before anything gets replaced.",
    metaTitle: "Electrical Troubleshooting in Los Angeles | AFON",
    metaDescription:
      "Dead outlet, flickering lights or a breaker that keeps tripping? AFON finds the cause and quotes an upfront price before any repair in Los Angeles.",
    long: {
      intro: [
        "Most electrical problems in a home show up as a symptom, not a cause. An outlet stops working, a light flickers only when the dryer runs, a breaker trips every evening around the same time. Troubleshooting is the work of following that symptom back to where it starts — a loose connection, a worn-out device, a tripped GFCI two rooms away, or a circuit that is simply carrying more than it should.",
        "We start every troubleshooting job by listening. When did it start? What else was running? Did anything change recently — a new appliance, a fixture someone swapped, a heavy rain? Then we test, room by room, with the power off wherever we're working. We would rather spend ten extra minutes confirming a cause than replace a part that wasn't the problem.",
      ],
      whenToCall: [
        "One or more outlets suddenly stopped working",
        "Lights flicker or dim when a large appliance starts",
        "A breaker trips repeatedly, often at the same time of day",
        "A switch works some of the time, or not at all",
        "A GFCI outlet won't reset",
        "Part of a room lost power and nothing obvious tripped",
      ],
      included: [
        "A free phone conversation first, so we know what we're walking into",
        "Testing outlets, switches, GFCI devices and the breakers that feed them",
        "Checking for loose or heat-damaged connections at the devices we open",
        "A plain-English explanation of what we found",
        "An upfront price for the fix before any repair work begins",
      ],
      outOfScope:
        "Some problems trace back to something bigger: an undersized circuit, a failing panel, or wiring inside the walls that needs to be replaced. Those jobs require a building permit, so they are outside what AFON does. If that is what we find, we'll tell you plainly, show you what we saw, and stop there — and you'll know exactly what to ask for when you call a C-10 electrical contractor.",
      approach: [
        "Troubleshooting doesn't always end in a repair bill. Sometimes the answer is a GFCI in the garage that tripped and took the bathroom outlets with it; you'll leave knowing where it is and how to reset it. Sometimes it's a wire pushed into the back of an outlet instead of wrapped around the screw — a common shortcut in older installs that loosens over time. Moving the connection or replacing the device solves it.",
        "Either way, you'll know what we checked, what we changed and why. If nothing needs replacing, we won't invent a reason to replace something.",
      ],
      faqs: [
        {
          q: "Do you charge to come out and look?",
          a: "The first phone conversation is free. If a visit is needed, we'll tell you how it is priced before we schedule anything, so there is nothing unexpected when we arrive.",
        },
        {
          q: "What if the fix needs a permit?",
          a: "Then we don't do that part of the job. We'll explain what we found and what kind of contractor to call for it.",
        },
      ],
    },
    related: ["outlet-switch-repair", "gfci-outlet-replacement", "minor-electrical-repairs"],
  },
  {
    id: "outlets",
    slug: "outlet-switch-repair",
    title: "Outlet & Switch Repair",
    short:
      "Replacing worn, loose, cracked or warm outlets and switches — including dimmers — in the boxes you already have.",
    metaTitle: "Outlet & Switch Repair in Los Angeles | AFON",
    metaDescription:
      "Loose, cracked or warm outlets? Buzzing switches or dimmers that flicker? AFON replaces existing outlets and switches in Los Angeles homes, priced upfront.",
    long: {
      intro: [
        "Outlets and switches are the parts of your electrical system you touch every day, so they're the parts that wear out first. Over the years the metal contacts inside an outlet lose their grip, plugs start to sag or fall out, and a loose plug can heat the contacts. Switches develop a crackle, a buzz, or that spot where you have to press just right.",
        "AFON replaces existing outlets and switches in the boxes that are already in your walls. That includes standard and tamper-resistant outlets, single-pole and three-way switches, and dimmers. We match the device to the circuit it's on, remake each connection properly, and test it before we put the cover plate back on.",
      ],
      whenToCall: [
        "Plugs feel loose or fall out of the outlet",
        "An outlet or cover plate is cracked or broken",
        "An outlet or switch feels warm, looks discolored or smells hot — stop using it and turn off its breaker",
        "A switch buzzes, crackles or has to be jiggled to work",
        "LED bulbs flicker or hum on an older dimmer",
        "You want an existing switch swapped for a dimmer or a timer",
      ],
      included: [
        "Replacing worn outlets with new devices of the correct rating",
        "Replacing single-pole, three-way and dimmer switches",
        "Remaking loose or back-stabbed connections on the screw terminals",
        "New cover plates where the old ones are cracked or painted over",
        "Testing every replaced device before we leave",
      ],
      outOfScope:
        "We don't add outlets or switches where none exist, extend circuits, run new wire, or convert outlets to 240 volts. Those changes need a building permit. If a room needs more outlets than it has, we'll tell you so rather than recommend extension cords as a long-term fix.",
      approach: [
        "A warm outlet usually means a poor connection, not a bad wall. We replace the device and look closely at the wire ends. If the insulation is damaged further back in the box or the wall, that is a bigger repair — we'll show you and explain your options instead of covering it up.",
        "Two-prong outlets come up often in older Los Angeles homes. A two-prong outlet can't simply be swapped for a three-prong one unless a ground wire is actually present in the box. Where there is no ground, the electrical code allows a GFCI outlet as a replacement, labeled \"No Equipment Ground.\" We'll check what's in the box and walk you through what makes sense before quoting.",
      ],
      faqs: [
        {
          q: "Can you replace all the outlets in a room in one visit?",
          a: "Yes, as long as it's replacing existing devices and the whole job stays under $1,000 in labor and materials combined. We'll price the full list upfront.",
        },
        {
          q: "Why do my LED bulbs flicker on the dimmer?",
          a: "Many older dimmers were designed for incandescent bulbs. Replacing the dimmer with one rated for LED loads — and making sure the bulbs are marked dimmable — usually solves it.",
        },
      ],
    },
    related: ["gfci-outlet-replacement", "electrical-troubleshooting", "light-fixture-replacement"],
  },
  {
    id: "lighting",
    slug: "light-fixture-replacement",
    title: "Light Fixture Replacement",
    short:
      "Swapping an existing ceiling, wall, vanity or outdoor fixture for a new one on the box that's already there.",
    metaTitle: "Light Fixture Replacement in Los Angeles | AFON",
    metaDescription:
      "Replace a dated, broken or flickering light fixture on an existing box. AFON installs ceiling, vanity, pendant and outdoor fixtures in Los Angeles homes.",
    long: {
      intro: [
        "A new light fixture is one of the simplest ways to change how a room feels, and one of the most common small jobs we do. You pick the fixture — a flush-mount for a hallway, a vanity bar for the bathroom, a pendant over the kitchen sink, a lantern by the front door — and we replace the old one on the electrical box that is already in place.",
        "Replacement is also the right fix for fixtures that are simply worn out: sockets that have cracked, fixtures that flicker no matter which bulb you use, outdoor lights that have rusted through, or old fixtures that got so hot over the years that the paint around them browned.",
      ],
      whenToCall: [
        "A fixture flickers or cuts out even with new bulbs",
        "A socket is cracked, loose or scorched",
        "An outdoor fixture is rusted, cracked or lets water in",
        "You've bought a new fixture and want it installed properly",
        "You want to move from old bulb fixtures to an integrated LED fixture",
      ],
      included: [
        "Removing the old fixture and taking it with us if you'd like",
        "Checking that the box is secure and suitable for the new fixture's weight",
        "Connecting the new fixture, including the ground where one is present",
        "Assembly, mounting, bulbs and a full test with the wall switch",
        "Sealing outdoor fixtures against the weather and cleaning up",
      ],
      outOfScope:
        "We replace fixtures; we don't add new ones. Adding a light where there is no box, running wire to a new location, cutting in new recessed lights, or adding structural support for a very heavy chandelier are jobs that need a building permit, so we'll tell you upfront that they're not for us.",
      approach: [
        "Before you buy, send us a photo of the existing fixture and a link to the new one. We'll check the weight, the canopy size and whether the mounting will cover the old paint line — small details that decide whether the new fixture looks right when it goes up.",
        "In older homes, the wires feeding a ceiling fixture have often been baked by decades of hot incandescent bulbs and the insulation gets brittle. We handle them carefully. If the insulation crumbles at the box, we'll stop, show you, and explain what a proper repair involves before going further.",
      ],
      faqs: [
        {
          q: "Can I buy the fixture myself?",
          a: "Yes — most customers do. Send us the model before the visit and we'll confirm it suits your box and ceiling.",
        },
        {
          q: "Do you install fixtures on sloped ceilings?",
          a: "Usually, if there is an existing box and the fixture comes with a sloped-ceiling adapter. We'll confirm when you send photos.",
        },
      ],
    },
    related: ["ceiling-fan-replacement", "outlet-switch-repair", "minor-electrical-repairs"],
  },
  {
    id: "fans",
    slug: "ceiling-fan-replacement",
    title: "Ceiling Fan Replacement",
    short:
      "Replacing a wobbly, noisy or dead ceiling fan with a new one, on a fan-rated box that's already in the ceiling.",
    metaTitle: "Ceiling Fan Replacement in Los Angeles | AFON",
    metaDescription:
      "Wobbly, noisy or dead ceiling fan? AFON replaces existing ceiling fans in Los Angeles homes — assembled, balanced and tested, with an upfront price.",
    long: {
      intro: [
        "In a Los Angeles summer, especially in the Valley, a ceiling fan earns its keep. That also means fans wear out: the motor starts to hum, the pull chain snaps, the light kit stops working, or the whole thing develops a wobble that gets a little worse every week.",
        "AFON replaces existing ceiling fans with new ones. We take down the old fan, confirm the box above it is rated to hold a fan, assemble the new one, connect the fan and its light kit to the existing wiring, and balance the blades so it runs quietly at every speed.",
      ],
      whenToCall: [
        "The fan wobbles or clicks at higher speeds",
        "The motor hums, grinds or runs slower than it used to",
        "A pull chain broke or the fan is stuck on one speed",
        "The light kit doesn't work even with new bulbs",
        "You want a quieter or more efficient fan in the same spot",
      ],
      included: [
        "Removing and hauling away the old fan if you'd like",
        "Checking that the ceiling box is fan-rated and firmly secured",
        "Full assembly of the new fan, including the light kit and remote if supplied",
        "Connecting to the existing wiring and wall control",
        "Balancing the blades, testing every speed, and cleaning up the packaging",
      ],
      outOfScope:
        "A fan is heavier than a light and it moves, so it has to hang from a box built for it. If the existing box isn't rated for a fan, it has to be changed before any fan goes up — and depending on the ceiling, that may become a bigger job. We don't add fans where there's no box, run new wiring for separate fan and light switches, or do anything that needs a building permit. We'll check first and tell you upfront.",
      approach: [
        "Fan wobble is almost always one of three things: a loose mounting bracket, a box that isn't secured to the framing, or blades that are slightly out of balance. We check them in that order, because adding balancing weights to a fan on a loose box only hides the real problem.",
        "If you're choosing a fan, measure the room. As a rough guide, a 42 to 44 inch fan suits a small bedroom and a 52 inch fan suits most living rooms. Flush-mount fans exist for low ceilings. We're happy to look at a model before you buy.",
      ],
      faqs: [
        {
          q: "Can you replace a light fixture with a ceiling fan?",
          a: "Only if the existing box is rated for a fan and the wiring already there supports it. We'll check before quoting. If it would need permit work, we won't take it.",
        },
        {
          q: "Will you assemble the fan?",
          a: "Yes. Assembly is part of the job, and we take the packaging with us.",
        },
      ],
    },
    related: ["light-fixture-replacement", "outlet-switch-repair", "electrical-troubleshooting"],
  },
  {
    id: "gfci",
    slug: "gfci-outlet-replacement",
    title: "GFCI Outlet Replacement",
    short:
      "Replacing existing GFCI outlets in kitchens, bathrooms, garages and outdoors that won't reset, trip constantly or no longer test.",
    metaTitle: "GFCI Outlet Replacement in Los Angeles | AFON",
    metaDescription:
      "GFCI outlet won't reset or keeps tripping? AFON replaces existing GFCI outlets in kitchens, baths, garages and outdoors in Los Angeles, priced upfront.",
    long: {
      intro: [
        "A GFCI (ground-fault circuit interrupter) outlet watches for current leaking where it shouldn't — through water, a damaged cord, or a person — and shuts off power in a fraction of a second. That's why they're required near sinks, in bathrooms, garages and outdoors. Like any device, they wear out, and a GFCI that no longer trips when you press TEST is no longer protecting anyone.",
        "One GFCI often protects several ordinary-looking outlets further down the same circuit. That's why a whole bathroom, or a kitchen counter and the patio, can go dark at once when a single GFCI trips — sometimes from a room you weren't in.",
      ],
      whenToCall: [
        "A GFCI won't reset, or the RESET button won't stay in",
        "Pressing TEST does nothing",
        "A GFCI trips over and over, especially after rain",
        "Several outlets went dead and you can't find what tripped",
        "An outdoor GFCI has a cracked or missing weather cover",
      ],
      included: [
        "Mapping which GFCI protects which outlets",
        "Replacing the existing GFCI with a new device of the correct rating",
        "Correct line and load connections so downstream outlets stay protected",
        "Weather-resistant devices and in-use covers for existing outdoor outlets",
        "Testing every protected outlet and labeling them",
      ],
      outOfScope:
        "We replace existing GFCI outlets. Adding new outdoor outlets, adding circuits for a hot tub or pool equipment, or work inside the electrical panel goes beyond small repairs and generally needs a permit. If your job turns into one of those, we'll tell you before anything else happens.",
      approach: [
        "Nuisance tripping has a cause. The usual suspects are moisture inside an outdoor box, an appliance with a small leak to ground (old refrigerators and space heaters are common), or a GFCI that is simply failing. We unplug, isolate and test until we know which it is, so a new GFCI doesn't just start tripping again next week.",
        "Manufacturers recommend testing GFCI outlets once a month: press TEST, confirm the power goes off, then press RESET. If yours doesn't pass that simple test, it's time to replace it.",
      ],
      faqs: [
        {
          q: "Why do my bathroom outlets stop working when the garage GFCI trips?",
          a: "Because they're downstream of it on the same circuit. Resetting that one GFCI restores them all. We label protected outlets so you know where to look.",
        },
        {
          q: "Is a GFCI the same as a GFCI breaker?",
          a: "They protect the same way, but a GFCI breaker lives in the electrical panel. We replace GFCI outlets, not panel breakers.",
        },
      ],
    },
    related: ["outlet-switch-repair", "electrical-troubleshooting", "minor-electrical-repairs"],
  },
  {
    id: "repairs",
    slug: "minor-electrical-repairs",
    title: "Minor Electrical Repairs",
    short:
      "The short list of small electrical fixes that pile up — handled carefully in one visit, with one upfront price.",
    metaTitle: "Minor Electrical Repairs in Los Angeles | AFON",
    metaDescription:
      "A short list of small electrical fixes? AFON handles loose outlets, doorbells, hardwired smoke alarms and timer switches in one visit, priced upfront.",
    long: {
      intro: [
        "Every home collects a list of small electrical annoyances: the outlet that wobbles in the wall, the cover plate that cracked when a chair hit it, the doorbell that stopped ringing, the chirping hardwired smoke alarm that is past its replacement date, the porch light on a timer that never kept time.",
        "None of these is a big project, and that's the point. Minor electrical repairs are the jobs larger contractors often don't want to schedule. We'd rather take care of them properly, so you're not living with them for another year.",
      ],
      whenToCall: [
        "An outlet or switch moves when you plug something in",
        "A doorbell stopped working or only works sometimes",
        "A hardwired smoke alarm is chirping or past its replacement date",
        "A porch or garage light needs a working timer or motion sensor",
        "Cover plates are cracked, missing or painted over",
        "You have three or four small electrical items on the to-do list",
      ],
      included: [
        "Securing loose devices in existing boxes",
        "Replacing doorbell buttons, chimes and doorbell transformers on existing wiring",
        "Replacing existing hardwired smoke alarms like-for-like",
        "Swapping existing switches for timers or motion-sensing switches",
        "One upfront price for the whole list, plus testing and cleanup",
      ],
      outOfScope:
        "The list has to stay small: under $1,000 in labor and materials combined, with nothing that requires a building permit. That means no new circuits, no rewiring, no panel work and no new wire runs. If an item on your list crosses that line, we'll leave it off and tell you why.",
      approach: [
        "Send us the list before we come — a photo of each item helps. We'll price the whole visit upfront, bring the parts we expect to need, and work through it in order of what matters most to you. If something turns out different from what the photo suggested, we'll talk to you before changing the plan or the price.",
        "Small repairs are also a chance to spot something worth knowing about: a scorched outlet behind a dresser, a missing cover plate in the garage, a GFCI that no longer tests. We'll point those out and let you decide what to do.",
      ],
      faqs: [
        {
          q: "Can you do several small things in one visit?",
          a: "Yes. That's what this service is for — as long as the total stays under $1,000 in labor and materials and nothing needs a permit.",
        },
        {
          q: "Do you replace hardwired smoke alarms?",
          a: "Yes, existing hardwired alarms replaced with compatible new ones. If your alarms are interconnected, we'll make sure they still sound together afterward.",
        },
      ],
    },
    related: ["electrical-troubleshooting", "outlet-switch-repair", "light-fixture-replacement"],
  },
];

export type Area = {
  name: string;
  slug: string;
  kind: "City" | "Neighborhood";
  /** Short local blurb for cards and lists. */
  blurb: string;
  metaTitle: string;
  metaDescription: string;
  utility: string;
  intro: string[];
  localNotes: { title: string; text: string }[];
  closing: string;
  popularServices: string[];
};

export const areas: Area[] = [
  {
    name: "Los Angeles",
    slug: "los-angeles",
    kind: "City",
    blurb:
      "Small electrical repairs across the City of Los Angeles — from Spanish-style bungalows to post-war homes and apartments.",
    metaTitle: "Electrician for Small Repairs in Los Angeles | AFON",
    metaDescription:
      "Small electrical repairs in Los Angeles: troubleshooting, outlets, switches, fixtures, fans and GFCI outlets. Local, family-run, upfront prices.",
    utility: "LADWP",
    intro: [
      "Los Angeles housing is wonderfully mixed. On the same street you'll find a 1920s Spanish-style bungalow, a 1950s ranch house, and an apartment building that went up last decade. The electrical systems inside them are just as varied, and the small problems that come with each are different too.",
      "AFON is a local, family-run company that focuses on exactly those small problems: the outlet that stopped working, the switch that buzzes, the fixture or fan that needs replacing, the GFCI that won't reset. We don't take large projects. That focus lets us spend the time to do small jobs carefully and explain them clearly.",
    ],
    localNotes: [
      {
        title: "Is it your house or the grid?",
        text: "Most of the City of Los Angeles gets its power from LADWP. If your neighbors are dark too, the problem is almost certainly on the utility side — check LADWP's outage information before calling anyone. If only part of your home is affected, that's where troubleshooting starts.",
      },
      {
        title: "Older homes, older devices",
        text: "Many LA homes still have original outlets and switches that have been painted over, back-stabbed or worn loose over decades. Replacing those devices in their existing boxes is small, permit-free work, and it's one of the most useful things you can do for an older house.",
      },
      {
        title: "When a job needs a permit",
        text: "Inside the city, building permits are handled by the Los Angeles Department of Building and Safety (LADBS). New circuits, rewiring and panel work go through that process — and outside what AFON does. We'll tell you if your job falls there.",
      },
      {
        title: "Renters and small businesses",
        text: "Much of Los Angeles rents, and many small shops and offices lease their space. Electrical repairs in a rental are usually the owner's responsibility, so check with your landlord or property manager first — we're glad to coordinate with them directly and send them the upfront price for approval before any work begins.",
      },
    ],
    closing:
      "We work across the City of Los Angeles and nearby communities. If you're not sure whether we come to your street, call and ask — we'll give you a straight answer.",
    popularServices: [
      "electrical-troubleshooting",
      "outlet-switch-repair",
      "light-fixture-replacement",
    ],
  },
  {
    name: "Glendale",
    slug: "glendale",
    kind: "City",
    blurb:
      "Careful small repairs for Glendale homes, condos and apartments, from the foothill neighborhoods to downtown.",
    metaTitle: "Electrician for Small Repairs in Glendale, CA | AFON",
    metaDescription:
      "Small electrical repairs in Glendale, CA: outlets, switches, fixture and ceiling fan replacement, GFCI outlets and troubleshooting. Upfront pricing.",
    utility: "Glendale Water & Power",
    intro: [
      "Glendale covers a lot of ground — hillside homes in the foothill neighborhoods, older single-family streets, and a growing number of condos and apartment buildings near downtown. AFON helps Glendale residents with the small electrical repairs that come up in all of them.",
      "Our work is deliberately limited to small repair and replacement jobs: outlets and switches, existing light fixtures and ceiling fans, GFCI outlets, and tracking down why something stopped working. Every job comes with an upfront price before any work starts.",
    ],
    localNotes: [
      {
        title: "Your utility is Glendale Water & Power",
        text: "Glendale runs its own municipal utility. If your whole block is out, contact Glendale Water & Power rather than an electrician. If it's just one room or one circuit, it's worth a troubleshooting call.",
      },
      {
        title: "Condos and HOAs",
        text: "If you own a condo, the wiring inside your unit is usually yours, but some buildings have rules about who can work on site and when. Check with your HOA or property manager before booking, and we'll work within whatever they require.",
      },
      {
        title: "Fans for warm foothill summers",
        text: "Inland heat makes ceiling fans popular in Glendale homes, and older fans tend to wobble or hum after years of daily use. Replacing an existing fan on a fan-rated box is one of the most common jobs we do here.",
      },
      {
        title: "Older foothill homes",
        text: "Some homes in Glendale's foothill neighborhoods date back many decades and have been updated in stages. Outlets and switches may be a mix of old and new, and earlier owners may have swapped fixtures themselves. While we're there for one repair, we'll mention anything we notice that looks worth a closer look, and leave the decision to you.",
      },
    ],
    closing:
      "Have a small electrical problem in Glendale? Tell us about it by phone, text or the quote form, and we'll tell you honestly whether it's a job for us.",
    popularServices: [
      "ceiling-fan-replacement",
      "outlet-switch-repair",
      "electrical-troubleshooting",
    ],
  },
  {
    name: "Burbank",
    slug: "burbank",
    kind: "City",
    blurb:
      "Small electrical repairs for Burbank's mid-century homes and apartments — outlets, switches, fixtures and GFCIs.",
    metaTitle: "Electrician for Small Repairs in Burbank, CA | AFON",
    metaDescription:
      "Small electrical repairs in Burbank: two-prong and worn outlets, switches, fixtures, fans and GFCI outlets. Local, family-run, upfront prices.",
    utility: "Burbank Water and Power",
    intro: [
      "Much of Burbank's housing went up in the decades after the Second World War. Those mid-century homes are solid and well-loved, but many still have original outlets, switches and fixtures that are now more than sixty years old.",
      "AFON helps Burbank homeowners and renters with the small electrical repairs those houses need: replacing worn devices, swapping old fixtures and fans, replacing GFCI outlets and tracking down outlets that quit. We keep every job small, careful and priced upfront.",
    ],
    localNotes: [
      {
        title: "Two-prong outlets in mid-century homes",
        text: "Original two-prong outlets are common in older Burbank homes. You can't simply swap one for a three-prong outlet unless a ground wire is actually present. Where there's no ground, a GFCI outlet labeled \"No Equipment Ground\" is a code-recognized replacement. We'll check what's in the box before recommending anything.",
      },
      {
        title: "Burbank Water and Power",
        text: "Burbank has its own city-owned utility. A neighborhood-wide outage is a Burbank Water and Power issue; a single dead circuit in your home is where we can help.",
      },
      {
        title: "Garages and laundry areas",
        text: "Detached and attached garages in Burbank often have older outlets that see hard use from tools and freezers. Replacing worn garage outlets with GFCI protection, where the existing wiring allows, is a small job that's worth doing.",
      },
      {
        title: "Fixtures and fans from another era",
        text: "Original mid-century ceiling fixtures and early ceiling fans are still hanging in plenty of Burbank homes. Replacing them on the existing box is a small job, but older boxes aren't always rated to hold a fan. We check that first and tell you plainly whether a fan can go where the light is now, before you buy anything.",
      },
    ],
    closing:
      "Live in Burbank and have a small electrical repair on your list? Reach out for a free phone consultation and an upfront price.",
    popularServices: [
      "outlet-switch-repair",
      "gfci-outlet-replacement",
      "light-fixture-replacement",
    ],
  },
  {
    name: "Pasadena",
    slug: "pasadena",
    kind: "City",
    blurb:
      "Respectful small repairs for Pasadena's Craftsman bungalows and historic homes, with care for original details.",
    metaTitle: "Electrician for Small Repairs in Pasadena, CA | AFON",
    metaDescription:
      "Small electrical repairs in Pasadena's older and historic homes: fixtures, switches, outlets, fans and GFCI outlets — careful work, upfront price.",
    utility: "Pasadena Water and Power",
    intro: [
      "Pasadena is known for its Craftsman bungalows and early twentieth-century homes, many of them lovingly restored. Older houses like these reward a careful approach to electrical work — the goal is to fix what's broken without damaging plaster, trim or original details.",
      "AFON handles small electrical repairs and replacements in Pasadena homes: replacing existing fixtures, switches, outlets, ceiling fans and GFCI outlets, and troubleshooting problems on existing circuits. We protect floors and finishes, take our time, and clean up when we're done.",
    ],
    localNotes: [
      {
        title: "Working around original details",
        text: "Many Pasadena owners want period-style fixtures or push-button-style switches that suit the house. We're glad to install fixtures and switches you've chosen on existing boxes, and to handle original plaster and woodwork gently while we do.",
      },
      {
        title: "Old wiring deserves honesty",
        text: "The oldest homes may still have cloth-insulated or knob-and-tube wiring in places. We don't rewire houses. If we open a box and find wiring in poor condition, we'll stop, show you, and explain what a proper fix would involve — rather than connect a new fixture to a problem.",
      },
      {
        title: "Pasadena Water and Power",
        text: "Pasadena has its own municipal utility, Pasadena Water and Power. If the whole street is out, start with them; if one room is out, start with us.",
      },
      {
        title: "Bungalows, duplexes and ADUs",
        text: "Alongside single-family Craftsman homes, Pasadena has many duplexes, courtyard apartments and newer backyard units. Whatever the building, the rule for our work is the same: repair and replace what's already there, keep each job under $1,000 in labor and materials, and never take on anything that needs a permit.",
      },
    ],
    closing:
      "If you have a small electrical repair in a Pasadena home, call or send a request — we'll talk it through before anyone picks up a tool.",
    popularServices: [
      "light-fixture-replacement",
      "outlet-switch-repair",
      "electrical-troubleshooting",
    ],
  },
  {
    name: "North Hollywood",
    slug: "north-hollywood",
    kind: "Neighborhood",
    blurb:
      "Small electrical repairs for North Hollywood houses, apartments and rentals — including quick fixes between tenants.",
    metaTitle: "Electrician for Small Repairs in North Hollywood | AFON",
    metaDescription:
      "Small electrical repairs in North Hollywood for owners, renters and landlords: outlets, switches, fixtures, fans and GFCIs. Upfront prices.",
    utility: "LADWP",
    intro: [
      "North Hollywood mixes 1940s and 1950s houses with newer apartment buildings, condos and backyard units, plus the busy streets around the NoHo Arts District. A lot of homes here are rentals, and a lot of small electrical repairs happen between one tenant and the next.",
      "AFON handles those small repairs for homeowners, renters and property owners: worn outlets and switches, existing light fixtures and ceiling fans, GFCI outlets in kitchens and bathrooms, and tracking down why a circuit went dead. Every job starts with a free phone conversation and an upfront price, and every job stays small: under $1,000 in labor and materials, with nothing that requires a permit.",
    ],
    localNotes: [
      {
        title: "Landlords and turnovers",
        text: "Before a new tenant moves in is a good time to replace cracked cover plates, loose outlets, dead GFCIs and dated fixtures. We'll price the whole list upfront and keep it within small-repair limits.",
      },
      {
        title: "Renters: check with your landlord first",
        text: "If you rent, your landlord or property manager is usually responsible for electrical repairs and needs to approve any work. We're happy to talk with them directly so the repair gets done properly.",
      },
      {
        title: "Valley heat and fans",
        text: "Summer heat in the San Fernando Valley means ceiling fans run hard here. When an existing fan starts wobbling or humming, replacing it on its fan-rated box is a straightforward small job.",
      },
      {
        title: "Condos and backyard units",
        text: "Newer condo buildings and backyard ADUs in North Hollywood have modern wiring, but their outlets, GFCIs and fixtures still wear out with daily use. Replacing those devices is quick, careful work, and if a building has an HOA or management company, we'll follow its access rules.",
      },
    ],
    closing:
      "North Hollywood is part of the City of Los Angeles, served by LADWP. For a small electrical repair, reach out for a free phone consultation.",
    popularServices: ["outlet-switch-repair", "ceiling-fan-replacement", "gfci-outlet-replacement"],
  },
  {
    name: "Van Nuys",
    slug: "van-nuys",
    kind: "Neighborhood",
    blurb:
      "Small electrical repairs for Van Nuys ranch homes, garages and apartments — troubleshooting, outlets, GFCIs and more.",
    metaTitle: "Electrician for Small Repairs in Van Nuys | AFON",
    metaDescription:
      "Small electrical repairs in Van Nuys: tripping breakers, dead outlets, garage and outdoor GFCIs, fixtures and fans. Local and priced upfront.",
    utility: "LADWP",
    intro: [
      "Van Nuys is full of single-story ranch homes built in the post-war years, along with apartment buildings and small businesses along its main boulevards. Many of those houses have had additions, garage conversions and decades of do-it-yourself changes — which is often where small electrical problems start.",
      "AFON helps Van Nuys residents with small repair and replacement work on existing wiring: troubleshooting, outlets and switches, GFCI outlets, existing light fixtures and ceiling fans. You get an upfront price before any work begins.",
    ],
    localNotes: [
      {
        title: "Breakers that trip in summer",
        text: "When window air conditioners, fans and a microwave all share one circuit in a hot Valley afternoon, breakers trip. Sometimes the cause is a worn device or loose connection we can repair. Sometimes the honest answer is that the circuit is overloaded and needs new wiring — a permit job we'll tell you about instead of taking on.",
      },
      {
        title: "Garages, patios and laundry rooms",
        text: "Outdoor and garage outlets take a beating from weather and heavy tools. Replacing worn ones with weather-resistant GFCI outlets and proper in-use covers, on existing wiring, is a small job that adds real protection.",
      },
      {
        title: "Earlier do-it-yourself work",
        text: "If someone before you swapped a fixture or added a switch on their own, we'll look closely at those connections while we're there and tell you what we find.",
      },
      {
        title: "Small businesses on the boulevards",
        text: "Shops and offices along the Van Nuys boulevards have the same small problems homes do: a dead outlet behind the counter, a fixture that flickers over a workbench, a GFCI in the break room that won't reset. We can schedule around your opening hours, as long as the job stays small.",
      },
    ],
    closing:
      "Van Nuys is part of the City of Los Angeles and is served by LADWP. Tell us about your small electrical problem and we'll give you a straight answer.",
    popularServices: [
      "electrical-troubleshooting",
      "gfci-outlet-replacement",
      "minor-electrical-repairs",
    ],
  },
  {
    name: "Sherman Oaks",
    slug: "sherman-oaks",
    kind: "Neighborhood",
    blurb:
      "Small electrical repairs for Sherman Oaks homes and condos — dimmers, fixtures, fans and outdoor lighting replacement.",
    metaTitle: "Electrician for Small Repairs in Sherman Oaks | AFON",
    metaDescription:
      "Small electrical repairs in Sherman Oaks: LED dimmer swaps, fixture and fan replacement, outdoor light replacement and GFCIs. Upfront prices.",
    utility: "LADWP",
    intro: [
      "Sherman Oaks stretches from the flats north of Ventura Boulevard to the hillside streets south of it, with plenty of condos in between. Many homes here have been updated over the years, and a lot of the small electrical requests we hear are about finishing touches: better dimmers, new fixtures, a quieter fan, outdoor lights that work again.",
      "AFON handles those small repair and replacement jobs on existing wiring, carefully and with an upfront price. We protect floors and finishes, test everything before we leave, and explain what we changed. If a project grows beyond small repairs, we'll tell you rather than stretch the scope.",
    ],
    localNotes: [
      {
        title: "LED flicker and old dimmers",
        text: "Switching to LED bulbs on an older dimmer often causes flicker, buzzing or lights that won't dim smoothly. Replacing the existing dimmer with an LED-rated model usually fixes it — a quick swap in the existing box.",
      },
      {
        title: "Outdoor and hillside lighting",
        text: "Exterior fixtures on hillside homes face sun, wind and sprinklers. Replacing rusted or cracked existing outdoor fixtures, and making sure they're sealed properly, keeps paths and entries lit.",
      },
      {
        title: "Condos and building rules",
        text: "In condo buildings, check with your HOA before scheduling. We'll work within the building's access hours and rules.",
      },
      {
        title: "Ceiling fans in the flats",
        text: "North of Ventura Boulevard, single-story homes on the flats get the full Valley heat, and their ceiling fans run most of the summer. When an existing fan starts to wobble, click or hum, replacing it on its fan-rated box is a small job we can usually price from a couple of photos.",
      },
    ],
    closing:
      "Sherman Oaks is part of the City of Los Angeles and is served by LADWP. Reach out for a free phone consultation about your small electrical repair.",
    popularServices: [
      "outlet-switch-repair",
      "light-fixture-replacement",
      "ceiling-fan-replacement",
    ],
  },
  {
    name: "Hollywood",
    slug: "hollywood",
    kind: "Neighborhood",
    blurb:
      "Small electrical repairs in Hollywood's older apartments, courtyard buildings and bungalows — for residents and owners.",
    metaTitle: "Electrician for Small Repairs in Hollywood | AFON",
    metaDescription:
      "Small electrical repairs in Hollywood apartments and homes: buzzing switches, dead outlets, fixtures and GFCIs. Upfront prices, careful work.",
    utility: "LADWP",
    intro: [
      "Hollywood has some of the oldest housing in Los Angeles — 1920s and 1930s apartment buildings, courtyard buildings and bungalows on the streets above and below the boulevard. Character is everywhere; so are original switches, painted-over outlets and fixtures that have been replaced several times by several different hands.",
      "AFON helps Hollywood residents and building owners with small electrical repairs on existing wiring: troubleshooting dead outlets, replacing buzzing switches and worn outlets, swapping existing fixtures, and replacing GFCI outlets in kitchens and bathrooms.",
    ],
    localNotes: [
      {
        title: "Apartments and permission",
        text: "Most Hollywood residents rent. Electrical repairs in a rental are normally the owner's responsibility, so we'll ask that your landlord or manager approves the work — and we're glad to coordinate with them directly.",
      },
      {
        title: "Buzzing switches in older buildings",
        text: "A switch that buzzes, crackles or feels warm is telling you something. In older buildings it's often a worn device or a loose connection, which we can replace and remake. If the wiring itself is the problem, we'll explain what we found and stop there.",
      },
      {
        title: "Small spaces, careful work",
        text: "Apartment kitchens and bathrooms are tight. We bring drop cloths, keep tools contained, and leave the space the way we found it — minus the problem.",
      },
      {
        title: "Owners and managers of older buildings",
        text: "If you own or manage an older Hollywood building, small electrical repairs between tenants add up: cracked cover plates, worn outlets, tired fixtures in hallways and units. We'll price each unit's list upfront, keep every job within small-repair limits, and tell you honestly when something needs a bigger fix.",
      },
    ],
    closing:
      "Hollywood is part of the City of Los Angeles and is served by LADWP. Tell us what's going on and we'll tell you honestly whether it's a job for us.",
    popularServices: [
      "outlet-switch-repair",
      "electrical-troubleshooting",
      "gfci-outlet-replacement",
    ],
  },
];

export type BusinessPromise = { id: string; title: string; text: string; enabled: boolean };

/** Toggle `enabled` to show or hide a promise everywhere on the site. */
export const promises: BusinessPromise[] = [
  {
    id: "upfront-price",
    title: "Upfront price before work starts",
    text: "You'll know the price before any work begins. If something changes, we talk to you first.",
    enabled: true,
  },
  {
    id: "free-consultation",
    title: "Free phone consultation",
    text: "Describe the problem by phone and we'll tell you honestly whether it's a job for us.",
    enabled: true,
  },
  {
    id: "on-time",
    title: "On-time arrival or we call ahead",
    text: "We show up when we say we will. If something holds us up, you'll hear from us before the appointment time.",
    enabled: true,
  },
  {
    id: "clean-up",
    title: "Clean-up after every job",
    text: "Drop cloths down, packaging and old parts taken away, your space left tidy.",
    enabled: true,
  },
  {
    id: "clear-explanation",
    title: "Clear explanation of what we did",
    text: "Before we leave, we show you what we found, what we changed and why.",
    enabled: true,
  },
];

export const enabledPromises = () => promises.filter((p) => p.enabled);

export const warningSigns = [
  {
    title: "Flickering or dimming lights",
    text: "Especially when an appliance kicks on, or in one room only.",
  },
  {
    title: "Warm or discolored outlets",
    text: "Brown or melted marks, or a cover plate that feels warm, point to a poor connection.",
  },
  {
    title: "Buzzing or crackling switches",
    text: "Switches should be silent. Noise usually means arcing inside the device.",
  },
  {
    title: "Breakers that keep tripping",
    text: "A breaker that trips over and over is protecting you from something — find out what.",
  },
  {
    title: "A burning smell",
    text: "A hot-plastic or burning odor near an outlet, switch or fixture needs attention right away.",
  },
];

export const generalFaqs: Faq[] = [
  {
    q: "How does pricing work?",
    a: "You get an upfront price before any work starts. We'll ask about the problem by phone (free), may ask for photos, and then tell you the price. If something changes once we're there, we stop and talk to you before doing anything else.",
  },
  {
    q: "What areas do you serve?",
    a: "Los Angeles and nearby communities, including Glendale, Burbank, Pasadena, North Hollywood, Van Nuys, Sherman Oaks and Hollywood. If you're nearby and not sure, ask.",
  },
  {
    q: "How do I schedule a repair?",
    a: `Call, text or send the quote form. Our hours are ${business.hours}. We'll agree on an appointment time that works for you, and if we're held up, we'll call ahead. We don't offer emergency or after-hours service.`,
  },
  {
    q: "Which jobs do you take?",
    a: "Small repair and replacement jobs: electrical troubleshooting, outlet and switch repair, replacing existing light fixtures and ceiling fans, GFCI outlet replacement, and minor electrical repairs. Every job must be under $1,000 in labor and materials combined and must not require a building permit.",
  },
  {
    q: "Which jobs don't you take?",
    a: "Anything that needs a building permit or goes over $1,000 — for example new circuits, rewiring, panel work, or adding new outlets and lights where none exist. If your job is one of those, we'll tell you honestly and point you in the right direction.",
  },
  {
    q: "What payment methods do you accept?",
    a: `${business.paymentMethods}. We'll confirm payment options when we give you the upfront price.`,
  },
  {
    q: LICENSE_FAQ_QUESTION,
    a: LICENSE_FAQ_ANSWER,
  },
  {
    q: "What should I do if I smell burning or see smoke?",
    a: "Leave the building and call 911. Don't try to find the source yourself. Once everyone is safe and the fire department has cleared it, we can talk about small repairs.",
  },
];

/** The hero/home copy lives here so it can be edited without touching layout. */
export const homeCopy = {
  heroTitle: "Reliable Electrical Repair in Los Angeles",
  heroSubline: "Local Los Angeles electrical repair — upfront price before any work.",
  trustChips: [
    "Upfront price before work",
    "Free phone consultation",
    "Local & family-run",
    "Small repairs, done carefully",
  ],
};

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
export const areaPath = (area: Pick<Area, "slug">) => `/electrician-${area.slug}`;
export const servicePath = (service: Pick<Service, "slug">) => `/services/${service.slug}`;
