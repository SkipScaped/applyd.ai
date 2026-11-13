import React, { useRef, useState } from "react";
import { useGsapPageChoreography } from "../components/MotionContext";
import {
  AIDevRagStepper,
  AgentsPipelineReplay,
  OTSecurityMatrix,
  PhysicalAISimulator,
  VideoAISimulator,
} from "../components/MotionSimulations";
import { PixelIcon, ServicePixelArt } from "../components/PixelGraphics";
import {
  AI_SERVICE_PAGES,
  INDUSTRIAL_SECTORS,
  VIDEO_AI_SECTORS,
} from "../data/industryAndServiceDetails";
import { FAQS } from "../data/siteData";

const AI_LIFECYCLE = [
  { phase: "01 Shape", steps: ["01 Frame the task", "02 Agree pass marks", "03 Check data & permissions", "04 Pick architecture"] },
  { phase: "02 Build", steps: ["05 Thin slice end-to-end", "06 Eval & injection suite", "07 Review queues & logs", "08 Shadow test"] },
  { phase: "03 Run & improve", steps: ["09 Limited rollout", "10 Cost & latency budgets", "11 Trace drift checks", "12 Update rules", "13 Widen carefully"] },
];

export function AiHubPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGsapPageChoreography(containerRef, []);

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 AI Development" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-5">
          <p className="t-micro font-mono-tech">(Solutions hub · 08 AI engineering & industrial capabilities)</p>
          <h1 className="t-h1" data-gsap-clip>
            AI engineering, sensors, cameras and control networks built around one workflow at a time.
          </h1>
          <p className="t-body max-w-2xl">
            Whether you need autonomous agents with human checkpoints, on-site Video AI for safety zones, multi-sensor Physical AI, passive OT discovery, or grounded RAG over internal manuals—we test against your own data first.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#/demo?service=ai-development" className="btn-swiss t-small">
              <span>Book a technical walkthrough</span>
              <PixelIcon name="arrow-right" size={13} />
            </a>
            <a href="#/industrial" className="btn-swiss-outline t-small">
              Explore 4 industrial sectors
            </a>
          </div>
        </div>
      </section>

      {/* All 8 AI Service Cards */}
      <section data-surface="paper" data-pager="02 Eight Services" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="t-micro font-mono-tech">(08 Core Solutions)</p>
              <h2 className="t-h2 mt-2" data-gsap-clip>Select a capability to inspect its architecture and simulator.</h2>
            </div>
          </div>

          <div data-gsap-stagger-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--ink)]">
            {AI_SERVICE_PAGES.map((srv, idx) => (
              <a
                key={srv.slug}
                href={`#/ai/${srv.slug}`}
                data-gsap-stagger
                className="group p-5 border-r border-b border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-xs">0{idx + 1}</span>
                    <span
                      className="w-4 h-4 border border-[var(--ink)] inline-block"
                      style={{ backgroundColor: srv.accent }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{srv.name}</h3>
                  <p className="text-sm opacity-85">{srv.summary}</p>
                </div>
                <div className="pt-3 border-t border-current/25 flex items-center justify-between font-mono-tech text-xs">
                  <span>Inspect specification</span>
                  <PixelIcon name="arrow-ur" size={11} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 13-Step Lifecycle + Generative Drift Stepper */}
      <section data-surface="ink" data-pager="03 Delivery & RAG Demo" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-container space-y-12">
          <div>
            <p className="t-micro font-mono-tech">(Delivery lifecycle)</p>
            <h2 className="t-h2 text-[var(--paper)] mt-2" data-gsap-clip>
              Thirteen steps from problem framing to wider rollout.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--sodium)]">
            {AI_LIFECYCLE.map((col, idx) => (
              <div
                key={col.phase}
                className={`p-6 border-b md:border-b-0 ${idx < 2 ? "md:border-r" : ""} border-[var(--sodium)]`}
              >
                <h3 className="font-mono-tech text-sm text-[var(--sodium)] mb-4">{col.phase}</h3>
                <ul className="space-y-2.5 text-sm text-[var(--paper)]">
                  {col.steps.map((s) => (
                    <li key={s} className="pb-2 border-b border-[var(--sodium)]/20 last:border-b-0">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="font-mono-tech text-xs text-[var(--sodium)]">
              LIVE VERIFICATION DEMO · FACT-GROUNDED DRIFT CHECK
            </p>
            <AIDevRagStepper />
          </div>
        </div>
      </section>
    </div>
  );
}

// 5-question Interactive Approach Recommender for #/ai/consulting
function ConsultingRecommender() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questions = [
    { id: "task", q: "What is the primary task?", opts: ["Answer from existing docs", "Multi-step action across systems", "Classify/predict structured data"] },
    { id: "change", q: "How often do source facts change?", opts: ["Daily or weekly", "Quarterly / static"] },
    { id: "risk", q: "Consequence of a wrong answer?", opts: ["Customer / regulated impact", "Internal draft only"] },
    { id: "acl", q: "Need per-user document ACLs?", opts: ["Yes, strict permissions", "No, shared handbook"] },
    { id: "host", q: "Where must data stay?", opts: ["Private VPC / On-site", "Cloud managed endpoint"] },
  ];

  const answeredCount = Object.keys(answers).length;
  const recommendation =
    answers.task === "Multi-step action across systems"
      ? { approach: "Bounded Tool-Using Agent + Approval Checkpoints", rationale: "Use an orchestration graph with least-privilege API scopes, step budgets, and human sign-off on write/customer actions." }
      : answers.task === "Answer from existing docs" || answers.change === "Daily or weekly"
      ? { approach: "Synced Hybrid RAG (No Fine-Tuning)", rationale: "Retrieval-augmented generation with structure-aware chunking, cross-encoder reranking, and query-time ACL filters keeps answers cited and fresh." }
      : { approach: "Structured Classifier / Deterministic Pipeline", rationale: "Evaluate off-the-shelf models with schema validation first before investing in custom fine-tuning." };

  return (
    <div className="border border-[var(--ink)] bg-[var(--sodium)] p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ink)] pb-3">
        <h3 className="t-lead font-semibold">Interactive Architecture Recommender</h3>
        <span className="font-mono-tech text-xs">{answeredCount} OF {questions.length} ANSWERED</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((item) => (
          <div key={item.id} className="border border-[var(--ink)] bg-[var(--paper)] p-4 space-y-2.5">
            <p className="text-sm font-semibold">{item.q}</p>
            <div className="flex flex-wrap gap-1.5">
              {item.opts.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAnswers((p) => ({ ...p, [item.id]: opt }))}
                  aria-pressed={answers[item.id] === opt}
                  className={`px-2.5 py-1.5 text-xs font-mono-tech border border-[var(--ink)] text-left ${
                    answers[item.id] === opt ? "bg-[var(--ink)] text-[var(--sodium)]" : "bg-[var(--paper)]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border border-[var(--ink)] bg-[var(--paper)] p-5">
        <p className="font-mono-tech text-xs text-[var(--blue)] font-semibold">
          {answeredCount === 0 ? "PREVIEW RECOMMENDATION" : "RECOMMENDED STARTING ARCHITECTURE"}
        </p>
        <p className="t-lead font-semibold mt-1">{recommendation.approach}</p>
        <p className="text-sm mt-2">{recommendation.rationale}</p>
      </div>
    </div>
  );
}

export function AiServiceDetailPage({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spec = AI_SERVICE_PAGES.find((s) => s.slug === slug) || AI_SERVICE_PAGES[0];

  useGsapPageChoreography(containerRef, [slug]);

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Service Hero" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <a href="#/ai" className="u-anim font-mono-tech text-xs">← All 8 AI services</a>
            <h1 className="t-h1" data-gsap-clip>{spec.headline}</h1>
            <p className="t-body max-w-2xl">{spec.summary}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={`#/demo?service=${spec.slug}`} className="btn-swiss t-small">
                <span>Book a {spec.name} demo</span>
                <PixelIcon name="arrow-right" size={13} />
              </a>
              <a href="#/security#request" className="btn-swiss-outline t-small">
                Request NDA security pack
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 border border-[var(--ink)]">
            <ServicePixelArt serviceId={spec.slug === "ot-cybersecurity" ? "ot-security" : spec.slug} bg={spec.accent} fg="#0A0A0A" />
            <div className="p-4 bg-[var(--paper)] flex items-center justify-between font-mono-tech text-xs">
              <span>{spec.name.toUpperCase()}</span>
              <span>PILOT READY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator / Sector Nav for specific services */}
      <section data-surface="ink" data-pager="02 Interactive View" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-container space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="t-micro font-mono-tech">(Live module)</p>
              <h2 className="t-h2 text-[var(--paper)] mt-1">{spec.name} in practice</h2>
            </div>
            {spec.slug === "video-ai" && (
              <div className="flex flex-wrap gap-1.5">
                {VIDEO_AI_SECTORS.map((sec) => (
                  <a
                    key={sec.slug}
                    href={`#/ai/video-ai/${sec.slug}`}
                    className="px-2.5 py-1 text-xs font-mono-tech border border-[var(--sodium)] text-[var(--sodium)] hover:bg-[var(--sodium)] hover:text-[var(--ink)]"
                  >
                    {sec.name} →
                  </a>
                ))}
              </div>
            )}
          </div>

          {spec.slug === "physical-ai" && <PhysicalAISimulator />}
          {spec.slug === "video-ai" && <VideoAISimulator />}
          {spec.slug === "ot-cybersecurity" && <OTSecurityMatrix />}
          {spec.slug === "agent-development" && <AgentsPipelineReplay />}
          {(spec.slug === "generative-ai" || spec.slug === "llm-integration" || spec.slug === "chatbots") && <AIDevRagStepper />}
          {spec.slug === "consulting" && <ConsultingRecommender />}
        </div>
      </section>

      {/* Offerings + Pipeline Phases */}
      <section data-surface="paper" data-pager="03 Capabilities & Stack" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container space-y-12">
          <div>
            <p className="t-micro font-mono-tech">(What we build)</p>
            <h2 className="t-h2 mt-2" data-gsap-clip>Scope & engineering deliverables</h2>
            <div data-gsap-stagger-group className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--ink)]">
              {spec.offerings.map((off) => (
                <div key={off.title} data-gsap-stagger className="p-5 border-r border-b border-[var(--ink)]">
                  <h3 className="text-lg font-semibold">{off.title}</h3>
                  <p className="text-sm mt-2 text-[var(--ink)]/85">{off.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <p className="t-micro font-mono-tech">(Pipeline & workflow)</p>
              <div className="border border-[var(--ink)] divide-y divide-[var(--ink)]">
                {spec.pipelinePhases.map((p) => (
                  <div key={p.phase} className="p-4">
                    <p className="font-mono-tech text-xs font-semibold uppercase">{p.phase}</p>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {p.steps.map((st) => (
                        <li key={st}>• {st}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <p className="t-micro font-mono-tech">(Safety controls & stack)</p>
              <div className="border border-[var(--ink)] divide-y divide-[var(--ink)]">
                {spec.safetyControls.map((sc) => (
                  <div key={sc.title} className="p-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-sm">{sc.title}</p>
                      <p className="text-sm text-[var(--ink)]/80 mt-0.5">{sc.desc}</p>
                    </div>
                    <span className="font-mono-tech text-xs px-2 py-0.5 border border-[var(--ink)] bg-[var(--sodium)] shrink-0">
                      {sc.badge}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border border-[var(--ink)] bg-[var(--sodium)]/30 p-4 space-y-2">
                {spec.tools.map((t) => (
                  <p key={t.category} className="text-xs font-mono-tech">
                    <strong>{t.category}:</strong> {t.items}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function IndustrialHubPage({ sectorSlug }: { sectorSlug?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedSector = INDUSTRIAL_SECTORS.find((s) => s.slug === sectorSlug) || null;

  useGsapPageChoreography(containerRef, [sectorSlug]);

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Industrial" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs">
            <a href="#/industrial" className="u-anim">Industrial applications</a>
            {selectedSector && <span>/ {selectedSector.name}</span>}
          </div>
          <h1 className="t-h1" data-gsap-clip>
            {selectedSector
              ? selectedSector.headline
              : "Industrial AI: existing cameras, equipment sensors, and passive OT security."}
          </h1>
          <p className="t-body max-w-2xl">
            {selectedSector
              ? selectedSector.summary
              : "Practical site deployment across oil & gas, chemical plants, pharmaceuticals (non-GMP utilities) and power generation. Processing stays on site or in your private cloud."}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {INDUSTRIAL_SECTORS.map((s) => (
              <a
                key={s.slug}
                href={`#/industrial/${s.slug}`}
                className={`px-3 py-1.5 text-xs font-mono-tech border border-[var(--ink)] ${
                  selectedSector?.slug === s.slug ? "bg-[var(--ink)] text-[var(--sodium)]" : "bg-[var(--paper)]"
                }`}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {selectedSector && (
        <section data-surface="paper" data-pager="02 Sector Spec" className="sec-pad border-t border-[var(--ink)]">
          <div className="swiss-container grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[var(--ink)] p-5 space-y-3">
              <p className="font-mono-tech text-xs">VIDEO AI ZONE EVENTS</p>
              <ul className="space-y-2 text-sm">
                {selectedSector.videoEvents.map((ev) => (
                  <li key={ev} className="flex items-start gap-2">
                    <PixelIcon name="check" size={12} className="mt-1 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[var(--ink)] p-5 space-y-3">
              <p className="font-mono-tech text-xs">PHYSICAL AI SIGNALS & ASSETS</p>
              <p className="text-sm"><strong>Inputs:</strong> {selectedSector.sensorInputs}</p>
              <p className="text-sm"><strong>Assets:</strong> {selectedSector.assets}</p>
            </div>
            <div className="border border-[var(--ink)] bg-[var(--sodium)] p-5 space-y-3">
              <p className="font-mono-tech text-xs">RECOMMENDED FIRST PROJECT</p>
              <p className="text-base font-medium">{selectedSector.firstProject}</p>
            </div>
          </div>
        </section>
      )}

      <section data-surface="ink" data-pager="03 Site Simulators" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-container space-y-12">
          <div className="space-y-4">
            <p className="t-micro font-mono-tech">(Physical AI · Multi-signal correlation)</p>
            <h2 className="t-h2 text-[var(--paper)]">Test load-aware fault patterns (HX-204, P-204, C-108, M-410)</h2>
            <PhysicalAISimulator />
          </div>

          <div className="space-y-4">
            <p className="t-micro font-mono-tech">(OT cybersecurity · Passive discovery)</p>
            <h2 className="t-h2 text-[var(--paper)]">Non-intrusive control network visibility</h2>
            <OTSecurityMatrix />
          </div>
        </div>
      </section>
    </div>
  );
}

export function VideoAiSectorPage({ sectorSlug }: { sectorSlug: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sector = VIDEO_AI_SECTORS.find((v) => v.slug === sectorSlug) || VIDEO_AI_SECTORS[0];

  useGsapPageChoreography(containerRef, [sectorSlug]);

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Video AI Sector" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
            <a href="#/ai/video-ai" className="u-anim">Video AI</a>
            <span>/ {sector.name}</span>
          </div>
          <h1 className="t-h1" data-gsap-clip>{sector.headline}</h1>
          <div className="flex flex-wrap gap-2 pt-2">
            {VIDEO_AI_SECTORS.map((v) => (
              <a
                key={v.slug}
                href={`#/ai/video-ai/${v.slug}`}
                className={`px-3 py-1.5 text-xs font-mono-tech border border-[var(--ink)] ${
                  v.slug === sector.slug ? "bg-[var(--ink)] text-[var(--sodium)]" : "bg-[var(--paper)]"
                }`}
              >
                {v.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section data-surface="ink" data-pager="02 Camera Viewport" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-container space-y-10">
          <VideoAISimulator />
        </div>
      </section>

      <section data-surface="paper" data-pager="03 Sector Shift Log" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 border border-[var(--ink)] p-6 space-y-4">
            <p className="font-mono-tech text-xs">WHAT IT WATCHES FOR</p>
            <ul className="space-y-2.5 text-sm md:text-base">
              {sector.watchesFor.map((w) => (
                <li key={w} className="flex items-start gap-2.5">
                  <PixelIcon name="check" size={12} className="mt-1.5 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 border border-[var(--ink)] divide-y divide-[var(--ink)]">
            <div className="p-4 bg-[var(--sodium)] font-mono-tech text-xs font-semibold">
              EXAMPLE SHIFT LOG · {sector.name.toUpperCase()} (ILLUSTRATIVE)
            </div>
            {sector.shiftLog.map((row) => (
              <div key={row.time + row.camera} className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <span className="sm:col-span-2 font-mono-tech text-xs">{row.time}</span>
                <span className="sm:col-span-3 font-semibold text-sm">{row.camera}</span>
                <span className="sm:col-span-4 text-sm">{row.event}</span>
                <span className="sm:col-span-3 sm:text-right font-mono-tech text-xs">→ {row.target}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="swiss-container mt-10 border-t border-[var(--ink)] pt-8">
          <p className="font-mono-tech text-xs mb-2">ON-SITE PRIVACY & GDPR</p>
          <p className="t-body max-w-3xl">{FAQS[8].a}</p>
        </div>
      </section>
    </div>
  );
}
