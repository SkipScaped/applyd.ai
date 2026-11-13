import React, { useEffect, useRef, useState } from "react";
import { useGsapPageChoreography } from "../components/MotionContext";
import { PixelIcon } from "../components/PixelGraphics";
import { RESOURCES_ARTICLES } from "../data/industryAndServiceDetails";
import { COMPANY, FAQS } from "../data/siteData";

const PILOT_QUESTIONS = [
  {
    id: "volume",
    q: "01. Monthly inbound enquiries, claims, bookings or monitored assets",
    opts: ["Under 100 / mo", "100 – 500 / mo", "500 – 2,000+ / mo"],
  },
  {
    id: "channel",
    q: "02. Where do your slowest or highest-drop-off queries land?",
    opts: ["Web forms & shared inbox", "SMS / WhatsApp / Phone", "Plant cameras or equipment sensors"],
  },
  {
    id: "crm",
    q: "03. System of record",
    opts: ["HubSpot / Salesforce", "Industry diary / DMS / Claims", "SCADA / Historian / CMMS"],
  },
  {
    id: "rules",
    q: "04. Primary human handover boundary",
    opts: ["Pricing, discounts & contracts", "Clinical / legal / safety advice", "Maintenance work orders & OT changes"],
  },
  {
    id: "deploy",
    q: "05. Data & network requirement",
    opts: ["Cloud isolated workspace", "Private VPC / EU or UK resident", "On-site edge processing"],
  },
  {
    id: "timeline",
    q: "06. Target pilot horizon",
    opts: ["Within 30 days", "This quarter", "Scoping next quarter"],
  },
];

