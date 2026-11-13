import { TOKENS } from "./glyphs";

export type ServiceId =
  | "physical-ai"
  | "video-ai"
  | "ai-agents"
  | "ot-security"
  | "ai-development";

export interface CoreService {
  id: ServiceId;
  num: string;
  name: string;
  shortLabel: string;
  heroTitle: string;
  heroSummary: string;
  carouselHeading: string;
  carouselBody: string;
  exploreHref: string;
  demoParam: string;
  accentBg: string;
  accentFg: string;
  illustrationLabel: string;
  illustrationLines: string[];
}

export const COMPANY = {
  brand: "applyd.ai",
  legalName: "APPLYD AI LTD",
  companyNumber: "16969416",
  jurisdiction: "England and Wales",
  address: "8 Furzegate, Rochdale, England, OL16 4RP",
  email: "contact@applyd.ai",
  tagline: "AI agents for sales and service teams, with people in charge of every decision that matters.",
  copyright: "© 2026 APPLYD AI LTD. All trademarks are property of their respective owners.",
};

export const HERO_CYCLE = [
  { desktop: "APPLYD", mobile: ["APP", "LYD"], caption: "(01 / Physical, Video, Agents, OT, Custom)" },
  { desktop: "SENSE", mobile: ["SEN", "SE"], caption: "(02 / Equipment vibration, flow & drift)" },
  { desktop: "WATCH", mobile: ["WAT", "CH"], caption: "(03 / Existing IP cameras & NVRs)" },
  { desktop: "AGENT", mobile: ["AGE", "NT"], caption: "(04 / Capture, qualify, follow up, book, sync)" },
  { desktop: "GUARD", mobile: ["GUA", "RD"], caption: "(05 / OT discovery & written hand-off rules)" },
];

export const CORE_SERVICES: CoreService[] = [
  {
    id: "physical-ai",
    num: "01",
    name: "Physical AI",
    shortLabel: "Physical AI",
    heroTitle: "Physical AI for plants and sites.",
    heroSummary: "Reads sensor and equipment data from your site, compares it with normal behaviour and raises a flag with the readings behind it.",
    carouselHeading: "Know which equipment needs attention first.",
    carouselBody: "Reads vibration, current, temperature, pressure and flow against how each asset normally behaves, and flags drift for your maintenance team.",
    exploreHref: "#/ai/physical-ai",
    demoParam: "physical-ai",
    accentBg: TOKENS.pink,
    accentFg: TOKENS.ink,
    illustrationLabel: "P-204 · Process pump · Vibration (Illustrative)",
    illustrationLines: [
      "Baseline: 2.4 mm/s · Out of range: +38% vs baseline",
      "Motor current: 16.1 A · Discharge pressure: 4.2 bar",
      "Flag: Bearing vibration drift — engineer to check",
    ],
  },
  {
    id: "video-ai",
    num: "02",
    name: "Video AI",
    shortLabel: "Video AI",
    heroTitle: "Video AI for the cameras you already have.",
    heroSummary: "Turns existing camera feeds into alerts for restricted-area entry, safety events and process changes, each with a still frame or clip.",
    carouselHeading: "Turn existing cameras into alerts that matter.",
    carouselBody: "Watches IP cameras and NVRs for the events your site defines, such as restricted-area entry, and sends each alert to its owner.",
    exploreHref: "#/ai/video-ai",
    demoParam: "video-ai",
    accentBg: TOKENS.green,
    accentFg: TOKENS.ink,
    illustrationLabel: "Cam 04 · Restricted zone (Illustrative)",
    illustrationLines: [
      "14:02 · Person entering restricted process zone",
      "Rule: Permit required during live pump run",
      "Alert routed: Shift supervisor · Still frame attached",
    ],
  },
  {
    id: "ai-agents",
    num: "03",
    name: "AI Agents",
    shortLabel: "AI Agents",
    heroTitle: "AI agents for every inbound conversation.",
    heroSummary: "Answers, qualifies and follows up on chat, email, SMS, WhatsApp and voice, and writes every conversation to one record.",
    carouselHeading: "Handle every inbound conversation, then hand off.",
    carouselBody: "Picks up enquiries, bookings, orders and claims on email, chat, SMS, WhatsApp and voice, under hand-off rules your team writes.",
    exploreHref: "#/platform",
    demoParam: "ai-agents",
    accentBg: TOKENS.blue,
    accentFg: TOKENS.paper,
    illustrationLabel: "Inbound demo request · Email (Illustrative)",
    illustrationLines: [
      "09:03 · Agent asked about timeline and CRM",
      "09:38 · Reply asks about volume pricing (rule matched)",
      "09:41 · Person: Account owner took over with full history",
    ],
  },
  {
    id: "ot-security",
    num: "04",
    name: "OT Security",
    shortLabel: "OT Security",
    heroTitle: "OT security for the networks that run your site.",
    heroSummary: "Lists every device on your control network, shows who can reach it and flags traffic that does not match the usual pattern.",
    carouselHeading: "See what is connected to your control network.",
    carouselBody: "Passive asset discovery, remote access review and segmentation, structured around IEC 62443, NIST SP 800-82 and the NCSC CAF.",
    exploreHref: "#/ai/ot-cybersecurity",
    demoParam: "ot-security",
    accentBg: TOKENS.lavender,
    accentFg: TOKENS.ink,
    illustrationLabel: "Asset inventory · Passive discovery (Illustrative)",
    illustrationLines: [
      "PLC-12 · Cell 3 · passive · New remote session",
      "HMI-04 · Cell 3 · passive · Known baseline",
      "SW-02 · Line 1 · passive · Known baseline",
    ],
  },
  {
    id: "ai-development",
    num: "05",
    name: "AI Development",
    shortLabel: "AI Development",
    heroTitle: "AI development for your own workflow.",
    heroSummary: "We build custom AI for one workflow, test it on your own data and show each answer with the source it came from.",
    carouselHeading: "Custom AI built around your own processes.",
    carouselBody: "Agents, generative AI, LLM integration and RAG, tested on your data before launch.",
    exploreHref: "#/ai",
    demoParam: "ai-development",
    accentBg: TOKENS.coral,
    accentFg: TOKENS.ink,
    illustrationLabel: "Maintenance assistant · RAG (Illustrative)",
    illustrationLines: [
      "Q: Which seal fits pump P-204?",
      "A: Use the mechanical seal specified in section 4.2",
      "Source: Pump manual · §4.2 · p. 18 · Status: Proposed",
    ],
  },
];

