import React, { useRef, useState } from "react";
import { useGsapPageChoreography } from "../components/MotionContext";
import { PixelIcon } from "../components/PixelGraphics";
import {
  INDUSTRIAL_SECTORS,
  INDUSTRY_AGENTS,
  VIDEO_AI_SECTORS,
} from "../data/industryAndServiceDetails";

export function IndustriesDirectoryPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [groupFilter, setGroupFilter] = useState<"All" | "Customer & Sales" | "Industrial & Video">("All");

  useGsapPageChoreography(containerRef, [groupFilter]);

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Directory" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-5">
          <p className="t-micro font-mono-tech">(20+ Industry vertical playbooks)</p>
          <h1 className="t-h1" data-gsap-clip>
            Industry playbooks built on real hand-off boundaries.
          </h1>
          <p className="t-body max-w-2xl">
            Select your sector to inspect which channels applyd.ai covers first, which regulated or high-stakes questions stop immediately for a person, and an illustrative case timeline.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {(["All", "Customer & Sales", "Industrial & Video"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setGroupFilter(tab)}
                aria-pressed={groupFilter === tab}
                className="chip-toggle text-xs font-mono-tech"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {(groupFilter === "All" || groupFilter === "Customer & Sales") && (
        <section data-surface="paper" data-pager="02 Sales & Service" className="sec-pad border-t border-[var(--ink)]">
          <div className="swiss-container space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="t-h2">14 Customer, Sales & Operations Industries</h2>
              <span className="font-mono-tech text-xs">{INDUSTRY_AGENTS.length} PLAYBOOKS</span>
            </div>

            <div data-gsap-stagger-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--ink)]">
              {INDUSTRY_AGENTS.map((ind) => (
                <a
                  key={ind.slug}
                  href={`#/industries/${ind.slug}`}
                  data-gsap-stagger
                  className="p-5 border-r border-b border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors flex flex-col justify-between gap-4"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{ind.name}</h3>
                    <p className="text-sm font-medium mt-1 opacity-90">{ind.headline}</p>
                    <p className="text-sm mt-2 opacity-75">{ind.shortDesc}</p>
                  </div>
                  <div className="pt-3 border-t border-current/25 flex items-center justify-between font-mono-tech text-xs">
                    <span>{ind.rules.length} written rules</span>
                    <PixelIcon name="arrow-ur" size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {(groupFilter === "All" || groupFilter === "Industrial & Video") && (
        <section data-surface="ink" data-pager="03 Industrial & Vision" className="sec-pad border-t border-[var(--sodium)]">
          <div className="swiss-container space-y-10">
            <div className="space-y-2">
              <h2 className="t-h2 text-[var(--paper)]">Industrial Sites & Video AI Sectors</h2>
              <p className="t-body text-[var(--sodium)]">
                Plant operations combining IP cameras, Physical AI sensors, and passive OT discovery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[var(--sodium)] divide-y divide-[var(--sodium)]/40">
                <div className="p-4 bg-[var(--sodium)] text-[var(--ink)] font-mono-tech text-xs font-semibold">
                  04 INDUSTRIAL PLANT SECTORS
                </div>
                {INDUSTRIAL_SECTORS.map((sec) => (
                  <a
                    key={sec.slug}
                    href={`#/industrial/${sec.slug}`}
                    className="block p-4 text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">{sec.name}</span>
                      <PixelIcon name="arrow-ur" size={11} />
                    </div>
                    <p className="text-sm opacity-80 mt-1">{sec.summary}</p>
                  </a>
                ))}
              </div>

              <div className="border border-[var(--sodium)] divide-y divide-[var(--sodium)]/40">
                <div className="p-4 bg-[var(--green)] text-[var(--ink)] font-mono-tech text-xs font-semibold">
                  06 VIDEO AI SECTORS
                </div>
                {VIDEO_AI_SECTORS.map((v) => (
                  <a
                    key={v.slug}
                    href={`#/ai/video-ai/${v.slug}`}
                    className="block p-4 text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">{v.name}</span>
                      <PixelIcon name="arrow-ur" size={11} />
                    </div>
                    <p className="text-sm opacity-80 mt-1">{v.headline}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export function IndustryDetailPage({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spec = INDUSTRY_AGENTS.find((i) => i.slug === slug) || INDUSTRY_AGENTS[0];

  useGsapPageChoreography(containerRef, [slug]);

  return (
    <div ref={containerRef}>
      <section data-surface="sodium" data-pager="01 Overview" className="swiss-container pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="max-w-4xl space-y-5">
          <a href="#/industries" className="u-anim font-mono-tech text-xs">← All industries</a>
          <p className="font-mono-tech text-xs uppercase">{spec.name}</p>
          <h1 className="t-h1" data-gsap-clip>{spec.headline}</h1>
          <p className="t-body max-w-2xl">{spec.shortDesc}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={`#/demo?service=${spec.slug}`} className="btn-swiss t-small">
              <span>Book a {spec.name} demo</span>
              <PixelIcon name="arrow-right" size={13} />
            </a>
            <a href="#/pilot-fit" className="btn-swiss-outline t-small">
              Check pilot fit
            </a>
          </div>
        </div>
      </section>

      <section data-surface="paper" data-pager="02 Channels & Rules" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 border border-[var(--ink)] p-6 space-y-4">
            <p className="font-mono-tech text-xs">CHANNELS HANDLED</p>
            <ul className="space-y-3 text-sm md:text-base">
              {spec.channels.map((c) => (
                <li key={c} className="pb-2 border-b border-[var(--ink)]/20 last:border-b-0">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 border border-[var(--ink)] p-6 bg-[var(--sodium)]/30 space-y-4">
            <p className="font-mono-tech text-xs">FIRST ACTIONS</p>
            <ul className="space-y-3 text-sm md:text-base">
              {spec.firstActions.map((a) => (
                <li key={a} className="flex items-start gap-2.5">
                  <PixelIcon name="check" size={12} className="mt-1.5 shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Written Hand-off Rules Table */}
        <div className="swiss-container mt-12">
          <p className="t-micro font-mono-tech mb-3">(Written boundaries & hand-off rules)</p>
          <div className="border border-[var(--ink)] divide-y divide-[var(--ink)]">
            {spec.rules.map((r) => (
              <div key={r.area} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 font-semibold">{r.area}</div>
                <div className="md:col-span-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-mono-tech border border-[var(--ink)] inline-block ${
                      r.owner === "Person"
                        ? "bg-[var(--coral)]"
                        : r.owner === "Approval"
                        ? "bg-[var(--sodium)]"
                        : "bg-[var(--green)]"
                    }`}
                  >
                    {r.owner}
                  </span>
                </div>
                <div className="md:col-span-6 text-sm">{r.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative Case Timeline */}
      <section data-surface="ink" data-pager="03 Illustrative Case" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-container space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="t-micro font-mono-tech">(Illustrative conversation trace)</p>
              <h2 className="t-h2 text-[var(--paper)] mt-1">{spec.example.person}</h2>
              <p className="text-sm text-[var(--sodium)] mt-1">{spec.example.context}</p>
            </div>
            <span className="font-mono-tech text-xs px-3 py-1 bg-[var(--green)] text-[var(--ink)] font-semibold">
              {spec.example.outcome}
            </span>
          </div>

          <div className="border border-[var(--sodium)] divide-y divide-[var(--sodium)]/40 bg-[var(--paper)] text-[var(--ink)]">
            {spec.example.steps.map((st, idx) => (
              <div key={idx} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <span className="md:col-span-2 font-mono-tech text-xs">{st.time}</span>
                <span className="md:col-span-2 font-mono-tech text-xs font-semibold">{st.actor}</span>
                <p className="md:col-span-8 text-sm md:text-base">{st.text}</p>
              </div>
            ))}
          </div>

          {spec.faqs.length > 0 && (
            <div className="pt-8 space-y-3">
              <p className="t-micro font-mono-tech">({spec.name} FAQ)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {spec.faqs.map((fq) => (
                  <div key={fq.q} className="border border-[var(--sodium)] p-4 text-[var(--paper)]">
                    <p className="font-semibold">{fq.q}</p>
                    <p className="text-sm text-[var(--sodium)] mt-2">{fq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
