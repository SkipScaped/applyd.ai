import React, { useRef, useState } from "react";
import { useGsapPageChoreography } from "../components/MotionContext";
import {
  AgentsPipelineReplay,
  EvaluationMatrixGrid,
} from "../components/MotionSimulations";
import { BitmapSvgText, PixelIcon } from "../components/PixelGraphics";
import { AGENT_STAGES, CHANNELS_LIST, SECURITY_CONTROLS } from "../data/siteData";

const JORDAN_LEAD_STEPS = [
  {
    step: "01",
    time: "09:02",
    actor: "Agent" as const,
    channel: "Web form",
    title: "Enquiry captured and matched",
    detail: "Jordan Lee submitted a multi-site workflow enquiry. Agent deduplicated against shared inbox threads and enriched company domain and territory.",
    rule: "Rule: Capture & enrich all inbound leads",
  },
  {
    step: "02",
    time: "09:03",
    actor: "Agent" as const,
    channel: "Email",
    title: "First reply sent with approved fit questions",
    detail: "Sent within 60 seconds using approved template: acknowledged the operational brief and asked two fit questions (team size and current CRM).",
    rule: "Rule: Instant reply < 2 min",
  },
  {
    step: "03",
    time: "09:18",
    actor: "Agent" as const,
    channel: "Email",
    title: "Fit scored (86/100) from replies",
    detail: "Jordan confirmed 140 staff across 3 regional hubs and HubSpot CRM. Agent logged structured answers and matched territory owner.",
    rule: "Rule: Score ICP >= 70 → Eligible for rep slots",
  },
  {
    step: "04",
    time: "09:19",
    actor: "Agent" as const,
    channel: "Calendar",
    title: "Offered account owner's live slots",
    detail: "Checked rep's live diary boundaries and proposed three afternoon windows with timezone normalised.",
    rule: "Rule: Offer live open windows only",
  },
  {
    step: "05",
    time: "09:34",
    actor: "Person" as const,
    channel: "Email",
    title: "Jordan asked about volume discount & NDA",
    detail: "Matched written pricing & legal hand-off rule. Agent halted outbound replies immediately and routed the full thread to the named owner.",
    rule: "Fired: IF discount or NDA requested → Account owner",
  },
  {
    step: "06",
    time: "09:42",
    actor: "Person" as const,
    channel: "Email",
    title: "Account owner stepped in with brief",
    detail: "Rep read the pre-written call brief, replied directly on the pricing question, and attached the standard mutual NDA.",
    rule: "Logged: Owner response in 8 min",
  },
  {
    step: "07",
    time: "10:05",
    actor: "Outcome" as const,
    channel: "CRM Sync",
    title: "Thursday 15:00 confirmed on calendar",
    detail: "Meeting booked, calendar invites issued, and rep's manual deal-stage edit preserved without overwrite.",
    rule: "CRM Sync: Rep edit wins",
  },
  {
    step: "08",
    time: "10:06",
    actor: "Outcome" as const,
    channel: "Audit Log",
    title: "Full trace & source evidence closed",
    detail: "Complete audit record stored with every message version, score rationale, and rule trigger timestamp.",
    rule: "Verified: 100% CRM completeness",
  },
];

const WRITTEN_RULES_EXAMPLES = [
  {
    trigger: "Pricing, discounts or contract terms",
    owner: "Named account owner (fallback: Team lead)",
    action: "Agent stops immediately. Sends holding notice and attaches summary + open questions.",
  },
  {
    trigger: "Prospect asks for a person at any point",
    owner: "Territory rep / Front desk",
    action: "Halts sequence cleanly and opens live transfer or immediate notification.",
  },
  {
    trigger: "Clinical, legal or regulated advice requests",
    owner: "Qualified clinician / solicitor / adviser",
    action: "Refuses judgement and routes verbatim thread with intake checklist.",
  },
  {
    trigger: "Existing open opportunity in CRM",
    owner: "Current opportunity owner",
    action: "Appends inbound activity to existing deal; skips automated cold prospecting.",
  },
  {
    trigger: "Emergency or physical safety language",
    owner: "Shift supervisor / Duty safety contact",
    action: "Displays emergency instructions and triggers urgent alert.",
  },
];