export const AGENT_STAGES = [
  {
    id: "capture",
    num: "01",
    name: "Capture",
    desc: "Every channel lands in one record, matched and enriched.",
    meta: "09:02 · matched, enriched",
    detail: "Collects leads from forms, site chat, shared inboxes, and ad lead forms, removes duplicates, and enriches records. Hands off when the lead belongs to an open opportunity, going to that owner.",
  },
  {
    id: "qualify",
    num: "02",
    name: "Qualify",
    desc: "Asks your questions and scores the answers against your fit rules.",
    meta: "09:03 · 4 of 5 rules met",
    detail: "Scores fit and intent using your ICP definition, territory rules, and past win data, explaining each score. Hands off when the score crosses your threshold or the lead asks for a person.",
  },
  {
    id: "follow-up",
    num: "03",
    name: "Follow up",
    desc: "Email, SMS, WhatsApp and voice, from messages you approved.",
    meta: "09:03 · email sent",
    detail: "Runs sequences using an approved message library, send windows, and opt-out handling, stopping when the prospect replies. Hands off on pricing, contract terms, or outside-policy questions.",
  },
  {
    id: "book",
    num: "04",
    name: "Book",
    desc: "Offers the rep's open slots and books the meeting.",
    meta: "10:15 · Thu 15:00",
    detail: "Finds times that suit the prospect and rep, sends invites, handles reschedules, and writes a call brief. Hands off when the account needs a named owner or executive sponsor.",
  },
  {
    id: "sync",
    num: "05",
    name: "Sync",
    desc: "Writes to your CRM both ways. A rep's manual edit always wins.",
    meta: "10:15 · CRM updated",
    detail: "Writes activities, stages, scores, notes, and owner changes to the CRM in real time with a full audit trail. Flags conflicts with manual edits without ever overwriting the rep's change.",
  },
];

export const CHANNELS_LIST = [
  "Web forms",
  "Site chat",
  "Email",
  "SMS",
  "WhatsApp",
  "Voice",
];

