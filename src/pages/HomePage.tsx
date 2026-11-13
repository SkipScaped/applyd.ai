import React, { useRef, useState } from "react";
import { useGsapPageChoreography } from "../components/MotionContext";
import {
  AIDevRagStepper,
  AgentsPipelineReplay,
  EvaluationMatrixGrid,
  IndustryPosterWall,
  OTSecurityMatrix,
  PhysicalAISimulator,
  VideoAISimulator,
} from "../components/MotionSimulations";
import { HeroPixelCanvas, PixelIcon, ServicePixelArt } from "../components/PixelGraphics";
import {
  CHANNELS_LIST,
  CORE_SERVICES,
  FAQS,
  FOUR_DELIVERY_STEPS,
  SECURITY_CONTROLS,
} from "../data/siteData";

export function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [heroCycleIdx, setHeroCycleIdx] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  useGsapPageChoreography(containerRef, []);

  const selectedService = CORE_SERVICES[activeServiceIdx];

  const handleSelectService = (idx: number) => {
    setActiveServiceIdx(idx);
    setHeroCycleIdx(idx % 5);
  };

  return (
    <div ref={containerRef}>
      {/* L1 HERO (Sodium Surface) */}
      <section
        id="hero"
        data-surface="sodium"
        data-pager="01 Overview"
        className="swiss-container pt-6 pb-14 md:pt-8 md:pb-20 min-h-[calc(100svh-var(--header-h))] flex flex-col justify-between gap-10"
      >
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-4">
          <div className="col-span-4 md:col-span-4 lg:col-span-5 t-lead" data-gsap-clip>
            <div>APPLYD AI LTD</div>
            <div>Plants, cameras, networks</div>
            <div>& inbound conversations</div>
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-4 t-micro font-mono-tech">
            <div>Every conversation handled.</div>
            <div>People step in when it counts.</div>
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-3 text-right t-micro font-mono-tech">
            <div>05 CORE SERVICES</div>
            <div>ON-SITE / CLOUD / HYBRID</div>
          </div>
        </div>

        {/* Interactive Particle Matrix Wordmark */}
        <HeroPixelCanvas
          activeIdx={heroCycleIdx}
          onSelectCycle={(idx) => {
            setHeroCycleIdx(idx);
            setActiveServiceIdx(idx);
          }}
        />

        {/* Hero Headline + Service Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7 space-y-5">
            <h1 className="t-h1" data-gsap-clip>
              AI for plants, cameras, control networks and inbound conversations.
            </h1>
            <p className="t-body max-w-2xl">
              Each project starts on one asset or one workflow and is tested on your own data before anything widens.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href={`#/demo?service=${selectedService.demoParam}`} className="btn-swiss t-small">
                <span>Book a demo</span>
                <PixelIcon name="arrow-right" size={13} />
              </a>
              <a href="#/pilot-fit" className="btn-swiss-outline t-small">
                6-question pilot fit check
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 border border-[var(--ink)] bg-[var(--paper)] p-5">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--ink)]">
              <span className="font-mono-tech text-xs">
                ACTIVE PANEL · {selectedService.num}/05
              </span>
              <span
                className="px-2 py-0.5 text-xs font-semibold border border-[var(--ink)]"
                style={{ backgroundColor: selectedService.accentBg, color: selectedService.accentFg }}
              >
                {selectedService.name}
              </span>
            </div>
            <h2 className="t-lead font-semibold mt-3">{selectedService.heroTitle}</h2>
            <p className="text-sm mt-2 text-[var(--ink)]/85">{selectedService.heroSummary}</p>
            <div className="mt-4 pt-3 border-t border-[var(--ink)]/25 space-y-1 font-mono-tech text-xs">
              <p className="font-semibold">{selectedService.illustrationLabel}</p>
              {selectedService.illustrationLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--ink)] flex flex-wrap items-center justify-between gap-3">
              <a href={selectedService.exploreHref} className="u-anim text-sm font-semibold">
                Explore {selectedService.name} →
              </a>
              <a href={`#/demo?service=${selectedService.demoParam}`} className="u-anim font-mono-tech text-xs">
                Demo this service
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* L2 FIVE SERVICES MODULAR PANELS + LIVE INTERACTIVE LAB (Ink Surface) */}
      <section id="services" data-surface="ink" data-pager="02 Five Services" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-grid gap-y-6">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(Five services)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-4">
            <h2 className="t-h2 text-[var(--paper)]" data-gsap-clip>
              Five services. Each starts on one asset or one workflow.
            </h2>
            <p className="t-body text-[var(--sodium)] max-w-2xl">
              You choose the starting point: a pump, a camera feed, an enquiry queue or a document set. Select any service below to inspect its live simulation.
            </p>
          </div>
        </div>

        {/* 5 Modular Pixel Cards (RASTER/27 Track Panel Style) */}
        <div
          data-gsap-stagger-group
          className="swiss-container mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {CORE_SERVICES.map((srv, idx) => {
            const isActive = idx === activeServiceIdx;
            return (
              <button
                key={srv.id}
                type="button"
                data-gsap-stagger
                onClick={() => handleSelectService(idx)}
                aria-pressed={isActive}
                className={`text-left border transition-transform flex flex-col justify-between ${
                  isActive
                    ? "border-[var(--paper)] ring-2 ring-[var(--paper)] -translate-y-1"
                    : "border-[var(--sodium)]/60 hover:-translate-y-0.5"
                }`}
                style={{ backgroundColor: srv.accentBg, color: srv.accentFg }}
              >
                <ServicePixelArt serviceId={srv.id} bg={srv.accentBg} fg={srv.accentFg} />
                <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <p className="font-mono-tech text-xs opacity-80">{srv.num}/05</p>
                    <h3 className="text-xl font-semibold mt-1 tracking-tight">{srv.name}</h3>
                    <p className="text-sm mt-2 opacity-90">{srv.carouselHeading}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-current/25 font-mono-tech text-xs">
                    <span>{isActive ? "Active lab" : "Inspect"}</span>
                    <PixelIcon name="arrow-ur" size={11} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Simulation Lab matching selected service */}
        <div className="swiss-container mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono-tech text-xs text-[var(--sodium)]">
              INTERACTIVE MODULE · {selectedService.name.toUpperCase()} — {selectedService.carouselBody}
            </p>
            <a href={selectedService.exploreHref} className="text-xs font-mono-tech text-[var(--paper)] underline">
              Full {selectedService.name} specification →
            </a>
          </div>
          {selectedService.id === "physical-ai" && <PhysicalAISimulator />}
          {selectedService.id === "video-ai" && <VideoAISimulator />}
          {selectedService.id === "ai-agents" && <AgentsPipelineReplay />}
          {selectedService.id === "ot-security" && <OTSecurityMatrix />}
          {selectedService.id === "ai-development" && <AIDevRagStepper />}
        </div>
      </section>

      {/* L3 AI AGENTS FIVE STAGES + HAND-OFF RULES + REPLAY (Paper Surface) */}
      <section id="agents-pipeline" data-surface="paper" data-pager="03 Agents & Hand-off" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-grid gap-y-6">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(AI agents)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-4">
            <h2 className="t-h2" data-gsap-clip>
              Capture, qualify, follow up, book, sync.
            </h2>
            <p className="t-body max-w-2xl">
              Five stages of one agent product, working email, SMS, WhatsApp, voice, chat and web forms. Each stage has its own written rule for when a person takes over.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {CHANNELS_LIST.map((ch) => (
                <span key={ch} className="font-mono-tech text-xs px-2.5 py-1 border border-[var(--ink)] bg-[var(--sodium)]/35">
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Written Hand-off Rule Callout */}
        <div className="swiss-container mt-10">
          <div className="border border-[var(--ink)] bg-[var(--sodium)] p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-2">
              <p className="font-mono-tech text-xs uppercase">Where a person takes over is written down</p>
              <h3 className="t-lead font-semibold">
                IF enquiry asks for a discount → hand to named account owner.
              </h3>
              <p className="text-sm">
                Agents never negotiate, discount or commit unless a rule allows it. Your team writes the rules before launch and can change them at any time.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-[var(--ink)] bg-[var(--paper)] p-3">
                <p className="font-mono-tech text-xs">AGENT</p>
                <p className="text-sm font-semibold mt-1">Stops and sends nothing further.</p>
              </div>
              <div className="border border-[var(--ink)] bg-[var(--paper)] p-3">
                <p className="font-mono-tech text-xs">PERSON</p>
                <p className="text-sm font-semibold mt-1">Account owner receives the full thread.</p>
              </div>
              <div className="border border-[var(--ink)] bg-[var(--paper)] p-3">
                <p className="font-mono-tech text-xs">LOGGED</p>
                <p className="text-sm font-semibold mt-1">Rule, timestamp and who took over.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live 5-Stage & Sara Malik Replay */}
        <div className="swiss-container mt-10">
          <AgentsPipelineReplay />
        </div>

        {/* Pilot Evaluation Matrix (200-cell SVG) */}
        <div className="swiss-container mt-12">
          <EvaluationMatrixGrid />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <a href="#/how-it-works" className="btn-swiss btn-sm t-small">
              <span>See how it works</span>
              <PixelIcon name="arrow-right" size={12} />
            </a>
            <a href="#/platform" className="u-anim text-sm font-semibold">
              Inspect platform controls & audit log →
            </a>
          </div>
        </div>
      </section>

      {/* L4 SIX INDUSTRY EXAMPLES POSTER WALL (Sodium Surface) */}
      <section id="industries-preview" data-surface="sodium" data-pager="04 Six Industries" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-grid gap-y-6 mb-10">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(Industry poster wall)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-3">
            <h2 className="t-h2" data-gsap-clip>
              Where each service applies: six examples.
            </h2>
            <p className="t-body max-w-2xl">
              Press any generative grid poster to regenerate its matrix and inspect what applyd.ai flags or hands to a person in that environment.
            </p>
          </div>
        </div>

        <div className="swiss-container">
          <IndustryPosterWall />
        </div>
      </section>

      {/* L5 FOUR DELIVERY STEPS (Ink Surface) */}
      <section id="delivery" data-surface="ink" data-pager="05 Four Steps" className="sec-pad border-t border-[var(--sodium)]">
        <div className="swiss-grid gap-y-6">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(Delivery)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-3">
            <h2 className="t-h2 text-[var(--paper)]" data-gsap-clip>
              We start on one workflow, test it on your data, then connect it.
            </h2>
            <p className="t-body text-[var(--sodium)] max-w-2xl">
              The same four disciplined steps whichever service an engagement starts with.
            </p>
          </div>
        </div>

        <div
          data-gsap-stagger-group
          className="swiss-container mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[var(--sodium)]"
        >
          {FOUR_DELIVERY_STEPS.map((st, idx) => (
            <div
              key={st.num}
              data-gsap-stagger
              className={`p-6 flex flex-col justify-between gap-6 border-b lg:border-b-0 ${
                idx < 3 ? "lg:border-r" : ""
              } border-[var(--sodium)]`}
            >
              <div>
                <p className="font-mono-tech text-3xl font-semibold text-[var(--sodium)]">{st.num}</p>
                <h3 className="text-xl font-semibold text-[var(--paper)] mt-3">{st.title}</h3>
                <p className="text-sm text-[var(--paper)]/85 mt-2">{st.desc}</p>
              </div>
              <div className="space-y-3 pt-4 border-t border-[var(--sodium)]/35 text-xs">
                <div>
                  <span className="font-mono-tech text-[var(--sodium)] block">YOU GIVE</span>
                  <span className="text-[var(--paper)]">{st.give}</span>
                </div>
                <div>
                  <span className="font-mono-tech text-[var(--mint)] block">YOU GET</span>
                  <span className="text-[var(--paper)]">{st.get}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* L6 ARCHITECTURE & SECURITY UNDER NDA (Paper Surface) */}
      <section id="company" data-surface="paper" data-pager="06 Architecture & NDA" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-grid gap-y-6">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(Architecture & trust)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-6">
            <h2 className="t-h2" data-gsap-clip>
              AI for plants, sites and customer conversations.
            </h2>
            <p className="t-body max-w-2xl">
              We work from the area or workflow you point at, and we say plainly what the system can and cannot do.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-[var(--ink)] p-4 bg-[var(--sodium)]/25">
                <p className="font-mono-tech text-xs">RUNS ON</p>
                <p className="text-sm mt-2 font-medium">
                  On site, in the cloud or hybrid, depending on your network and data rules.
                </p>
              </div>
              <div className="border border-[var(--ink)] p-4 bg-[var(--sodium)]/25">
                <p className="font-mono-tech text-xs">CONNECTS TO</p>
                <p className="text-sm mt-2 font-medium">
                  IP cameras and NVRs, equipment sensors, your CRM, and email, SMS, WhatsApp and voice.
                </p>
              </div>
              <div className="border border-[var(--ink)] p-4 bg-[var(--sodium)]/25">
                <p className="font-mono-tech text-xs">DECIDES</p>
                <p className="text-sm mt-2 font-medium">
                  Your team: which alerts matter, which actions need approval and when a person takes over.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="swiss-container mt-14 pt-12 border-t border-[var(--ink)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-3">
              <p className="t-micro font-mono-tech">(Security)</p>
              <h3 className="t-h2">What is in place, and what reviewers get under NDA.</h3>
              <p className="text-sm">
                We share our security documentation under NDA as part of every enterprise evaluation.
              </p>
              <div className="pt-2">
                <a href="#/security#request" className="btn-swiss btn-sm t-small">
                  <span>Request NDA security pack</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 divide-y divide-[var(--ink)] border-y border-[var(--ink)]">
              {SECURITY_CONTROLS.map((ctrl) => (
                <div key={ctrl.title} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-4 font-semibold text-sm">{ctrl.title}</div>
                  <div className="sm:col-span-8 text-sm text-[var(--ink)]/85">{ctrl.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* L7 FAQ (Sodium Surface) */}
      <section id="faq" data-surface="sodium" data-pager="07 FAQ" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-grid gap-y-6">
          <div className="col-span-4 md:col-span-3 lg:col-span-3 space-y-3">
            <p className="t-micro font-mono-tech">(FAQ)</p>
            <a href="#/faq" className="u-anim text-sm font-semibold">
              All questions →
            </a>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9">
            <h2 className="t-h2 mb-6" data-gsap-clip>Common questions, straight answers.</h2>
            <div className="divide-y divide-[var(--ink)] border-y border-[var(--ink)]">
              {FAQS.slice(0, 6).map((item, i) => (
                <details key={item.q} open={i === 0} className="group py-4">
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-semibold text-base md:text-lg">
                    <span>{item.q}</span>
                    <span className="shrink-0 group-open:hidden">
                      <PixelIcon name="plus" size={14} />
                    </span>
                    <span className="shrink-0 hidden group-open:inline-flex">
                      <PixelIcon name="minus" size={14} />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base max-w-3xl text-[var(--ink)]/90">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* L8 CLOSING DEMO CTA (Paper Surface) */}
      <section id="see-it" data-surface="paper" data-pager="08 Demo" className="sec-pad border-t border-[var(--ink)]">
        <div className="swiss-grid gap-y-6">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <p className="t-micro font-mono-tech">(See it on your own data)</p>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-9 space-y-6">
            <h2 className="t-h1" data-gsap-clip>
              See it on your own data.
            </h2>
            <p className="t-lead max-w-2xl">
              Pick the service you want to see. The demo runs on your own systems and data, not a generic script.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="border border-[var(--ink)] p-4">
                <span className="font-mono-tech text-xs">01</span>
                <p className="font-semibold mt-1">30-minute call with our team on the service you pick</p>
              </div>
              <div className="border border-[var(--ink)] p-4">
                <span className="font-mono-tech text-xs">02</span>
                <p className="font-semibold mt-1">Walkthrough mapped to your own systems and data</p>
              </div>
              <div className="border border-[var(--ink)] p-4">
                <span className="font-mono-tech text-xs">03</span>
                <p className="font-semibold mt-1">Written pilot proposal if it is a fit</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#/demo" className="btn-swiss t-small">
                <span>Book a demo</span>
                <PixelIcon name="arrow-right" size={13} />
              </a>
              <a href="#/security#request" className="btn-swiss-outline t-small">
                Request the security pack
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