export function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedStep, setSelectedStep] = useState(0);
  const [activeRollout, setActiveRollout] = useState(0);

  useGsapPageChoreography(containerRef, []);

  const rolloutPhases = [
    {
      num: "01",
      title: "Prepare",
      duration: "Week 1",
      items: [
        "Connect one CRM sandbox or read-only mirror and one inbound channel.",
        "Import approved message library, tone guide, and written hand-off rules.",
        "Assign named owners and fallback queues for every rule.",
      ],
    },
    {
      num: "02",
      title: "Prove before launch",
      duration: "Week 2",
      items: [
        "Replay historical threads and synthetic edge cases (pricing, hostility, prompt injection).",
        "Score replies side-by-side with your team and refine hand-off thresholds.",
        "Verify CRM field mapping and Confirm that rep edits always win conflicts.",
      ],
    },
    {
      num: "03",
      title: "Go live",
      duration: "Week 3+",
      items: [
        "Enable on a defined share of live inbound leads or one business unit.",
        "Compare time to first reply, qualification rate, meetings held, and CRM completeness.",
        "Expand channels or stages only after the first workflow passes review.",
      ],
    },
  ];

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section data-surface="sodium" data-pager="01 How it works" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-5">
            <p className="t-micro font-mono-tech">(How we work · Five agents, written rules)</p>
            <h1 className="t-h1" data-gsap-clip>
              Five agents work together, and people step in where you decide.
            </h1>
            <p className="t-body max-w-2xl">
              Every inbound conversation moves across five coordinated stages: capture, qualify, follow up, book and sync. Plain-English rules determine the exact moment an agent stops and hands over to a person.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#/demo?service=ai-agents" className="btn-swiss t-small">
                <span>Book a walkthrough</span>
                <PixelIcon name="arrow-right" size={13} />
              </a>
              <a href="#/pilot-fit" className="btn-swiss-outline t-small">
                Check pilot fit (6 questions)
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 border border-[var(--ink)] bg-[var(--paper)] p-5 space-y-3">
            <p className="font-mono-tech text-xs">CHANNELS COVERED</p>
            <div className="grid grid-cols-2 gap-2">
              {CHANNELS_LIST.map((ch) => (
                <div key={ch} className="border border-[var(--ink)] px-2.5 py-2 text-xs font-mono-tech bg-[var(--sodium)]/30">
                  {ch}
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--ink)]/80 pt-1">
              All six channels write into a single conversation history per lead or customer.
            </p>
          </div>
        </div>
      </section>

      {/* Five Stages Breakdown */}
      <section data-surface="ink" data-pager="02 Five Agents" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-grid gap-y-6 mb-10">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(Five stages)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-3">
            <h2 className="t-h2 text-[var(--paper)]" data-gsap-clip>
              One continuous loop from first form fill to synced CRM record.
            </h2>
          </div>
        </div>

        <div data-gsap-stagger-group className="swiss-container grid grid-cols-1 md:grid-cols-5 border border-[var(--sodium)]">
          {AGENT_STAGES.map((st, idx) => (
            <div
              key={st.id}
              data-gsap-stagger
              className={`p-5 flex flex-col justify-between gap-4 border-b md:border-b-0 ${
                idx < 4 ? "md:border-r" : ""
              } border-[var(--sodium)]`}
            >
              <div>
                <span className="font-mono-tech text-xs text-[var(--sodium)]">{st.num}</span>
                <h3 className="text-xl font-semibold text-[var(--paper)] mt-1">{st.name}</h3>
                <p className="text-sm text-[var(--paper)]/85 mt-2">{st.detail}</p>
              </div>
              <p className="font-mono-tech text-xs text-[var(--mint)] pt-3 border-t border-[var(--sodium)]/30">
                {st.meta}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Jordan Lee 8-Step Interactive Replay */}
      <section data-surface="paper" data-pager="03 8-Step Trace" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-grid gap-y-6 mb-10">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(Worked example · Jordan Lee)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-3">
            <h2 className="t-h2" data-gsap-clip>
              Trace one lead through all eight steps.
            </h2>
            <p className="t-body max-w-2xl">
              Step through the timeline below to inspect what the agent handles automatically, which rule triggers a human handover, and how CRM integrity is protected.
            </p>
          </div>
        </div>

        <div className="swiss-container grid grid-cols-1 lg:grid-cols-12 border border-[var(--ink)]">
          <div className="lg:col-span-7 divide-y divide-[var(--ink)] border-b lg:border-b-0 lg:border-r border-[var(--ink)]">
            {JORDAN_LEAD_STEPS.map((item, idx) => {
              const isSelected = selectedStep === idx;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setSelectedStep(idx)}
                  className={`w-full text-left p-4 flex items-start justify-between gap-4 transition-colors ${
                    isSelected ? "bg-[var(--ink)] text-[var(--sodium)]" : "bg-[var(--paper)] hover:bg-[var(--sodium)]/35"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono-tech text-xs pt-0.5">{item.step}</span>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{item.title}</p>
                      <p className={`text-xs font-mono-tech mt-0.5 ${isSelected ? "text-[var(--paper)]/80" : "text-[var(--ink)]/70"}`}>
                        {item.time} · {item.channel}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-mono-tech shrink-0 border border-current ${
                      item.actor === "Person"
                        ? "bg-[var(--coral)] text-[var(--ink)]"
                        : item.actor === "Outcome"
                        ? "bg-[var(--green)] text-[var(--ink)]"
                        : "bg-[var(--blue)] text-[var(--paper)]"
                    }`}
                  >
                    {item.actor}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5 p-6 bg-[var(--sodium)]/35 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--ink)] pb-3 font-mono-tech text-xs">
                <span>STEP {JORDAN_LEAD_STEPS[selectedStep].step} OF 08</span>
                <span>{JORDAN_LEAD_STEPS[selectedStep].time}</span>
              </div>
              <h3 className="t-lead font-semibold">{JORDAN_LEAD_STEPS[selectedStep].title}</h3>
              <p className="t-body">{JORDAN_LEAD_STEPS[selectedStep].detail}</p>
            </div>

            <div className="space-y-4">
              <div className="p-3 border border-[var(--ink)] bg-[var(--paper)] font-mono-tech text-xs">
                {JORDAN_LEAD_STEPS[selectedStep].rule}
              </div>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStep((s) => (s - 1 + JORDAN_LEAD_STEPS.length) % JORDAN_LEAD_STEPS.length)}
                  className="btn-swiss-outline text-xs min-h-[38px] px-3"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStep((s) => (s + 1) % JORDAN_LEAD_STEPS.length)}
                  className="btn-swiss btn-sm text-xs"
                >
                  <span>Next step →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #control Written Hand-off Rules */}
      <section id="control" data-surface="sodium" data-pager="04 Control & Rules" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-grid gap-y-6 mb-10">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(Control · #control)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-3">
            <h2 className="t-h2" data-gsap-clip>
              Written hand-off rules your managers control.
            </h2>
            <p className="t-body max-w-2xl">
              No hidden prompt heuristics. Each hand-off rule specifies the trigger, named human owner, holding message, and escalation timeout.
            </p>
          </div>
        </div>

        <div className="swiss-container border border-[var(--ink)] bg-[var(--paper)] divide-y divide-[var(--ink)]">
          {WRITTEN_RULES_EXAMPLES.map((rule) => (
            <div key={rule.trigger} className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
              <div className="md:col-span-4 font-semibold">{rule.trigger}</div>
              <div className="md:col-span-3 font-mono-tech text-xs md:text-sm text-[var(--blue)] font-semibold">
                → {rule.owner}
              </div>
              <div className="md:col-span-5 text-sm text-[var(--ink)]/85">{rule.action}</div>
            </div>
          ))}
        </div>

        <div className="swiss-container mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[var(--ink)] bg-[var(--paper)]">
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[var(--ink)]">
              {rolloutPhases.map((phase, idx) => (
                <button
                  key={phase.num}
                  type="button"
                  onClick={() => setActiveRollout(idx)}
                  className={`w-full text-left p-5 border-b last:border-b-0 border-[var(--ink)] flex items-center justify-between ${
                    activeRollout === idx ? "bg-[var(--ink)] text-[var(--sodium)]" : "hover:bg-[var(--sodium)]/35"
                  }`}
                >
                  <div>
                    <span className="font-mono-tech text-xs block">{phase.num} · {phase.duration}</span>
                    <span className="text-lg font-semibold">{phase.title}</span>
                  </div>
                  <PixelIcon name="arrow-right" size={12} />
                </button>
              ))}
            </div>
            <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between gap-5">
              <div>
                <p className="font-mono-tech text-xs">PILOT ROLLOUT PHASE {rolloutPhases[activeRollout].num}</p>
                <h3 className="t-h2 mt-2">{rolloutPhases[activeRollout].title}</h3>
                <ul className="mt-5 space-y-3">
                  {rolloutPhases[activeRollout].items.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-base">
                      <PixelIcon name="check" size={14} className="mt-1 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-[var(--ink)]/25 flex flex-wrap items-center justify-between gap-3">
                <a href="#/pilot-fit" className="btn-swiss btn-sm t-small">
                  <span>Test your pilot fit</span>
                </a>
                <a href="#/platform" className="u-anim text-sm font-semibold">
                  Explore Platform & CRM sync →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PlatformPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [crmScenario, setCrmScenario] = useState<"rep-wins" | "agent-draft">("rep-wins");
  const [chatStep, setChatStep] = useState(2);

  useGsapPageChoreography(containerRef, []);

  const chatTranscript = [
    { who: "Visitor", time: "14:11", msg: "Hi, we receive roughly 800 inbound leads/month across email and forms. How do you handle territory routing?" },
    { who: "Agent", time: "14:11", msg: "Every inbound lead is matched to domain and territory rules before replying. Replies go out in approved wording with live calendar booking." },
    { who: "Visitor", time: "14:12", msg: "Can we get a custom volume discount for 25 seats on annual billing?" },
    { who: "Person (Hand-off)", time: "14:12", msg: "Pricing & custom discount rule matched → Agent paused. Full transcript & 800/mo context routed to named Account Executive." },
  ];

  const metrics = [
    { label: "Time to first response", desc: "Measured median reply speed vs existing baseline." },
    { label: "Qualification rate", desc: "Share of inbound enquiries cleanly scored with fit answers." },
    { label: "Meetings held", desc: "Qualified meetings booked and attended per rep." },
    { label: "CRM completeness", desc: "Fields populated accurately without rep manual data entry." },
  ];

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Platform" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="space-y-5 max-w-4xl">
          <p className="t-micro font-mono-tech">(Platform architecture · Separate workspaces · Audit log)</p>
          <h1 className="t-h1" data-gsap-clip>
            One record per lead, two-way CRM sync, and complete workspace isolation.
          </h1>
          <p className="t-body max-w-2xl">
            Web forms, live chat, email, SMS, WhatsApp and voice all write to one conversation timeline. Manual rep edits in your CRM always take precedence over automated updates.
          </p>
        </div>
      </section>

      <section data-surface="ink" data-pager="02 Audit & Replay" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-container space-y-10">
          <div>
            <p className="t-micro font-mono-tech">(Northwind Freight · Live replay & 5-stage audit)</p>
            <h2 className="t-h2 text-[var(--paper)] mt-2" data-gsap-clip>
              Inspect the unified audit trail.
            </h2>
          </div>
          <AgentsPipelineReplay />
        </div>
      </section>

      {/* Two-way CRM Sync (Rep Edit Wins) + Scripted Chat Hand-off */}
      <section data-surface="paper" data-pager="03 CRM Sync & Chat" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 border border-[var(--ink)] bg-[var(--paper)] p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ink)] pb-3">
              <div>
                <p className="font-mono-tech text-xs">TWO-WAY CRM SYNC</p>
                <h3 className="t-lead font-semibold mt-1">Rep manual edits always win</h3>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setCrmScenario("rep-wins")}
                  aria-pressed={crmScenario === "rep-wins"}
                  className="chip-toggle text-xs font-mono-tech"
                >
                  Conflict: Rep edits
                </button>
                <button
                  type="button"
                  onClick={() => setCrmScenario("agent-draft")}
                  aria-pressed={crmScenario === "agent-draft"}
                  className="chip-toggle text-xs font-mono-tech"
                >
                  Normal write
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="border border-[var(--ink)] p-3 bg-[var(--sodium)]/25">
                <p className="font-mono-tech text-xs">CRM FIELD: DEAL OWNER / STAGE</p>
                <p className="font-semibold mt-1">
                  {crmScenario === "rep-wins"
                    ? "Rep manually updated Stage → 'Negotiation' and Owner → 'Alex Chen' at 10:12"
                    : "Agent proposed Stage → 'Qualified' with fit summary at 09:04"}
                </p>
              </div>
              <div className="border border-[var(--ink)] p-3">
                <p className="font-mono-tech text-xs">PLATFORM RESOLUTION</p>
                <p className="mt-1">
                  {crmScenario === "rep-wins"
                    ? "Sync engine detected newer human timestamp. Overwrite blocked automatically; rep's edit kept and conflict note logged."
                    : "No human conflict present. Field updated cleanly with trace ID and rule reference."}
                </p>
              </div>
            </div>
          </div>

          {/* 800 Leads/mo Chat Hand-off Simulator */}
          <div className="lg:col-span-6 border border-[var(--ink)] bg-[var(--sodium)] p-6 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between border-b border-[var(--ink)] pb-3">
              <div>
                <p className="font-mono-tech text-xs">SITE CHAT HAND-OFF REPLAY</p>
                <h3 className="t-lead font-semibold mt-1">800 leads/month routing example</h3>
              </div>
              <button
                type="button"
                onClick={() => setChatStep((s) => (s + 1) % chatTranscript.length)}
                className="btn-swiss btn-sm text-xs"
              >
                <span>Advance chat ({chatStep + 1}/4)</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {chatTranscript.slice(0, chatStep + 1).map((line, i) => (
                <div
                  key={i}
                  className={`p-3 border border-[var(--ink)] text-sm ${
                    line.who.startsWith("Person")
                      ? "bg-[var(--coral)] text-[var(--ink)]"
                      : line.who === "Agent"
                      ? "bg-[var(--paper)]"
                      : "bg-[var(--ink)] text-[var(--paper)]"
                  }`}
                >
                  <p className="font-mono-tech text-xs mb-1">
                    {line.time} · {line.who}
                  </p>
                  <p>{line.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Pilot Metrics & Matrix */}
        <div className="swiss-container mt-14 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, idx) => (
              <div key={m.label} className="border border-[var(--ink)] p-5 bg-[var(--paper)]">
                <p className="font-mono-tech text-xs">METRIC 0{idx + 1}</p>
                <h3 className="text-lg font-semibold mt-2">{m.label}</h3>
                <p className="text-sm text-[var(--ink)]/80 mt-2">{m.desc}</p>
              </div>
            ))}
          </div>
          <EvaluationMatrixGrid />
        </div>
      </section>
    </div>
  );
}