export const CONVERSATION_REPLAY = {
  lead: "Sara Malik",
  company: "Northwind Freight",
  subject: "Inbound demo request",
  fitScore: "82/100",
  outcome: "Meeting booked",
  steps: [
    {
      id: 1,
      actor: "Agent" as const,
      time: "09:02",
      title: "Agent captured the lead",
      detail: "De-duplicated across web form and shared inbox, and enriched with company size and region.",
      rule: "Rule: Capture & enrich all inbound domains",
    },
    {
      id: 2,
      actor: "Agent" as const,
      time: "09:03",
      title: "Agent qualified it",
      detail: "Matched 4 of 5 fit rules and asked about timeline and existing CRM by approved email template.",
      rule: "Rule: Ask ICP fit questions when score >= 60",
    },
    {
      id: 3,
      actor: "Person" as const,
      time: "09:41",
      title: "Handed to a rep",
      detail: "Sara asked about volume pricing, which your rules reserve for a person. Agent stopped sending immediately.",
      rule: "Rule fired: IF enquiry asks for pricing/discount → Account owner",
    },
    {
      id: 4,
      actor: "Outcome" as const,
      time: "10:15",
      title: "Rep booked the meeting",
      detail: "Thursday 15:00 booked with the account owner, accompanied by a call brief written by the agent.",
      rule: "Logged: CRM synced, audit trail written",
    },
  ],
};

export const HOME_INDUSTRY_EXAMPLES = [
  {
    id: "oil-gas",
    label: "Oil & gas",
    summary: "Restricted process areas and pumps and compressors that wear over time.",
    href: "#/industrial/oil-gas",
    services: ["Video AI", "Physical AI", "OT Security"],
    eventTime: "14:02",
    eventText: "Person enters a restricted process area · Cam 04",
    routedTo: "Shift supervisor",
    accent: TOKENS.pink,
    posterSeed: "oil-gas-matrix-01",
  },
  {
    id: "chemical-plants",
    label: "Chemical plants",
    summary: "Production zones watched alongside heat-exchanger flow, temperature and pressure-drop patterns.",
    href: "#/industrial/chemical-plants",
    services: ["Video AI", "Physical AI", "OT Security"],
    eventTime: "11:18",
    eventText: "HX-204 cooling demand +19% at comparable load",
    routedTo: "Maintenance & process lead",
    accent: TOKENS.lavender,
    posterSeed: "chem-plants-matrix-02",
  },
  {
    id: "power-generation",
    label: "Power generation",
    summary: "Work at height during planned maintenance and load-aware monitoring for cooling fans and pumps.",
    href: "#/industrial/power-generation",
    services: ["Video AI", "Physical AI", "OT Security"],
    eventTime: "07:45",
    eventText: "Activity at height outside outage permit window · Bay 2",
    routedTo: "Shift / outage lead",
    accent: TOKENS.coral,
    posterSeed: "power-gen-matrix-03",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    summary: "Patient booking, reminders and cancelled slot refill; clinical questions routed to clinicians.",
    href: "#/industries/healthcare",
    services: ["AI Agents", "Hand-off Rules", "Diary Sync"],
    eventTime: "09:34",
    eventText: "Patient asks whether a sore tooth can be checked during hygiene visit",
    routedTo: "Clinical front desk & dentist",
    accent: TOKENS.green,
    posterSeed: "healthcare-matrix-04",
  },
  {
    id: "saas",
    label: "SaaS",
    summary: "Demo requests answered in minutes and stalled trial users nudged; pricing and security handed to reps.",
    href: "#/industries/saas",
    services: ["AI Agents", "Site Chat", "CRM Sync"],
    eventTime: "10:15",
    eventText: "Day-5 stalled trial user asks about volume pricing for 25 seats",
    routedTo: "Named account owner",
    accent: TOKENS.blue,
    posterSeed: "saas-matrix-05",
  },
  {
    id: "logistics",
    label: "Logistics",
    summary: "Freight quote emails parsed for lane, weight and pallets, plus where-is-my-shipment tracking.",
    href: "#/industries/logistics",
    services: ["AI Agents", "Video AI", "Yard & Dock"],
    eventTime: "09:15",
    eventText: "8 pallets Felixstowe → Leeds missing weight and collection date",
    routedTo: "Pricing desk once brief complete",
    accent: TOKENS.mint,
    posterSeed: "logistics-matrix-06",
  },
];

