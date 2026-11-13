export interface IndustryAgentSpec {
  slug: string;
  name: string;
  headline: string;
  shortDesc: string;
  channels: string[];
  firstActions: string[];
  rules: { area: string; owner: "Agent" | "Person" | "Approval"; detail: string }[];
  example: {
    person: string;
    context: string;
    outcome: string;
    steps: { time: string; actor: "Agent" | "Person" | "Outcome"; text: string }[];
  };
  faqs: { q: string; a: string }[];
}

export const INDUSTRY_AGENTS: IndustryAgentSpec[] = [
  {
    slug: "saas",
    name: "SaaS",
    headline: "Demo requests and trial follow-up for SaaS teams",
    shortDesc: "Demo requests go cold quickly, and stalled trial users rarely hear back.",
    channels: [
      "Website chat: answers from approved material and offers a demo when fit looks right.",
      "Demo request forms: replies in minutes with fit questions and calendar slots.",
      "Trial signups & usage: nudges stalled users based on unfinished setup steps.",
      "Email replies & in-app support: keeps every thread in one unified record.",
    ],
    firstActions: [
      "Reply to demo requests in minutes in approved wording.",
      "Check fit (team size, use case, timeline) against your scoring rules.",
      "Follow up stalled trial users who have not reached key activation steps.",
      "Book the demo directly on the right segment rep's calendar with summary.",
    ],
    rules: [
      { area: "Pricing, discounts & custom plans", owner: "Approval", detail: "Shares only published pricing; discounts and custom plans go to a rep." },
      { area: "Large & strategic accounts", owner: "Person", detail: "Passed immediately to a named rep with full history." },
      { area: "Security questionnaires & legal", owner: "Person", detail: "Routed to your security/legal owner; agent never makes compliance claims." },
      { area: "Competitor & roadmap promises", owner: "Approval", detail: "Approved wording only; no future feature promises." },
      { area: "Demo booking & trial nudges", owner: "Agent", detail: "Handled end to end in approved wording and logged to CRM." },
    ],
    example: {
      person: "Sofia Lindqvist · Mid-size agency",
      context: "Trial status: Day 5, stalled",
      outcome: "Demo booked (Thu 15:00)",
      steps: [
        { time: "09:30", actor: "Agent", text: "Noticed Sofia signed up Monday and hadn't configured her first workflow." },
        { time: "09:32", actor: "Agent", text: "Sent a concise nudge covering the unblocking step with an offer of help." },
        { time: "10:15", actor: "Person", text: "Sofia asked about pricing for 25 seats; hand-off rule routed directly to rep." },
        { time: "10:40", actor: "Outcome", text: "Demo booked for Thursday 15:00 with full trial usage history attached." },
      ],
    },
    faqs: [
      { q: "Will the agent talk about pricing?", a: "It shares only published pricing you provide. Discounts, custom plans, and negotiation go to a rep." },
      { q: "How does it decide who is a good fit?", a: "You set criteria like team size, use case, and timeline. Strong fits route straight to a rep." },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial services",
    headline: "Client onboarding and document chasing for financial firms",
    shortDesc: "Onboarding stalls on missing ID, proof of address, and bank statements.",
    channels: [
      "Email with secure upload links so sensitive files never sit in an inbox.",
      "Client portal checklist verification with automated missing-item prompts.",
      "Website onboarding forms with drop-off follow-up.",
      "WhatsApp, SMS & missed-call summaries linked to the onboarding file.",
    ],
    firstActions: [
      "Send a clear onboarding checklist in approved wording.",
      "Chase missing ID, proof of address, and statements on your schedule.",
      "Match incoming uploads to the checklist without judging compliance pass/fail.",
      "Hand over a complete file to an adviser or onboarding officer.",
    ],
    rules: [
      { area: "Investment, tax & product advice", owner: "Person", detail: "Passed to a qualified adviser; agent never recommends products." },
      { area: "Identity & AML decisions", owner: "Approval", detail: "Compliance team decides pass/fail; agent only checks completeness." },
      { area: "Vulnerable or distressed clients", owner: "Person", detail: "Passed to a person at once under your policy." },
      { area: "Complaints", owner: "Person", detail: "Sent to your complaints process with full history attached." },
      { area: "Checklist updates & reminders", owner: "Agent", detail: "Sent within approved schedule and wording, logged on file." },
    ],
    example: {
      person: "Morgan Ellis · Example Capital Partners",
      context: "Documents received 4/5 · Chasing one statement",
      outcome: "File complete · Compliance review started",
      steps: [
        { time: "Mon 09:00", actor: "Agent", text: "Emailed the 5-item checklist with a secure upload link." },
        { time: "Mon 15:40", actor: "Agent", text: "Matched passport, proof of address, and 2 statements to checklist." },
        { time: "Wed 09:00", actor: "Agent", text: "Reminded Morgan which bank statement dates were still needed." },
        { time: "Wed 11:15", actor: "Person", text: "Morgan asked which account suited a new business; adviser replied." },
        { time: "Thu 10:05", actor: "Outcome", text: "Final statement received; onboarding officer began checks." },
      ],
    },
    faqs: [
      { q: "Does the agent give financial advice?", a: "No. Any request for advice passes immediately to a qualified adviser with history attached." },
      { q: "Does it decide whether identity checks pass?", a: "No. It checks whether files are present on the checklist; compliance makes every judgement." },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    headline: "Quote intake and claim reporting for insurers and brokers",
    shortDesc: "Claims come in at night and incomplete web quote forms get abandoned.",
    channels: [
      "24/7 phone intake for out-of-hours First Notice of Loss (FNOL).",
      "Web quote forms with follow-up on missing underwriting facts.",
      "Email & photos: damage photos attach directly to the claim file.",
      "WhatsApp, chat & broker referrals tracked with source attribution.",
    ],
    firstActions: [
      "Log structured FNOL (what happened, when, where, injuries) immediately.",
      "Collect complete quote facts and chase missing items.",
      "Share approved emergency safety instructions without discussing cover.",
      "Route completed claim or quote files to handlers or underwriters.",
    ],
    rules: [
      { area: "Cover opinions & claim outcomes", owner: "Person", detail: "Passed to a handler; agent never states whether a claim is covered." },
      { area: "Injury, emergency or danger", owner: "Person", detail: "Directs caller to emergency services and alerts a named person at once." },
      { area: "Settlement offers & fault", owner: "Person", detail: "Left to claims handlers; never discusses liability or amounts." },
      { area: "Suspected fraud signals", owner: "Approval", detail: "Quietly flagged for review without accusing or changing tone." },
      { area: "Quote intake & loss reports", owner: "Agent", detail: "Collected in approved wording with photos attached." },
    ],
    example: {
      person: "Priya Nair · Homeowner",
      context: "02:10 burst pipe FNOL",
      outcome: "Assessor visit booked at 08:50",
      steps: [
        { time: "02:10", actor: "Agent", text: "Logged loss details and confirmed nobody was hurt." },
        { time: "02:14", actor: "Agent", text: "Shared approved safety steps: shut off water, avoid electrics, take photos." },
        { time: "02:18", actor: "Agent", text: "Attached policy number, address, and emailed photos to claim record." },
        { time: "08:30", actor: "Person", text: "Handler called Priya when she asked whether burst pipe damage is paid." },
        { time: "08:50", actor: "Outcome", text: "Loss assessor scheduled for the following morning." },
      ],
    },
    faqs: [
      { q: "Will it say whether customers are covered?", a: "No. Questions on cover, fault, or payment always route to a handler." },
      { q: "What if someone is in danger?", a: "It directs them to emergency services immediately and alerts a named contact." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Patient booking and reminders for clinics",
    shortDesc: "Empty slots and missed appointments; clinical questions must reach a clinician.",
    channels: [
      "Front-desk phone calls for booking, moving, or cancelling visits.",
      "Online booking requests checked live against the real clinician diary.",
      "SMS & WhatsApp 24-hour reminders with one-reply reschedule.",
      "Recall lists and email enquiries unified in one patient booking log.",
    ],
    firstActions: [
      "Book, reschedule, and cancel against real clinician calendars.",
      "Send visit reminders to cut missed appointments.",
      "Refill cancelled slots automatically from the clinic waiting list.",
      "Capture practical appointment preferences while leaving symptoms to clinicians.",
    ],
    rules: [
      { area: "Clinical advice & symptoms", owner: "Person", detail: "Passed to a clinician; agent never diagnoses or assesses severity." },
      { area: "Urgent or emergency wording", owner: "Person", detail: "Clinical lead triggers (e.g. chest pain) halt booking and alert staff at once." },
      { area: "Medication, results & referrals", owner: "Person", detail: "Handed directly to the clinical team." },
      { area: "Patient identity checks", owner: "Approval", detail: "Practice verification rules satisfied before sharing any personal info." },
      { area: "Booking, rescheduling & reminders", owner: "Agent", detail: "Executed on diary within rules with every change logged." },
    ],
    example: {
      person: "Casey Morgan · Example Dental Practice",
      context: "Check-up booked, reminder due",
      outcome: "Rescheduled & attended Fri 14:00",
      steps: [
        { time: "10:12", actor: "Agent", text: "Offered 3 slots by phone and booked Thu 09:30 with hygienist." },
        { time: "Wed 09:30", actor: "Agent", text: "Sent 24h SMS reminder; Casey replied Thursday no longer worked." },
        { time: "Wed 09:34", actor: "Agent", text: "Rebooked Fri 14:00 and offered freed Thu slot to waiting list." },
        { time: "Wed 09:40", actor: "Person", text: "Casey asked about a sore tooth; front desk flagged note to dentist." },
        { time: "Fri 14:00", actor: "Outcome", text: "Patient attended and dentist checked the sore tooth." },
      ],
    },
    faqs: [
      { q: "Does the agent give medical advice?", a: "No. Symptoms, results, and medication questions route immediately to a clinician." },
      { q: "How does it refill cancellations?", a: "Freed slots can be offered automatically to patients on your waiting list." },
    ],
  },
  {
    slug: "telecom",
    name: "Telecom",
    headline: "Coverage checks and customer retention for telecom",
    shortDesc: "Coverage questions and cancellation requests in the first minute.",
    channels: [
      "Website live chat for speed, coverage, and cancel intent detection.",
      "Phone calls with postcode coverage checks and instant retention transfer.",
      "Coverage-checker drop-off follow-up.",
      "WhatsApp, SMS, email & web forms in one customer thread.",
    ],
    firstActions: [
      "Check broadband and mobile coverage by postcode in approved wording.",
      "Spot cancel, port-out, or switch requests immediately.",
      "Ask one structured question on leaving reason (price, speed, outage).",
      "Hand over customer, plan, and reason to retention for an offer.",
    ],
    rules: [
      { area: "Retention offers & discounts", owner: "Approval", detail: "Only retention staff offer deals; agent never hints at discounts." },
      { area: "Contract terms & exit fees", owner: "Person", detail: "Left to team; agent never calculates early termination fees." },
      { area: "Outages & service faults", owner: "Person", detail: "Shares approved status only and passes faults to support." },
      { area: "Vulnerable customers & complaints", owner: "Person", detail: "Passed at once to a named person under provider policy." },
      { area: "Coverage checks & plan FAQs", owner: "Agent", detail: "Answered accurately from live coverage and plan data." },
    ],
    example: {
      person: "Marcus Bell · Broadband customer",
      context: "Cancellation request on live chat (price rise)",
      outcome: "Customer retained on new plan",
      steps: [
        { time: "14:06", actor: "Agent", text: "Detected cancel intent when Marcus cited the recent price rise." },
        { time: "14:07", actor: "Agent", text: "Confirmed reason and attached current plan and tenure." },
        { time: "14:09", actor: "Person", text: "Retention adviser took over immediately when Marcus asked what he could save." },
        { time: "14:21", actor: "Outcome", text: "Marcus moved to a tailored plan and stayed." },
      ],
    },
    faqs: [
      { q: "Will the agent offer retention discounts?", a: "No. It collects the reason and passes to your retention team immediately." },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    headline: "Freight quote requests and shipment status for hauliers",
    shortDesc: "Loose quote emails missing weight or collection dates, and where-is-my-load queries.",
    channels: [
      "Quote request emails parsed for collection, delivery, weight & pallets.",
      "Web quote forms with instant chase for missing dimensions.",
      "Shipment status emails & messages checked against tracking.",
      "Phone, voicemail, WhatsApp & driver portal updates.",
    ],
    firstActions: [
      "Capture complete lane, weight, pallets, and access notes into one brief.",
      "Follow up missing load details before handing to the pricing desk.",
      "Answer routine shipment status queries directly from tracking.",
      "Flag dangerous goods, oversize, or temperature-controlled jobs immediately.",
    ],
    rules: [
      { area: "Rates, surcharges & contract pricing", owner: "Approval", detail: "Only pricing desk quotes; agent never estimates rates." },
      { area: "Dangerous goods & oversize", owner: "Person", detail: "Passed immediately to specialist planners." },
      { area: "Delays, damage & claims", owner: "Person", detail: "Routed to named owner; never accepts liability." },
      { area: "Urgent same-day jobs", owner: "Person", detail: "Flagged to the duty planner immediately." },
      { area: "Brief capture & status answers", owner: "Agent", detail: "Handled end to end and logged against shipment." },
    ],
    example: {
      person: "Daniel Okafor · Furniture importer",
      context: "Pallet quote Felixstowe to Leeds",
      outcome: "Costed quote sent 10:20",
      steps: [
        { time: "09:12", actor: "Agent", text: "Extracted 8 pallets; flagged missing weight and collection date." },
        { time: "09:15", actor: "Agent", text: "Asked for gaps; Daniel replied with 3.2 tonnes and Tuesday pickup." },
        { time: "10:00", actor: "Person", text: "Pricing desk costed the complete lane brief." },
        { time: "10:20", actor: "Outcome", text: "Costed freight quote sent by email." },
      ],
    },
    faqs: [
      { q: "Will it quote freight rates?", a: "No. Pricing stays with your desk; the agent ensures every brief arrives complete." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    headline: "Viewing booking and buyer or tenant qualifying",
    shortDesc: "Evening portal enquiries and wasted viewings.",
    channels: [
      "Property portal enquiries answered 24/7 with live listing availability.",
      "WhatsApp conversations kept in a single branch thread.",
      "Website forms & owner valuation requests routed to branch leads.",
      "Phone & email missed-call follow-up.",
    ],
    firstActions: [
      "Confirm property availability before offering slots.",
      "Qualify buyers (property to sell, mortgage in principle, move date).",
      "Qualify tenants (household size, pets, budget, move date).",
      "Book negotiator calendar slots with reminders.",
    ],
    rules: [
      { area: "Offers & negotiation", owner: "Person", detail: "Passed immediately to a negotiator; never relays or accepts offers." },
      { area: "Referencing & right-to-rent", owner: "Person", detail: "Agent notes checks needed; team conducts verification." },
      { area: "Mortgage & financial advice", owner: "Person", detail: "Records buyer status only; gives no affordability advice." },
      { area: "Fees, deposits & contract terms", owner: "Approval", detail: "Pre-approved terms only." },
      { area: "Qualifying & viewing booking", owner: "Agent", detail: "Completed on negotiator calendar with reminder." },
    ],
    example: {
      person: "Omar Haddad · Buyer",
      context: "21:14 portal enquiry",
      outcome: "Viewing booked Saturday 11:00",
      steps: [
        { time: "21:14", actor: "Agent", text: "Replied to portal enquiry and confirmed listing availability." },
        { time: "21:17", actor: "Agent", text: "Verified mortgage in principle, house under offer, 3-month timeline." },
        { time: "08:50", actor: "Person", text: "Negotiator stepped in when Omar asked about submitting a lower offer." },
        { time: "09:05", actor: "Outcome", text: "Saturday 11:00 viewing confirmed with negotiator attending." },
      ],
    },
    faqs: [
      { q: "Will it handle offers or negotiation?", a: "No. Offers pass straight to a negotiator with the qualifying history attached." },
    ],
  },
  {
    slug: "retail",
    name: "Retail and e-commerce",
    headline: "Order support and product questions for online shops",
    shortDesc: "Order and product questions, where slow replies lose sales.",
    channels: [
      "WhatsApp order lookups & product Q&A.",
      "Website live chat for sizing, stock & delivery.",
      "Instagram direct messages linked to catalogue stock.",
      "Email order/returns queries & product-page threads.",
    ],
    firstActions: [
      "Answer where-is-my-order from live courier tracking.",
      "Start in-policy returns and issue labels automatically.",
      "Answer sizing, material, and compatibility questions from catalogue.",
      "Suggest matching items with approved links.",
    ],
    rules: [
      { area: "Refunds outside returns policy", owner: "Approval", detail: "Passed to team; agent never promises exceptions." },
      { area: "Damaged, faulty or missing items", owner: "Person", detail: "Collects photos and order ID, then person decides replacement." },
      { area: "Discounts, price match & trade", owner: "Approval", detail: "Only approved promo codes shared." },
      { area: "Complaints & chargebacks", owner: "Person", detail: "Routed at once to a named person." },
      { area: "Order tracking & in-policy returns", owner: "Agent", detail: "Resolved automatically from order system." },
    ],
    example: {
      person: "Priya Nair · Online shopper",
      context: "Order #4821 status + matching sofa cover",
      outcome: "Second item added at approved bundle price",
      steps: [
        { time: "18:42", actor: "Agent", text: "Confirmed Order #4821 is with courier for Thursday delivery." },
        { time: "18:45", actor: "Agent", text: "Confirmed matching cover compatibility from product catalogue." },
        { time: "18:52", actor: "Person", text: "Team approved bundle discount when Priya asked for bundle pricing." },
        { time: "19:05", actor: "Outcome", text: "Cover added to Order #4821." },
      ],
    },
    faqs: [
      { q: "How does it handle damaged items?", a: "It gathers order ID and damage photos, then hands the decision to your support team." },
    ],
  },
  {
    slug: "travel-hospitality",
    name: "Travel and hospitality",
    headline: "Group and event booking requests turned into proposals",
    shortDesc: "Long group enquiries with missing facts that delay proposals.",
    channels: [
      "Group & event enquiry emails.",
      "Web enquiry forms & corporate travel block requests.",
      "Phone/voicemail & WhatsApp group threads.",
    ],
    firstActions: [
      "Extract dates, headcount, rooms, meeting space, and budget from long emails.",
      "Ask only for missing details without repeating answered questions.",
      "Check real room and function diary availability.",
      "Deliver a clean proposal brief to the sales manager.",
    ],
    rules: [
      { area: "Rates, discounts & packages", owner: "Approval", detail: "Only sales manager sets rates; never quotes figures." },
      { area: "Contracts, deposits & cancellation", owner: "Person", detail: "Left to sales team; never confirms bookings." },
      { area: "Dietary & accessibility requests", owner: "Person", detail: "Recorded verbatim and passed to events team." },
      { area: "Post-booking changes & complaints", owner: "Person", detail: "Passed at once to a named owner." },
      { area: "Brief gathering & diary checks", owner: "Agent", detail: "Handled automatically before manager pricing." },
    ],
    example: {
      person: "Helen Fraser · Corporate events team",
      context: "40-delegate 2-day conference brief",
      outcome: "Proposal sent same afternoon",
      steps: [
        { time: "11:20", actor: "Agent", text: "Parsed March dates, 40 delegates, meeting room, and lunch need." },
        { time: "11:24", actor: "Agent", text: "Asked for bedroom split, budget, and dietary needs." },
        { time: "11:50", actor: "Agent", text: "Checked diary: confirmed conference suite and 22 bedrooms free." },
        { time: "14:30", actor: "Person", text: "Sales manager priced the tailored package." },
        { time: "15:05", actor: "Outcome", text: "Complete proposal emailed to Helen." },
      ],
    },
    faqs: [
      { q: "Will the agent quote group rates?", a: "No. It completes the brief and checks diary availability so your manager can price immediately." },
    ],
  },
  {
    slug: "wealth-management",
    name: "Wealth management",
    headline: "Prospect qualifying and client reviews for wealth managers",
    shortDesc: "Referrals needing personal replies and annual review meetings that slip.",
    channels: [
      "Client & professional (accountant/solicitor) referral emails.",
      "Adviser inbox triage & review invitations.",
      "Website enquiries & missed-call summaries.",
    ],
    firstActions: [
      "Acknowledge referrals promptly with source attribution intact.",
      "Ask light, approved qualifying questions without collecting sensitive figures.",
      "Schedule annual client review meetings directly on adviser calendars.",
      "Prepare an adviser call brief before every meeting.",
    ],
    rules: [
      { area: "Investment & pension advice", owner: "Person", detail: "Passed to a qualified adviser; never comments on markets." },
      { area: "Transfers, tax & suitability", owner: "Person", detail: "Noted and handed to qualified adviser." },
      { area: "Fees & bespoke terms", owner: "Approval", detail: "Approved fee schedule only." },
      { area: "Bereavement or financial difficulty", owner: "Person", detail: "Passed immediately to a named person." },
      { area: "Qualifying & review scheduling", owner: "Agent", detail: "Executed in approved tone on adviser calendar." },
    ],
    example: {
      person: "Jamal Okafor · Referred prospect",
      context: "Existing client introduction",
      outcome: "Discovery call Thu 15:00 + referrer thanked",
      steps: [
        { time: "09:20", actor: "Agent", text: "Acknowledged introduction, thanked referrer, offered call." },
        { time: "09:45", actor: "Agent", text: "Noted 5-year retirement horizon with no sensitive figures asked." },
        { time: "10:05", actor: "Person", text: "Adviser answered pension transfer question directly." },
        { time: "10:30", actor: "Agent", text: "Booked Thursday 15:00 with brief attached." },
      ],
    },
    faqs: [
      { q: "Does it give investment advice?", a: "Never. Suitability, markets, and transfers go strictly to a qualified adviser." },
    ],
  },
  {
    slug: "health-insurance",
    name: "Health insurance",
    headline: "Member answers and scheme quotes for health insurers",
    shortDesc: "Member questions about cover and HR employer scheme quote briefs.",
    channels: [
      "Web quote request forms from HR managers & brokers.",
      "Broker & HR renewal emails.",
      "Member portal & live chat.",
      "Phone & voicemail summaries.",
    ],
    firstActions: [
      "Collect complete employer scheme brief (headcount, sites, renewal date, census).",
      "Answer routine plan navigation & waiting-period questions from approved copy.",
      "Route claims vs quotes vs complaints cleanly.",
      "Chase missing census files with secure upload links.",
    ],
    rules: [
      { area: "Cover & eligibility decisions", owner: "Person", detail: "Never states whether a specific treatment or condition is covered." },
      { area: "Claims & pre-authorisation", owner: "Person", detail: "Sent to claims with history." },
      { area: "Medical details & pre-existing", owner: "Person", detail: "Halts chat and routes to trained person immediately." },
      { area: "Pricing & underwriting", owner: "Approval", detail: "Bespoke underwriting stays with underwriters." },
      { area: "Quote intake & member FAQs", owner: "Agent", detail: "Logged and answered from approved wording." },
    ],
    example: {
      person: "Jordan Ellis · Brightwater Logistics",
      context: "85-staff employer scheme quote (6/7 brief)",
      outcome: "Census received; underwriter quoting",
      steps: [
        { time: "11:02", actor: "Agent", text: "Read 85 headcount across 2 sites; flagged missing current insurer." },
        { time: "11:04", actor: "Agent", text: "Sent secure upload link for staff census file." },
        { time: "11:20", actor: "Agent", text: "Answered waiting-period question from approved guide." },
        { time: "11:25", actor: "Person", text: "Handed underwriting pre-existing condition query to quote handler." },
      ],
    },
    faqs: [
      { q: "What if someone shares medical details?", a: "Chat stops collecting health details and moves the person to trained staff immediately." },
    ],
  },
  {
    slug: "life-sciences",
    name: "Life sciences",
    headline: "Sample and distributor requests for life sciences companies",
    shortDesc: "Requests from many countries and trade-show leads that need the right territory rep.",
    channels: [
      "Web sample, datasheet & distributor forms.",
      "Trade-show badge scan lists.",
      "Distributor & laboratory email triage.",
      "Phone, LinkedIn & partner referrals.",
    ],
    firstActions: [
      "Capture product line, organisation, country, and intended use.",
      "Route by territory and product line to the exact rep or distributor.",
      "Follow up trade-show contacts while warm.",
      "Track sample approval status without making medical claims.",
    ],
    rules: [
      { area: "Medical, clinical & safety", owner: "Person", detail: "Passed to medical/safety team; never advises on dosage or adverse events." },
      { area: "Product claims & off-label use", owner: "Person", detail: "Approved claims word-for-word only." },
      { area: "Sample & export approvals", owner: "Approval", detail: "Human sign-off required before any sample ships." },
      { area: "Distributor pricing & terms", owner: "Approval", detail: "Commercial lead approves bespoke terms." },
      { area: "Intake & territory routing", owner: "Agent", detail: "Handled in approved wording and routed by country." },
    ],
    example: {
      person: "Dr Priya Nair · Example Diagnostics Lab",
      context: "Trade-show badge scan · Nordics territory",
      outcome: "Sample approved after export check",
      steps: [
        { time: "Mon 08:00", actor: "Agent", text: "Imported show list, matched Swedish lab, sent follow-up." },
        { time: "Mon 10:30", actor: "Agent", text: "Captured assay kit distribution volume and country." },
        { time: "Mon 10:35", actor: "Agent", text: "Routed record to Nordics territory rep." },
        { time: "Tue 09:10", actor: "Person", text: "Rep escalated local market registration question to regulatory." },
      ],
    },
    faqs: [
      { q: "Does it talk about off-label use?", a: "No. Clinical, safety, and off-label queries route directly to medical affairs." },
    ],
  },
  {
    slug: "education",
    name: "Education",
    headline: "Open days, applications and enrolment for schools and universities",
    shortDesc: "Many applicant and parent questions, where slow replies send people elsewhere.",
    channels: [
      "WhatsApp & live chat for courses, dates, and fees.",
      "Admissions email & open-day registration forms.",
      "Unfinished application portal nudges & phone summaries.",
    ],
    firstActions: [
      "Book open days with reminders and easy rescheduling.",
      "Nudge incomplete applications before deadlines.",
      "Answer published fee, date, and entry requirement FAQs.",
      "Hand warm applicants to admissions officers with full thread.",
    ],
    rules: [
      { area: "Admission decisions & offers", owner: "Person", detail: "Staff only; never predicts whether an applicant gets a place." },
      { area: "Safeguarding concerns", owner: "Person", detail: "Passed at once to the designated safeguarding lead." },
      { area: "Applicants under 18", owner: "Approval", detail: "Follows institution parent/guardian policy strictly." },
      { area: "Fees, funding & visas", owner: "Approval", detail: "Published figures only; individual visa cases go to staff." },
      { area: "Open days & deadline nudges", owner: "Agent", detail: "Booked and logged on schedule." },
    ],
    example: {
      person: "Aisha Khan · Prospective postgraduate",
      context: "MSc WhatsApp enquiry → Open day → Offer",
      outcome: "Offer accepted Jan 15",
      steps: [
        { time: "Sep 02", actor: "Agent", text: "Booked Aisha onto 14 Oct open day via WhatsApp." },
        { time: "Nov 20", actor: "Agent", text: "Nudged half-finished application listing missing reference." },
        { time: "Dec 03", actor: "Person", text: "Routed student visa question to international office." },
        { time: "Jan 15", actor: "Outcome", text: "Offer accepted and joined induction list." },
      ],
    },
    faqs: [
      { q: "What about safeguarding or under-18 applicants?", a: "Safeguarding triggers route immediately to the DSL; under-18 rules follow your guardian policy." },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    headline: "Law firm client intake and conflict checks",
    shortDesc: "Intake that uses fee-earner time, with conflict checks needing the right names.",
    channels: [
      "Web enquiry forms & matter intake emails.",
      "Professional referrals with source tracking.",
      "Out-of-hours replies & missed-call summaries.",
    ],
    firstActions: [
      "Gather practice area, key dates, and brief context without case advice.",
      "Collect full party and organisation names for conflict checks.",
      "Route by practice area (employment, property, family) to right fee earner.",
      "Book consultations on the fee earner's calendar.",
    ],
    rules: [
      { area: "Legal advice & case assessment", owner: "Person", detail: "Passed to solicitor; never assesses merits or rights." },
      { area: "Urgent / court / limitation deadlines", owner: "Person", detail: "Flagged immediately to a named person." },
      { area: "Safeguarding, abuse & distress", owner: "Person", detail: "Stops agent flow and routes under firm policy." },
      { area: "Fees, quotes & engagement", owner: "Approval", detail: "Approved fee info only; bespoke matters go to solicitor." },
      { area: "Intake & consultation booking", owner: "Agent", detail: "Collected cleanly and booked on calendar." },
    ],
    example: {
      person: "Taylor Reed · Employment intake",
      context: "Web enquiry with 3 conflict names",
      outcome: "Conflicts cleared; Monday 12:00 consultation",
      steps: [
        { time: "Step 01", actor: "Agent", text: "Logged practice area, key dates, and employer name." },
        { time: "Step 02", actor: "Agent", text: "Collected manager and HR contact names for conflict check." },
        { time: "Step 03", actor: "Person", text: "Solicitor took strength-of-claim question under advice rule." },
        { time: "Step 04", actor: "Outcome", text: "Conflicts clerk cleared 3 names; consultation booked Monday 12:00." },
      ],
    },
    faqs: [
      { q: "Can it run conflict checks?", a: "It collects all party and organisation names accurately; your compliance/conflicts team makes the clearance decision." },
    ],
  },
  {
    slug: "automotive-dealers",
    name: "Car and van dealers",
    headline: "Test drives, part-exchange details and servicing for dealers",
    shortDesc: "Buyers contacting several dealers, where the first test-drive offer wins.",
    channels: [
      "Car marketplace leads matched against live forecourt stock.",
      "Showroom phone & missed-call callbacks.",
      "Dealer web chat, service/MOT booking & WhatsApp.",
    ],
    firstActions: [
      "Confirm the vehicle is still on the forecourt from stock feed.",
      "Book test drives on branch calendar with documents-to-bring reminder.",
      "Collect part-exchange registration, mileage, and condition notes.",
      "Book service and MOT slots into workshop calendar.",
    ],
    rules: [
      { area: "Part-exchange valuations & discounts", owner: "Person", detail: "Passed to used car manager; never estimates trade-in value." },
      { area: "Finance quotes & credit", owner: "Person", detail: "Authorised staff only; never quotes monthly payments." },
      { area: "Complaints & vehicle faults", owner: "Person", detail: "Passed immediately to a named person." },
      { area: "Workshop repair diagnosis", owner: "Person", detail: "Books slot only; service team diagnoses." },
      { area: "Test drive & MOT booking", owner: "Agent", detail: "Confirmed on branch/workshop calendar." },
    ],
    example: {
      person: "Chris Dean · Private buyer",
      context: "20:18 marketplace enquiry + part-exchange",
      outcome: "Test drive Sat 10:30 with valuation ready",
      steps: [
        { time: "20:18", actor: "Agent", text: "Confirmed car was still in stock on the forecourt." },
        { time: "20:21", actor: "Agent", text: "Captured Chris's part-exchange reg, mileage, and condition." },
        { time: "08:15", actor: "Person", text: "Used car manager valued the trade-in next morning." },
        { time: "08:40", actor: "Outcome", text: "Test drive confirmed for Saturday 10:30." },
      ],
    },
    faqs: [
      { q: "How does it avoid offering sold cars?", a: "It reads your live stock feed and CRM before offering any vehicle or slot." },
    ],
  },
  {
    slug: "home-services",
    name: "Home services and installers",
    headline: "Site survey booking and job details for installers",
    shortDesc: "Solar, heat pump, HVAC and roofing quotes that need photos and property details.",
    channels: [
      "Phone calls followed by instant WhatsApp photo requests.",
      "WhatsApp photo intake (boiler, meter, roof, garden wall).",
      "Website quote forms & comparison-site leads.",
    ],
    firstActions: [
      "Gather property type, roof/boiler age, current system, and bills.",
      "Request and verify clarity of site photos before surveyor dispatch.",
      "Book site surveys by postcode area on surveyor calendars.",
      "Route finance questions to authorised staff.",
    ],
    rules: [
      { area: "Quotes & price changes", owner: "Approval", detail: "Team sets all figures; agent never estimates cost." },
      { area: "Finance & payment plans", owner: "Person", detail: "Passed to authorised staff; never discusses APR or eligibility." },
      { area: "Gas smells, leaks, sparks (safety)", owner: "Person", detail: "Halts quote flow, shows safety message, alerts named person." },
      { area: "Grants, warranties & guarantees", owner: "Person", detail: "Left to your team." },
      { area: "Photo collection & survey booking", owner: "Agent", detail: "Completed by agent so surveyors arrive prepared." },
    ],
    example: {
      person: "Anita Verma · Homeowner",
      context: "Air-source heat pump enquiry",
      outcome: "3 photos verified · Survey booked Thu 14:00",
      steps: [
        { time: "10:02", actor: "Agent", text: "Answered call, logged address, boiler model, and heat pump interest." },
        { time: "10:05", actor: "Agent", text: "Sent WhatsApp request for boiler, meter, and garden wall photos." },
        { time: "12:40", actor: "Person", text: "Surveyor reviewed photos and asked for one extra cylinder shot." },
        { time: "13:10", actor: "Outcome", text: "Thursday 14:00 site survey booked with access notes." },
      ],
    },
    faqs: [
      { q: "How are safety issues like gas smells handled?", a: "Immediate stop: shares your approved emergency safety notice and alerts a named person." },
    ],
  },
];

export interface AIServicePageSpec {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  accent: string;
  offerings: { title: string; desc: string }[];
  pipelinePhases: { phase: string; steps: string[] }[];
  safetyControls: { title: string; badge: string; desc: string }[];
  tools: { category: string; items: string }[];
  faqs: string[];
}

export const AI_SERVICE_PAGES: AIServicePageSpec[] = [
  {
    slug: "agent-development",
    name: "AI agent development",
    headline: "AI agents that finish tasks, and stop for a person",
    summary: "We build agents that plan, use your systems and check their work, inside budgets and permissions you set.",
    accent: "#2370E8",
    offerings: [
      { title: "Task agents", desc: "One bounded job, such as triaging a ticket, drafting a reply, or pulling fields from a document." },
      { title: "Multi-agent workflows", desc: "Several agents, each owning a step, with clear hand-overs and a person at key points." },
      { title: "Tool access", desc: "Agents call your APIs and databases using least-privilege credentials, never an admin key." },
      { title: "Approval steps", desc: "Customer emails, record changes, or spending wait for a person, with evidence attached." },
      { title: "Evaluation and tracing", desc: "A test set of realistic tasks scored on every change, plus a full trace of every run." },
      { title: "Cost and step limits", desc: "Hard budgets on steps, execution time, and spend per task." },
    ],
    pipelinePhases: [
      { phase: "Agent loop", steps: ["01 Trigger", "02 Load context", "03 Plan", "04 Call a tool", "05 Observe", "06 Approve", "07 Complete"] },
      { phase: "Guardrails", steps: ["08 Scoped permissions", "09 Budgets", "10 Policy checks", "11 Checkpoints"] },
      { phase: "Evaluate & improve", steps: ["12 Task suite", "13 Trajectory checks", "14 Observe in production", "15 Widen autonomy"] },
    ],
    safetyControls: [
      { title: "Approval on risky actions", badge: "Person", desc: "Anything customer-facing, financial, or irreversible waits for a named person." },
      { title: "Evaluation before release", badge: "Tested", desc: "Changes ship only after passing the task evaluation suite." },
      { title: "Injection & leak testing", badge: "Screened", desc: "Behaviour is tested when untrusted inputs try to redirect the agent." },
      { title: "Switch-off and rollback", badge: "Logged", desc: "Agents can be paused at any time and runs traced and reversed." },
    ],
    tools: [
      { category: "Models", items: "Claude, GPT, Gemini, Llama, Mistral" },
      { category: "Agent frameworks", items: "LangGraph, LangChain, AutoGen, CrewAI, Claude Agent SDK, OpenAI Agents SDK" },
      { category: "Retrieval", items: "pgvector, Qdrant, Weaviate, Pinecone" },
      { category: "Evaluation & tracing", items: "Braintrust, LangSmith, Arize Phoenix, OpenTelemetry" },
      { category: "Runtime", items: "Python, TypeScript, Temporal, Docker" },
    ],
    faqs: [
      "How is an agent different from a chatbot?",
      "How do you reduce wrong or unsafe actions?",
      "How is cost kept in check?",
      "Which model do you use?",
      "Can the agent work with our existing systems?",
    ],
  },
  {
    slug: "video-ai",
    name: "Video AI & vision agents",
    headline: "Vision agents for your cameras, with people in charge",
    summary: "Watches existing RTSP and ONVIF camera feeds, describes events in plain language, and alerts the person who can act.",
    accent: "#2BA676",
    offerings: [
      { title: "Safety and PPE checks", desc: "Hi-vis, hard hats, safety glasses and gloves checked in required zones with a still frame." },
      { title: "Zones and perimeters", desc: "Restricted areas, line crossings and out-of-hours presence routed to shift leads." },
      { title: "Task and SOP verification", desc: "Lock-out steps, changing routes or pallet wrapping verified with clip evidence." },
      { title: "Line and quality monitoring", desc: "Stoppages, jams and visible defects flagged, asking operators for the stoppage reason." },
      { title: "Equipment state & idle time", desc: "Track running, idle or waiting states directly from visual station cues." },
      { title: "Searchable video history", desc: "Plain-language queries return matching clips and summaries kept for your set retention." },
    ],
    pipelinePhases: [
      { phase: "Connect & detect", steps: ["RTSP / ONVIF camera ingest", "Object & pose detection", "Zone & time-window rules"] },
      { phase: "Explain & route", steps: ["Vision-language explanation", "Teams / Slack / SMS / Email alert", "Named person review"] },
      { phase: "Privacy controls", steps: ["On-site or private cloud", "Face blurring & masking", "Per-camera retention & DPIA"] },
    ],
    safetyControls: [
      { title: "Video stays on your site", badge: "Local", desc: "Processing runs on NVIDIA Jetson, edge servers or private cloud; raw video never goes to applyd.ai." },
      { title: "Blurring & retention", badge: "UK GDPR", desc: "Faces can be blurred in stored clips and deleted after your configured retention window." },
      { title: "Alerts only, never automated action", badge: "Person", desc: "The agent raises alerts; a named person reviews before any follow-up." },
      { title: "DPIA & worker consultation", badge: "Policy", desc: "We support signage, DPIA documentation and representative consultation." },
    ],
    tools: [
      { category: "Cameras", items: "RTSP and ONVIF IP cameras, existing CCTV and NVRs" },
      { category: "Models", items: "Object detection, pose estimation, vision-language models" },
      { category: "Hardware", items: "NVIDIA Jetson, edge servers, private cloud" },
      { category: "Outputs", items: "Live dashboard, Teams, Slack, SMS, email, webhooks, MES, CMMS" },
    ],
    faqs: [
      "Do we need new cameras?",
      "Where does our video go?",
      "Does it identify or track individual workers?",
      "Does it take action by itself?",
      "Is this allowed under UK GDPR?",
    ],
  },
  {
    slug: "physical-ai",
    name: "Physical AI",
    headline: "Equipment sensor intelligence that spots when behaviour changes",
    summary: "Analyses vibration, current, temperature, pressure and flow together against load-aware baselines to detect developing faults.",
    accent: "#D873B3",
    offerings: [
      { title: "Rotating equipment", desc: "Pumps, compressors, motors and fans monitored via vibration, electrical and thermal signals." },
      { title: "Heat-transfer systems", desc: "Heat exchangers and cooling systems relating thermal efficiency to flow, pressure drop and load." },
      { title: "Process equipment", desc: "Instrumented vessels and lines assessed against expected multi-signal relationships." },
      { title: "Supporting utilities", desc: "Control valves, HVAC chillers, air compressors and steam systems." },
    ],
    pipelinePhases: [
      { phase: "01 Define", steps: ["Select one asset", "Verify sensor coverage & history", "Agree load-aware baseline"] },
      { phase: "02 Evaluate", steps: ["Multi-signal correlation", "Validate against past faults", "Tune alert thresholds"] },
      { phase: "03 Integrate", steps: ["Dashboard & CMMS observations", "Email / Slack / Push alerts", "Maintenance engineer review"] },
    ],
    safetyControls: [
      { title: "Pattern over single threshold", badge: "Multi-signal", desc: "Single readings can look normal while relationships between flow, pressure and current drift." },
      { title: "Evidence attached", badge: "Explainable", desc: "Every flag shows observed vs baseline curves and possible developing causes." },
      { title: "Asset-by-asset rollout", badge: "Scoped", desc: "Validated with your reliability engineers on one asset before scaling." },
      { title: "On-site, cloud or hybrid", badge: "Flexible", desc: "Deploy inside your OT/IT boundary or private cloud." },
    ],
    tools: [
      { category: "Signals", items: "Vibration (mm/s), motor current (A), bearing temp (°C), suction/discharge pressure (bar), flow (m³/h)" },
      { category: "Deployment", items: "Edge gateways, on-premise servers, private cloud, hybrid" },
      { category: "Notifications", items: "Dashboard, Email, Slack, Push, CMMS work-order draft" },
    ],
    faqs: [
      "Does it say what is wrong or just flag thresholds?",
      "What sensor history is needed to start?",
      "Can it run completely on site?",
    ],
  },
  {
    slug: "ot-cybersecurity",
    name: "OT cybersecurity",
    headline: "Understand, strengthen and prepare your control networks",
    summary: "Passive asset visibility, remote vendor access review, and network segmentation structured around IEC 62443, NIST SP 800-82 and NCSC CAF.",
    accent: "#A98BF7",
    offerings: [
      { title: "Passive asset inventory", desc: "Non-intrusive discovery of PLCs, HMIs, switches and gateways without disturbing live plant." },
      { title: "Remote & vendor access review", desc: "Map every external and contractor pathway into process zones." },
      { title: "Segmentation & conduits", desc: "Structure zones and conduits around IEC 62443 to isolate monitoring from control." },
      { title: "Incident readiness", desc: "Prioritise findings by operational impact and align backup and change-window plans." },
    ],
    pipelinePhases: [
      { phase: "01 Understand", steps: ["Passive asset inventory", "Data-flow mapping (OT/IT/External)", "Identify critical control assets"] },
      { phase: "02 Strengthen", steps: ["Vendor & remote access audit", "Zone/conduit segmentation plan", "Configuration exposure review"] },
      { phase: "03 Recognise & Prepare", steps: ["Monitor unexpected sessions", "Schedule changes in maintenance windows", "Backup & restoration readiness"] },
    ],
    safetyControls: [
      { title: "Passive discovery first", badge: "Non-intrusive", desc: "Zero active scanning that could trip legacy controllers." },
      { title: "Maintenance-window changes", badge: "Change control", desc: "Any network adjustment is planned under formal change control with vendors." },
      { title: "Recognised OT standards", badge: "Aligned", desc: "IEC 62443, NIST SP 800-82 Rev. 3, NIST CSF 2.0, UK NCSC CAF, MITRE ATT&CK for ICS." },
    ],
    tools: [
      { category: "Standards", items: "IEC 62443, NIST SP 800-82 Rev. 3, NIST CSF 2.0, UK NCSC CAF, ISO/IEC 27001" },
      { category: "Threat intel", items: "MITRE ATT&CK for ICS" },
    ],
    faqs: [
      "Will passive discovery disrupt running PLCs or HMIs?",
      "Does working to IEC 62443 certify our site?",
      "How does OT security connect with Video AI and Physical AI?",
    ],
  },
  {
    slug: "generative-ai",
    name: "Generative AI development",
    headline: "Generative AI built into your product, checked before it ships",
    summary: "Drafts, summaries and documents built from your own facts and style schemas, with automated drift checks and an editor in charge.",
    accent: "#FF5A5A",
    offerings: [
      { title: "Drafting & summaries", desc: "First drafts and concise summaries grounded in existing CRM or product records." },
      { title: "Document generation", desc: "Reports and proposals assembled from templates while fixed legal clauses stay locked." },
      { title: "Image generation & editing", desc: "Visual assets within style references, resizing workflows and content filters." },
      { title: "Reading images & audio", desc: "Extract structured data from photos, scanned forms, and call transcripts." },
      { title: "Review queues", desc: "Human approval screens with source citations and full diff/change history." },
      { title: "Brand voice & schemas", desc: "Tone guides, banned phrases and JSON/Zod schemas ensure clean outputs." },
    ],
    pipelinePhases: [
      { phase: "Set up", steps: ["01 Brand & fact pack", "02 Templates & schemas", "03 Curated examples", "04 Per-task model choice"] },
      { phase: "Generation run", steps: ["05 Structured brief", "06 Ground in facts", "07 Generate", "08 Automated drift checks", "09 Editor review", "10 Publish"] },
      { phase: "Learn", steps: ["11 Capture editor diffs", "12 Update rules & examples", "13 Measure edit rate"] },
    ],
    safetyControls: [
      { title: "Facts from your records", badge: "Grounded", desc: "Numbers, SKUs and dates are injected from source data, not recalled from memory." },
      { title: "Banned claims & drift checks", badge: "Checked", desc: "Automated checks flag numerical drift (e.g. 230 g vs 260 g) before editors see it." },
      { title: "Editor approval", badge: "Person", desc: "Costly or public outputs require human sign-off." },
      { title: "Provenance metadata", badge: "Logged", desc: "Every published item retains its sources, checks and approver." },
    ],
    tools: [
      { category: "Text models", items: "Claude, GPT, Gemini, Llama, Mistral" },
      { category: "Image & speech", items: "Imagen, Stable Diffusion, FLUX, Whisper" },
      { category: "Structure", items: "JSON Schema, Zod, Pydantic, Instructor" },
      { category: "Quality & review", items: "Promptfoo, Braintrust, LangSmith" },
    ],
    faqs: [
      "How do you stop the model making things up?",
      "Who owns the prompts and generated content?",
      "Is our data used to train public models?",
    ],
  },
  {
    slug: "llm-integration",
    name: "LLM integration & RAG",
    headline: "Language models on your systems, answering from your documents",
    summary: "Cited answers retrieved from your own documents and databases, enforcing document-level permissions at query time.",
    accent: "#2370E8",
    offerings: [
      { title: "Production API integration", desc: "Model calls wired into CRMs and help desks with timeouts, retries and fallbacks." },
      { title: "Synced RAG pipelines", desc: "Answers stay current as files update, always linking back to exact source passages." },
      { title: "Hybrid search & reranking", desc: "Structure-aware chunking combining keyword BM25, vector search and cross-encoder reranking." },
      { title: "Document-level ACLs", desc: "Users only retrieve answers from documents they are already permitted to read." },
      { title: "Private model hosting", desc: "Run inside Azure OpenAI, AWS Bedrock, Vertex AI, vLLM or Ollama." },
    ],
    pipelinePhases: [
      { phase: "Indexing", steps: ["Connect sources", "Parse & clean", "Structure-aware chunking", "Embed & store with ACL metadata"] },
      { phase: "Answering", steps: ["Query rewrite", "Hybrid search + rerank", "Cited generation", "Groundedness check (refuse if unsupported)"] },
      { phase: "Evaluate", steps: ["Golden Q&A test set", "Regression score per release", "Latency & faithfulness tracing"] },
    ],
    safetyControls: [
      { title: "Cited passages only", badge: "Grounded", desc: "Refuses or hands to a person when source documents do not cover the question." },
      { title: "Query-time permissions", badge: "ACL", desc: "Enforces existing identity and folder permissions on every retrieval." },
      { title: "Private endpoints", badge: "Isolated", desc: "Zero training on your documents; private VPC options." },
    ],
    tools: [
      { category: "Hosting", items: "Azure OpenAI, AWS Bedrock, Vertex AI, vLLM, Ollama" },
      { category: "Retrieval", items: "pgvector, Pinecone, Weaviate, Qdrant, OpenSearch" },
      { category: "Pipelines & Eval", items: "LlamaIndex, LangChain, Unstructured, Ragas, Promptfoo, Langfuse" },
    ],
    faqs: [
      "Can we run RAG without calling a public model API?",
      "How do you enforce document-level visibility?",
      "Do we need fine-tuning?",
    ],
  },
  {
    slug: "chatbots",
    name: "AI chatbot development",
    headline: "Assistants that answer from your content, and know when to hand over",
    summary: "Customer and internal staff chat grounded in approved sources, transferring smoothly to a person with full transcript and context.",
    accent: "#2BA676",
    offerings: [
      { title: "Customer service assistants", desc: "Answer order, account and policy queries with direct links to help articles." },
      { title: "Internal knowledge assistants", desc: "Staff search policies and wikis in plain language within their access scope." },
      { title: "Seamless human hand-over", desc: "Transfers transcript, customer record and attempted steps straight to help desk." },
      { title: "Multi-channel & multilingual", desc: "Website widget, WhatsApp, Teams, Slack and voice sharing one rule set." },
    ],
    pipelinePhases: [
      { phase: "Conversation", steps: ["Input guard (PII mask / injection block)", "Intent & auth lookup", "Sourced draft", "Output policy guard"] },
      { phase: "Hand-over", steps: ["Detect trigger (refund, complaint, request)", "Summarise thread", "Transfer to Zendesk / Intercom / CRM"] },
      { phase: "Improve", steps: ["Review escalations", "Fix source doc gaps", "Track resolution by topic"] },
    ],
    safetyControls: [
      { title: "Approved content only", badge: "Sourced", desc: "Says plainly when it does not know rather than guessing." },
      { title: "Input & output guards", badge: "Filtered", desc: "Masks PII and blocks prompt-injection attempts." },
      { title: "Instant human transfer", badge: "Person", desc: "Refunds, complaints and direct requests escalate immediately." },
    ],
    tools: [
      { category: "Channels", items: "Web widget, WhatsApp Business, Microsoft Teams, Slack" },
      { category: "Help desk & CRM", items: "Zendesk, Intercom, Freshdesk, HubSpot, Salesforce" },
      { category: "Voice", items: "Whisper, Deepgram, ElevenLabs, Twilio Voice" },
    ],
    faqs: [
      "How do you stop it making things up?",
      "Can it connect to Zendesk, Intercom or HubSpot?",
    ],
  },
  {
    slug: "consulting",
    name: "AI consulting",
    headline: "AI consulting that ends in a decision",
    summary: "Use-case selection, data readiness, build-vs-buy comparison, cost modelling and governance roadmaps—whoever builds it.",
    accent: "#A98BF7",
    offerings: [
      { title: "Use-case selection", desc: "Workshop-led shortlist scored transparently on value, feasibility, data and risk." },
      { title: "Data readiness", desc: "Audit where data lives, ownership, quality and legal basis for use." },
      { title: "Build, buy or fine-tune", desc: "Objective comparison of off-the-shelf tools, RAG, agents or fine-tuning." },
      { title: "Cost modelling & PoC", desc: "Run-cost projections at real volumes plus a thin-slice PoC judged against a pre-set pass mark." },
    ],
    pipelinePhases: [
      { phase: "Assess", steps: ["Discovery workshops", "Value/risk scoring", "Data readiness audit", "DPIA & risk register"] },
      { phase: "Prove", steps: ["Measure baseline", "Thin-slice prototype", "Evaluate vs pass mark", "Pilot & Go/No-go"] },
      { phase: "Scale & govern", steps: ["Phased roadmap", "Operating model & ownership", "NIST AI RMF / ISO 42001 governance"] },
    ],
    safetyControls: [
      { title: "Reasons written down", badge: "Transparent", desc: "Includes ideas we explicitly advise against building." },
      { title: "Pass mark agreed first", badge: "Measured", desc: "Success metrics are locked before a single line of code is written." },
      { title: "Vendor-neutral", badge: "Independent", desc: "Plans can be delivered by your internal team or any supplier." },
    ],
    tools: [
      { category: "Governance", items: "NIST AI RMF, ISO/IEC 42001, EU AI Act risk tiers, UK GDPR DPIA" },
      { category: "Data & Eval", items: "Snowflake, Databricks, BigQuery, PostgreSQL, Promptfoo, Ragas" },
    ],
    faqs: [
      "Should we fine-tune a model or use RAG?",
      "Will you recommend that we hire you to build it?",
    ],
  },
];

export const INDUSTRIAL_SECTORS = [
  {
    slug: "oil-gas",
    name: "Oil & gas",
    headline: "Process areas in view. Pumps and compressors understood.",
    summary: "Restricted process areas and rotating equipment monitored via existing cameras, multi-sensor analysis and OT asset visibility.",
    videoEvents: [
      "Entry into a designated process area",
      "Activity near equipment outside an agreed schedule",
      "Presence in an enclosure that should be clear",
    ],
    sensorInputs: "Vibration, current, temperature, suction and discharge pressure",
    assets: "Process pumps, compressors, motors, heat exchangers",
    firstProject: "One rotating-equipment train or one designated process area covered by installed cameras — never the whole site at once.",
    accent: "#D873B3",
  },
  {
    slug: "chemical-plants",
    name: "Chemical plants",
    headline: "Zones watched. Heat-transfer performance understood.",
    summary: "Detect entry into production zones and spot developing heat-exchanger fouling by comparing flow, temperature and pressure drop together.",
    videoEvents: [
      "Entry into a restricted production zone",
      "Activity near designated reactors during defined operating periods",
      "Area occupancy against an agreed safety limit",
    ],
    sensorInputs: "Inlet/outlet temperature, cooling flow rate, pressure drop",
    assets: "Heat exchangers (HX-204), process pumps, agitator motors, cooling fans",
    firstProject: "One heat exchanger with its pumps, or one production zone seen by an existing camera.",
    accent: "#A98BF7",
  },
  {
    slug: "pharmaceuticals",
    name: "Pharmaceuticals",
    headline: "Controlled areas in view. Utilities understood.",
    summary: "Monitor utility equipment (HVAC motors, chillers, compressors) and keep equipment rooms and walkways clear. Explicitly non-GMP monitoring support.",
    videoEvents: [
      "Entry into an equipment room or utility area",
      "Obstructions in a walkway or emergency access route",
      "Activity in a selected area outside scheduled hours",
    ],
    sensorInputs: "Vibration, motor current, temperature, pressure, flow",
    assets: "HVAC motors, utility pumps, air compressors, chillers",
    firstProject: "One utility asset or one equipment access route away from validated production systems.",
    accent: "#2BA676",
  },
  {
    slug: "power-generation",
    name: "Power generation",
    headline: "Plant areas in view. Rotating equipment understood.",
    summary: "Keep work at height and outage zones in view while reading cooling-fan and feedwater-pump behaviour against live operating load.",
    videoEvents: [
      "Entry into a restricted equipment or switchgear zone",
      "Work at height during planned maintenance outages",
      "Movement in a monitored hall outside scheduled periods",
    ],
    sensorInputs: "Vibration, bearing temperature, motor current, speed, pressure, load",
    assets: "Cooling fans, feedwater pumps, auxiliary motors, heat exchangers",
    firstProject: "One cooling fan, feedwater pump or one restricted maintenance area with load-aware baselines.",
    accent: "#FF5A5A",
  },
];

export const VIDEO_AI_SECTORS = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    headline: "Vision agents for the factory floor, with your team in charge",
    watchesFor: ["PPE near machines (glasses, hi-vis, gloves)", "Machine guards open while running", "Line stoppages > 5 min (asks operator reason)", "Forklift & pedestrian near-misses", "Lock-out & SOP step checks", "Visible surface defects"],
    shiftLog: [
      { time: "06:05", camera: "Press 2 cell", event: "Guard door open while running", target: "Cell supervisor" },
      { time: "06:50", camera: "Packing bay", event: "No safety glasses in marked zone", target: "Shift lead" },
      { time: "09:12", camera: "Line 3", event: "Line stopped for 5 minutes — asked operator", target: "Line 3 operator" },
      { time: "09:15", camera: "Line 3", event: "Operator logged: Planned changeover", target: "Downtime log" },
      { time: "13:40", camera: "Aisle 4", event: "Forklift and pedestrian inside safe margin", target: "Safety lead" },
      { time: "14:00", camera: "All lines", event: "Safety lead reviewed day's clips", target: "Audit closed" },
    ],
  },
  {
    slug: "warehousing-logistics",
    name: "Warehousing & logistics",
    headline: "Vision agents for warehouses and yards, with supervisors in charge",
    watchesFor: ["Forklift & pedestrian lane separation", "Blocked fire exits and aisles", "Dock door open with no trailer", "Pallet & vehicle gate counts", "After-hours yard arrivals", "Stacking height & pallet wrapping"],
    shiftLog: [
      { time: "05:50", camera: "Gate 1", event: "Vehicle arrived before opening hours", target: "Gate supervisor" },
      { time: "08:20", camera: "Aisle 7", event: "Pedestrian in vehicle-only lane (near-miss)", target: "Shift supervisor" },
      { time: "10:35", camera: "Dock 4", event: "Door open with no trailer — queried dock lead", target: "Dock lead" },
      { time: "14:10", camera: "Bay C", event: "Fire exit obstructed by pallet", target: "Shift supervisor" },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    headline: "Vision agents for construction sites, with site managers in charge",
    watchesFor: ["Hard hats & hi-vis in active zones", "Open trench & lifting exclusion zones", "Excavators & dumpers near workers", "Out-of-hours site entry", "Gate delivery logs", "Time-stamped progress snapshots"],
    shiftLog: [
      { time: "06:40", camera: "Main gate", event: "Delivery vehicle before site opening", target: "Site manager" },
      { time: "08:15", camera: "Level 2", event: "Person in active zone without hard hat", target: "Area supervisor" },
      { time: "10:30", camera: "Trench A", event: "Entry inside open excavation exclusion zone", target: "Supervisor & H&S" },
      { time: "22:15", camera: "Compound", event: "Movement after hours", target: "On-call contact" },
    ],
  },
  {
    slug: "energy",
    name: "Energy, oil & gas",
    headline: "Vision agents for energy sites, with operators in charge",
    watchesFor: ["PPE in hazardous zones", "Permit-to-work exclusion zones", "Analogue gauge & status-light reading", "Visible staining, pooling or vapour", "Unmanned remote compound entry", "Lifting movements near personnel"],
    shiftLog: [
      { time: "06:10", camera: "Pump area", event: "Person without hard hat", target: "Area operator" },
      { time: "09:30", camera: "Tank farm", event: "Entry with no active zone permit on record", target: "Control room" },
      { time: "11:00", camera: "Compressor skid", event: "Pressure dial outside normal range", target: "Area operator" },
      { time: "15:45", camera: "Wellhead 2", event: "Dark patch at base — requested visual check", target: "On-call technician" },
    ],
  },
  {
    slug: "food-processing",
    name: "Food processing",
    headline: "Vision agents for food production, with your quality team in charge",
    watchesFor: ["Low-care to high-care hygiene route checks", "Hairnets, beard snoods & coats", "Hand-wash & sanitation step verification", "Changeover cleaning order", "Foreign object & stopped belt alerts", "Chiller & cold-store door open duration"],
    shiftLog: [
      { time: "05:55", camera: "High-care door", event: "Changing step skipped on entry", target: "Hygiene supervisor" },
      { time: "07:20", camera: "Line 2 packing", event: "Worker missing hairnet", target: "Line lead" },
      { time: "11:40", camera: "Line 2 belt", event: "Unmatched object on belt — operator check", target: "Line 2 operator" },
      { time: "14:30", camera: "Chiller 1", event: "Door open > 6 minutes", target: "Shift lead" },
    ],
  },
  {
    slug: "security-perimeter",
    name: "Security & perimeter",
    headline: "Vision agents for site security, with your security team in charge",
    watchesFor: ["Perimeter fence crossings", "After-hours door & gate movement", "Loitering & tailgating", "Doors & gates propped open", "Vehicles in fire lanes", "Searchable incident clip history"],
    shiftLog: [
      { time: "21:45", camera: "Rear gate", event: "Vehicle after hours — verified marked delivery van", target: "Control room" },
      { time: "23:10", camera: "Fence line B", event: "Person crossing perimeter", target: "On-call security" },
      { time: "02:30", camera: "Loading yard", event: "12-minute loitering vs 5-minute threshold", target: "Control room" },
      { time: "04:55", camera: "Side door", event: "Door held open after hours", target: "Site contact" },
    ],
  },
];

export const RESOURCES_ARTICLES = [
  {
    slug: "speed-to-lead",
    title: "Speed to lead: why the first reply decides the deal",
    date: "5 November 2026",
    readTime: "4 min read",
    summary: "Explains why a lead is warmest in the minutes after they ask, what 'fast' means in practice, and where a person still needs to step in.",
    sections: [
      {
        heading: "1. What the first reply does",
        body: "A new lead is at its warmest in the minutes after they ask. An immediate, specific reply arrives while the buyer remembers their exact question, sets the benchmark later suppliers are compared against, and shows an organised operation.",
      },
      {
        heading: "2. Why leads go cold",
        body: "Leads cool because attention moves on—not because the buyer changed their mind. Ordinary bottlenecks (shared inboxes, reps in meetings, evenings and weekends) create silence that kills momentum.",
      },
      {
        heading: "3. What 'fast' should mean",
        body: "A generic auto-responder reads as a brush-off. A strong first reply: (1) acknowledges the specific question asked, (2) asks one or two qualifying questions that decide the next step, (3) offers a concrete next step such as calendar times, and (4) makes reaching a person effortless.",
      },
      {
        heading: "4. Where agents help and where they stop",
        body: "Agents reply immediately, ask your qualifying questions, and log answers to CRM. They stop on pricing, discounts, contract terms, and sensitive topics so reps enter the conversation with context rather than starting from zero.",
      },
    ],
  },
  {
    slug: "handoff-rules",
    title: "How to write hand-off rules for AI agents",
    date: "5 November 2026",
    readTime: "4 min read",
    summary: "An agent is only as safe as the rules that say when it stops. A practical structure with a copyable rule template.",
    sections: [
      {
        heading: "The five parts of a complete rule",
        body: "Every hand-off rule needs five plain-English elements owned by sales/service leadership: (1) Trigger (what the agent detects), (2) Owner (who takes over + fallback), (3) What is passed on (summary + answers + commitments), (4) What the agent says meanwhile (honest holding message without guessing), and (5) Escalation limit (timeout alert so nothing dead-ends).",
      },
      {
        heading: "Copyable hand-off template",
        body: "WHEN: the lead asks about pricing, discounts or contract terms.\nHAND TO: the account owner; if unavailable, the team lead.\nPASS ON: conversation summary, lead's answers, and open questions.\nAGENT SAYS: that a colleague will pick this up and when to expect a reply.\nESCALATE IF: no human reply within the team's SLA window.",
      },
      {
        heading: "Common mistakes that make rules fail",
        body: "Avoid vague goal-based triggers ('hand off if it seems important'), queues with no named owner, static rules never updated as pricing changes, or launching with 50 rules instead of the 5–6 that actually protect revenue and compliance.",
      },
    ],
  },
  {
    slug: "evaluating-ai-sdr-vendors",
    title: "Evaluating AI SDR vendors: questions your security team will ask",
    date: "5 November 2026",
    readTime: "4 min read",
    summary: "A 7-group checklist for sales leaders, reps, and security reviewers evaluating any AI agent platform.",
    sections: [
      {
        heading: "1. Data, access & tenant isolation",
        body: "Ask which systems the agent connects to, whether onboarding starts read-only, how customer workspaces are isolated, whether vendor staff access is logged, and how data is deleted on exit.",
      },
      {
        heading: "2. Hosting, models & subprocessors",
        body: "Verify hosting regions, which models are used, contractual guarantees that your lead data never trains foundation models, full subprocessor list, and auditable certifications.",
      },
      {
        heading: "3. Controls, CRM conflict rules & testing",
        body: "Confirm you write and edit hand-off rules directly, reps' manual CRM edits always win conflicts, every action has an audit trace, and prompt-injection/regression tests (OWASP Top 10 for LLM Apps) gate every release.",
      },
    ],
  },
];