export function SecurityPage({ initialFocusRequest = false }: { initialFocusRequest?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGsapPageChoreography(containerRef, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      setError("Please enter a valid work email address.");
      return;
    }
    if (!company.trim()) {
      setError("Please enter your organisation name.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Security overview" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-5">
          <p className="t-micro font-mono-tech">(Security & governance · APPLYD AI LTD)</p>
          <h1 className="t-h1" data-gsap-clip>
            Logical workspace isolation, least-privilege credentials, and OWASP LLM testing.
          </h1>
          <p className="t-body max-w-2xl">
            Every enterprise engagement begins with plain-language technical answers. Our full security pack—covering hosting regions, model data terms, subprocessors, and penetration test summaries—is available under mutual NDA.
          </p>
        </div>
      </section>

      <section data-surface="paper" data-pager="02 Security Controls" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <h2 className="t-h2" data-gsap-clip>Controls built into every deployment.</h2>
            <p className="t-body">
              Both cloud agent workspaces and on-site industrial vision/sensor deployments enforce strict boundary separation.
            </p>
            <BitmapSvgText text="GUARD" cellH={5} fill="currentColor" bold />
          </div>
          <div className="lg:col-span-8 divide-y divide-[var(--ink)] border-y border-[var(--ink)]">
            {SECURITY_CONTROLS.map((ctrl) => (
              <div key={ctrl.title} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4 font-semibold">{ctrl.title}</div>
                <div className="sm:col-span-8 text-sm md:text-base">{ctrl.desc}</div>
              </div>
            ))}
            <div className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4 font-semibold">OWASP LLM adversarial suite</div>
              <div className="sm:col-span-8 text-sm md:text-base">
                Every release runs prompt-injection, indirect data leak, tool-abuse, and output-schema tests mapped to the OWASP Top 10 for LLM Applications.
              </div>
            </div>
            <div className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4 font-semibold">Foundation model training</div>
              <div className="sm:col-span-8 text-sm md:text-base">
                Customer conversations, documents, sensor telemetry, and camera footage are never used to train third-party public models.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="request"
        data-surface="ink"
        data-pager="03 Request NDA Pack"
        className="sec-pad border-t border-[var(--sodium)]"
      >
        <div className="swiss-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <p className="t-micro font-mono-tech">(NDA security pack)</p>
            <h2 className="t-h2 text-[var(--paper)]" data-gsap-clip>
              Request the full security documentation pack under NDA.
            </h2>
            <p className="t-body text-[var(--sodium)]">
              Includes data-flow diagrams, UK/EU hosting specifications, subprocessor register, DPIA template for Video AI, and OT passive architecture notes.
            </p>
            {initialFocusRequest && (
              <p className="font-mono-tech text-xs text-[var(--mint)]">
                Direct request panel ready below.
              </p>
            )}
          </div>

          <div className="lg:col-span-7 border border-[var(--sodium)] bg-[var(--paper)] text-[var(--ink)] p-6 md:p-8">
            {submitted ? (
              <div className="space-y-4">
                <p className="font-mono-tech text-xs text-[var(--green)] font-semibold">REQUEST LOGGED</p>
                <h3 className="t-h2">NDA security pack request received.</h3>
                <p className="t-body">
                  Thank you, {fullName}. We have logged your request for {company} ({workEmail}) and will issue the mutual NDA and security documentation pack within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName("");
                    setWorkEmail("");
                    setCompany("");
                    setNotes("");
                  }}
                  className="btn-swiss-outline text-xs"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="t-lead font-semibold pb-2 border-b border-[var(--ink)]">
                  Reviewer details
                </h3>
                {error && (
                  <p role="alert" className="p-3 bg-[var(--coral)] border border-[var(--ink)] text-sm font-semibold">
                    {error}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1">
                    <span className="text-xs font-mono-tech">FULL NAME *</span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Chen"
                      className="w-full min-h-[42px] px-3 border border-[var(--ink)] bg-[var(--paper)]"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-mono-tech">WORK EMAIL *</span>
                    <input
                      type="email"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full min-h-[42px] px-3 border border-[var(--ink)] bg-[var(--paper)]"
                    />
                  </label>
                </div>
                <label className="block space-y-1">
                  <span className="text-xs font-mono-tech">COMPANY / SITE *</span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Northwind Freight Ltd"
                    className="w-full min-h-[42px] px-3 border border-[var(--ink)] bg-[var(--paper)]"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs font-mono-tech">SPECIFIC REVIEWER QUESTIONS (OPTIONAL)</span>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Data residency region, subprocessor list, IEC 62443 conduit design..."
                    className="w-full p-3 border border-[var(--ink)] bg-[var(--paper)]"
                  />
                </label>
                <button type="submit" className="btn-swiss t-small">
                  <span>Request NDA security pack</span>
                  <PixelIcon name="arrow-right" size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