export const FOUR_DELIVERY_STEPS = [
  {
    num: "01",
    title: "Understand",
    desc: "We map the site, the team and the workflow, and what connects to what.",
    give: "Access to the site, the team and the workflow.",
    get: "A map of what connects to what.",
  },
  {
    num: "02",
    title: "Define",
    desc: "We pick one area to start, agree what good looks like and who reviews what.",
    give: "Which area comes first, and who reviews what.",
    get: "One starting area, with what good looks like agreed.",
  },
  {
    num: "03",
    title: "Evaluate",
    desc: "We test on your own data and conversations before anything goes live, and agree the limits.",
    give: "Your own data and conversations.",
    get: "A test on that data, and agreed limits.",
  },
  {
    num: "04",
    title: "Integrate",
    desc: "We connect it to your systems in stages. People approve the steps that matter.",
    give: "Your approval at each step that matters.",
    get: "A connection to your systems, in stages.",
  },
];

export const SECURITY_CONTROLS = [
  {
    title: "Tenant isolation",
    desc: "Each customer workspace is logically separated, with its own access policies.",
  },
  {
    title: "Roles and audit log",
    desc: "Role-based access for admins, managers and reps. Every agent action is logged and traceable.",
  },
  {
    title: "Written hand-off rules",
    desc: "Your team sets when an agent stops. Each hand-off is logged with the rule that allowed it.",
  },
  {
    title: "CRM edits",
    desc: "A rep's manual edit always wins over an agent.",
  },
  {
    title: "On-site processing",
    desc: "For the industrial services, processing can run on site, in the cloud or hybrid, so video and sensor data can stay on site.",
  },
];

export const FAQS = [
  {
    q: "What are applyd.ai AI agents, and where does a person step in?",
    a: "They are software agents that handle inbound conversations, sales and service: enquiries, bookings, orders, claims and renewals. They answer, qualify, follow up by email, SMS, WhatsApp and voice, and book meetings. Written hand-off rules decide when a person takes over, and the CRM is updated throughout.",
  },
  {
    q: "Does this replace our SDR team?",
    a: "No. Agents handle immediate first replies, routine qualifying questions, scheduling and CRM logging across web forms, chat, email, SMS, WhatsApp and voice. Your reps take over for high-fit accounts, pricing, negotiation, contract terms and relationship calls—with full context already gathered.",
  },
  {
    q: "Is this only for sales leads?",
    a: "No. The same platform handles service and operational workflows across 16+ industries: patient appointment booking and reminders, insurance FNOL claim intake, client onboarding document chasing, order status and returns, and installer survey booking.",
  },
  {
    q: "Can we control what the agents say?",
    a: "Yes. Agents work from an approved message library and policy boundaries written or signed off by your team. New templates can require manager approval before anything is sent, and rules can be updated at any time.",
  },
  {
    q: "What happens when a lead asks about pricing?",
    a: "Under standard hand-off rules, pricing, discount and contract-term questions trigger an immediate stop: the agent sends nothing further on that topic and routes the full thread, fit score and summary to the named account owner.",
  },
  {
    q: "Do agents overwrite CRM edits?",
    a: "Never. Two-way CRM sync checks field state before writing. If a rep has manually edited a field, the rep's edit always wins and any conflict is flagged for review rather than overwritten.",
  },
  {
    q: "Which channels do the agents work on?",
    a: "Web forms, website live chat, email, SMS, WhatsApp and voice. Every channel writes to a single unified conversation history per lead or customer, so nobody has to repeat themselves.",
  },
  {
    q: "How is a pilot measured?",
    a: "Every pilot runs on a defined share of real leads, conversations or assets and is measured side-by-side against your existing process on time to first response, qualification rate, meetings held and CRM completeness.",
  },
  {
    q: "Where does video and sensor processing run?",
    a: "For Physical AI and Video AI, processing can run on site (edge servers / NVIDIA Jetson), in your private cloud, or hybrid—so raw camera feeds and plant telemetry never need to leave your site.",
  },
  {
    q: "Where can our security team find details?",
    a: "We share our full security pack—covering hosting regions, model data use, subprocessors, OWASP LLM testing and certifications—under NDA via our Security page.",
  },
];