export function PilotFitPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useGsapPageChoreography(containerRef, []);

  const answered = Object.keys(answers).length;
  const isIndustrial =
    answers.channel === "Plant cameras or equipment sensors" ||
    answers.deploy === "On-site edge processing" ||
    answers.crm === "SCADA / Historian / CMMS";

  const summaryParam = encodeURIComponent(
    isIndustrial ? "physical-ai" : "ai-agents"
  );

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Pilot Fit Check" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-4">
          <p className="t-micro font-mono-tech">(Pilot fit check · 6 questions · No email required)</p>
          <h1 className="t-h1" data-gsap-clip>
            See where a focused pilot starts for your team.
          </h1>
          <p className="t-body max-w-2xl">
            Answer six operational questions below to see recommended starting stages, written hand-off rules, and deployment posture before booking a call.
          </p>
        </div>
      </section>

      <section data-surface="paper" data-pager="02 Diagnostic" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--ink)] pb-3 font-mono-tech text-xs">
              <span>PROGRESS</span>
              <span>{answered} OF {PILOT_QUESTIONS.length} ANSWERED</span>
            </div>
            {PILOT_QUESTIONS.map((item) => (
              <div key={item.id} className="border border-[var(--ink)] p-4 space-y-3">
                <p className="font-semibold text-base">{item.q}</p>
                <div className="flex flex-wrap gap-2">
                  {item.opts.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswers((p) => ({ ...p, [item.id]: opt }))}
                      aria-pressed={answers[item.id] === opt}
                      className={`chip-toggle text-xs font-mono-tech ${
                        answers[item.id] === opt ? "font-semibold" : ""
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 border border-[var(--ink)] bg-[var(--sodium)] p-6 space-y-5 sticky top-[88px]">
            <div className="border-b border-[var(--ink)] pb-3 flex items-center justify-between font-mono-tech text-xs">
              <span>PILOT RECOMMENDATION</span>
              <span>{answered}/6</span>
            </div>

            {answered === 0 ? (
              <p className="t-body">
                Select any option on the left to tailor your recommended pilot scope, starting rules, and metrics.
              </p>
            ) : (
              <div className="space-y-4">
                <h2 className="t-lead font-semibold">
                  {isIndustrial
                    ? "Start with one asset or one camera zone (On-site / Hybrid)"
                    : "Start with Capture, Qualify & CRM Sync on one inbound queue"}
                </h2>
                <div className="p-3 border border-[var(--ink)] bg-[var(--paper)] text-sm space-y-2">
                  <p className="font-mono-tech text-xs font-semibold">RECOMMENDED BOUNDARIES</p>
                  <p>
                    • Human gate: <strong>{answers.rules || "Pricing, regulated queries & overrides"}</strong>
                  </p>
                  <p>
                    • Environment: <strong>{answers.deploy || "Isolated workspace / Private VPC"}</strong>
                  </p>
                  <p>
                    • Integration: <strong>{answers.crm || "Read-only first → two-way sync"}</strong>
                  </p>
                </div>
                <p className="text-sm">
                  Every pilot is evaluated on your historical data first before going live on a controlled slice of traffic or assets.
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-[var(--ink)] flex flex-col gap-3">
              <a href={`#/demo?service=${summaryParam}&fit=${answered}`} className="btn-swiss t-small w-full justify-center">
                <span>Book pilot walkthrough</span>
                <PixelIcon name="arrow-right" size={13} />
              </a>
              <a href="#/security#request" className="btn-swiss-outline t-small w-full justify-center">
                Request NDA security pack
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function DemoPage({ serviceParam = "", fitParam = "" }: { serviceParam?: string; fitParam?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedService, setSelectedService] = useState(serviceParam || "ai-agents");
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState(
    fitParam ? `Completed ${fitParam}/6 pilot fit check.` : ""
  );
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (serviceParam) setSelectedService(serviceParam);
  }, [serviceParam]);

  useGsapPageChoreography(containerRef, []);

  const serviceOptions = [
    { id: "ai-agents", label: "AI Agents (Capture, Qualify, Book, Sync)" },
    { id: "physical-ai", label: "Physical AI (Sensors & Equipment Drift)" },
    { id: "video-ai", label: "Video AI (Existing IP Cameras & NVRs)" },
    { id: "ot-security", label: "OT Security (Passive Discovery & Conduits)" },
    { id: "ai-development", label: "Custom AI, RAG & Generative AI" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      setError("Please provide a valid work email address.");
      return;
    }
    if (!company.trim()) {
      setError("Please enter your company name.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Book a Demo" className="swiss-container pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="t-micro font-mono-tech">(Book a demo · Tailored to your data)</p>
            <h1 className="t-h1" data-gsap-clip>
              See applyd.ai on your own data.
            </h1>
            <p className="t-body">
              A 30-minute technical call mapped to your own CRM, enquiry flows, cameras or equipment telemetry—followed by a written pilot proposal if it fits.
            </p>
            <div className="border border-[var(--ink)] bg-[var(--paper)] p-5 space-y-3 text-sm">
              <p className="font-mono-tech text-xs font-semibold">WHAT HAPPENS ON THE CALL</p>
              <p>01 · Map one starting asset, camera zone, or inbound channel.</p>
              <p>02 · Agree written hand-off rules or safety thresholds.</p>
              <p>03 · Define test criteria on your own historical records.</p>
            </div>
          </div>

          <div className="lg:col-span-7 border border-[var(--ink)] bg-[var(--paper)] p-6 md:p-8">
            {submitted ? (
              <div className="space-y-4">
                <p className="font-mono-tech text-xs text-[var(--green)] font-semibold">DEMO REQUESTED</p>
                <h2 className="t-h2">Thank you, {fullName}.</h2>
                <p className="t-body">
                  We have logged your demo request for <strong>{company}</strong> ({workEmail}) focusing on{" "}
                  <strong>{serviceOptions.find((s) => s.id === selectedService)?.label || selectedService}</strong>. We will send calendar times within one working day.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-swiss-outline text-xs"
                >
                  Book another session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <span className="text-xs font-mono-tech block">WHAT DO YOU WANT TO SEE?</span>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedService(opt.id)}
                        aria-pressed={selectedService === opt.id}
                        className="chip-toggle text-xs font-mono-tech"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

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
                      placeholder="Jordan Lee"
                      className="w-full min-h-[42px] px-3 border border-[var(--ink)]"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-mono-tech">WORK EMAIL *</span>
                    <input
                      type="email"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="jordan@company.com"
                      className="w-full min-h-[42px] px-3 border border-[var(--ink)]"
                    />
                  </label>
                </div>

                <label className="block space-y-1">
                  <span className="text-xs font-mono-tech">COMPANY / ORGANISATION *</span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Northwind Freight"
                    className="w-full min-h-[42px] px-3 border border-[var(--ink)]"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-xs font-mono-tech">SYSTEMS, CHANNELS OR SITE CONTEXT</span>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. HubSpot CRM + shared inbox, or 12 RTSP cameras on Line 2..."
                    className="w-full p-3 border border-[var(--ink)]"
                  />
                </label>

                <button type="submit" className="btn-swiss t-small">
                  <span>Request walkthrough</span>
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

export function ResourcesPage({ articleSlug }: { articleSlug?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  useGsapPageChoreography(containerRef, [articleSlug]);

  const article = articleSlug ? RESOURCES_ARTICLES.find((a) => a.slug === articleSlug) : null;

  const copyTemplate = (text: string) => {
    try {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (article) {
    return (
      <div ref={containerRef}>
        <section data-surface="sodium" data-pager="01 Article" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
          <div className="max-w-3xl space-y-4">
            <a href="#/resources" className="u-anim font-mono-tech text-xs">← All resources</a>
            <p className="font-mono-tech text-xs">{article.date} · {article.readTime}</p>
            <h1 className="t-h1" data-gsap-clip>{article.title}</h1>
            <p className="t-lead">{article.summary}</p>
          </div>
        </section>

        <section data-surface="paper" data-pager="02 Guide" className="sec-pad border-t border-[var(--ink)]">
          <div className="swiss-container max-w-4xl space-y-8">
            {article.sections.map((sec) => (
              <div key={sec.heading} className="border-b border-[var(--ink)] pb-6 space-y-3">
                <h2 className="t-lead font-semibold">{sec.heading}</h2>
                <p className="t-body whitespace-pre-line">{sec.body}</p>
                {sec.heading.includes("template") && (
                  <button
                    type="button"
                    onClick={() => copyTemplate(sec.body)}
                    className="btn-swiss-outline text-xs"
                  >
                    {copied ? "Template copied" : "Copy hand-off rule template"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Resources" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-4">
          <p className="t-micro font-mono-tech">(Resources & field guides)</p>
          <h1 className="t-h1" data-gsap-clip>Practical guides on speed-to-lead, hand-off rules, and vendor security.</h1>
        </div>
      </section>

      <section data-surface="paper" data-pager="02 Guides" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESOURCES_ARTICLES.map((art) => (
            <a
              key={art.slug}
              href={`#/resources/${art.slug}`}
              className="border border-[var(--ink)] p-6 bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors flex flex-col justify-between gap-6"
            >
              <div className="space-y-3">
                <p className="font-mono-tech text-xs">{art.date} · {art.readTime}</p>
                <h2 className="text-xl font-semibold">{art.title}</h2>
                <p className="text-sm opacity-85">{art.summary}</p>
              </div>
              <span className="font-mono-tech text-xs inline-flex items-center gap-2 pt-3 border-t border-current/25">
                Read guide <PixelIcon name="arrow-right" size={11} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function FaqPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGsapPageChoreography(containerRef, []);

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 FAQ" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-4">
          <p className="t-micro font-mono-tech">(Frequently asked questions)</p>
          <h1 className="t-h1" data-gsap-clip>Direct answers on how applyd.ai works.</h1>
        </div>
      </section>

      <section data-surface="paper" data-pager="02 Questions" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container max-w-4xl divide-y divide-[var(--ink)] border-y border-[var(--ink)]">
          {FAQS.map((item, idx) => (
            <details key={item.q} open={idx < 2} className="group py-5">
              <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-semibold text-lg">
                <span>{item.q}</span>
                <span className="group-open:hidden"><PixelIcon name="plus" size={14} /></span>
                <span className="hidden group-open:inline-flex"><PixelIcon name="minus" size={14} /></span>
              </summary>
              <p className="mt-3 text-base text-[var(--ink)]/85">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" | "cookies" }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [consent, setConsent] = useState<string>(() => {
    try {
      return window.localStorage.getItem("applyd-consent") || "unset";
    } catch {
      return "unset";
    }
  });

  useGsapPageChoreography(containerRef, [kind]);

  const setChoice = (val: "accepted" | "rejected") => {
    setConsent(val);
    try {
      window.localStorage.setItem("applyd-consent", val);
    } catch {
      // ignore
    }
  };

  const titles = {
    privacy: "Privacy Notice",
    terms: "Terms of Use",
    cookies: "Cookie & Analytics Settings",
  };

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" className="swiss-container pt-10 pb-12">
        <p className="t-micro font-mono-tech">({COMPANY.legalName} · Company no. {COMPANY.companyNumber})</p>
        <h1 className="t-h1 mt-3" data-gsap-clip>{titles[kind]}</h1>
      </section>

      <section data-surface="paper" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container max-w-3xl space-y-6 text-base">
          <p>
            <strong>Operator:</strong> {COMPANY.legalName}, registered in {COMPANY.jurisdiction} under company number {COMPANY.companyNumber}. Registered office: {COMPANY.address}. Contact: {COMPANY.email}.
          </p>

          {kind === "privacy" && (
            <>
              <p>
                Information submitted via our demo or NDA security pack forms is processed solely to respond to your enquiry, prepare technical walkthroughs, or issue mutual non-disclosure documentation.
              </p>
              <p>
                Customer data processed within dedicated applyd.ai workspaces or on-site industrial deployments is never used to train third-party public foundation models.
              </p>
            </>
          )}

          {kind === "terms" && (
            <>
              <p>
                This website describes the capabilities and typical engagement model of applyd.ai. Pilot scope, service-level targets, and processing locations are governed by written commercial agreements executed per customer.
              </p>
              <p>
                Illustrative conversations, telemetry figures, and event logs shown in site simulations are demonstration examples unless otherwise marked.
              </p>
            </>
          )}

          {kind === "cookies" && (
            <div className="border border-[var(--ink)] bg-[var(--sodium)]/30 p-6 space-y-4">
              <p className="font-mono-tech text-xs">CURRENT STATUS: {consent.toUpperCase()}</p>
              <p>
                This site operates with essential local preferences only (including motion setting persistence) and sets no optional analytics storage unless explicitly accepted.
              </p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setChoice("rejected")} className="btn-swiss-outline text-xs">
                  Reject optional cookies
                </button>
                <button type="button" onClick={() => setChoice("accepted")} className="btn-swiss btn-sm text-xs">
                  <span>Accept analytics</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
