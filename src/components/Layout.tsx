import React, { useEffect, useState } from "react";
import { SERVICE_COLORS, TOKENS } from "../data/glyphs";
import { COMPANY } from "../data/siteData";
import { useMotion } from "./MotionContext";
import { BitmapSvgText, PixelIcon } from "./PixelGraphics";

const NAV_ITEMS = [
  { label: "Solutions", href: "#/ai" },
  { label: "Industries", href: "#/industries" },
  { label: "How we work", href: "#/how-it-works" },
  { label: "Platform", href: "#/platform" },
  { label: "Resources", href: "#/resources" },
];

export function Header({ currentRoute }: { currentRoute: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => document.documentElement.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentRoute]);

  const isActive = (href: string) => {
    const clean = href.replace("#", "");
    if (clean === "/") return currentRoute === "/";
    return currentRoute.startsWith(clean);
  };

  return (
    <>
      <header
        data-surface="sodium"
        className="fixed top-0 left-0 right-0 h-[var(--header-h)] z-50 border-b border-[var(--ink)] flex items-center"
      >
        <div className="swiss-container flex items-center justify-between gap-8">
          {/* Zone 1: Single wordmark */}
          <a
            href="#/"
            aria-label="applyd.ai home"
            className="inline-flex items-center py-1 shrink-0 whitespace-nowrap"
          >
            <BitmapSvgText
              text="APPLYD.AI"
              cellH={2.4}
              fill="currentColor"
              jitterOnHover
              className="block"
            />
          </a>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`t-small whitespace-nowrap shrink-0 px-1.5 py-1 transition-colors ${
                    active
                      ? "bg-[var(--ink)] text-[var(--sodium)]"
                      : "u-anim text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary CTA on desktop + menu trigger on mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#/demo"
              className="hidden lg:inline-flex btn-swiss btn-sm t-small"
            >
              <span>Book a demo</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open navigation menu"
              className="lg:hidden min-h-[44px] min-w-[44px] px-3 border border-[var(--ink)] text-sm font-semibold whitespace-nowrap"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay Menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-surface="sodium"
          className="fixed inset-0 z-[90] flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b border-[var(--ink)] pb-4">
            <a href="#/" onClick={() => setMenuOpen(false)}>
              <BitmapSvgText text="APPLYD.AI" cellH={2.4} fill="currentColor" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] min-w-[44px] px-3 border border-[var(--ink)] text-sm font-semibold"
            >
              Close
            </button>
          </div>

          <nav className="my-8 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="t-h2 py-1 border-b border-[var(--ink)]/25"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#/security"
              onClick={() => setMenuOpen(false)}
              className="t-h2 py-1 border-b border-[var(--ink)]/25"
            >
              Security
            </a>
            <a
              href="#/pilot-fit"
              onClick={() => setMenuOpen(false)}
              className="t-h2 py-1 border-b border-[var(--ink)]/25"
            >
              Pilot fit check
            </a>
          </nav>

          <div className="pt-4 border-t border-[var(--ink)] flex flex-col gap-4">
            <a
              href="#/demo"
              onClick={() => setMenuOpen(false)}
              className="btn-swiss t-small w-full justify-center"
            >
              <span>Book a demo</span>
            </a>
            <p className="t-micro font-mono-tech">{COMPANY.email}</p>
          </div>
        </div>
      )}
    </>
  );
}

export function FloatingSectionControls({ route }: { route: string }) {
  const [surface, setSurface] = useState<"sodium" | "paper" | "ink">("sodium");
  const [showTop, setShowTop] = useState(false);
  const [sections, setSections] = useState<Array<{ id: string; label: string }>>([]);
  const [activeLabel, setActiveLabel] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const scan = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("section[data-pager]"));
      setSections(
        els.map((el, idx) => ({
          id: el.id || `sec-${idx}`,
          label: el.dataset.pager || `Section ${idx + 1}`,
        }))
      );
      if (els.length > 0) {
        setActiveLabel(els[0].dataset.pager || "");
      }
    };
    const t = window.setTimeout(scan, 80);
    return () => window.clearTimeout(t);
  }, [route]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 0.8);
      const els = Array.from(document.querySelectorAll<HTMLElement>("section[data-surface]"));
      const probeY = window.innerHeight * 0.55;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          const s = el.dataset.surface as "sodium" | "paper" | "ink";
          if (s) setSurface(s);
          if (el.dataset.pager) setActiveLabel(el.dataset.pager);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [route]);

  const badgeTone =
    surface === "ink"
      ? "bg-[var(--ink)] text-[var(--sodium)] border-[var(--sodium)]"
      : "bg-[var(--paper)] text-[var(--ink)] border-[var(--ink)]";

  return (
    <>
      {sections.length > 1 && (
        <div className="fixed left-[var(--margin)] bottom-4 z-40 hidden md:block">
          {popoverOpen && (
            <div className="mb-2 border border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] p-1.5 min-w-[210px] shadow-none">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setPopoverOpen(false);
                  }}
                  className={`block w-full text-left px-2.5 py-1.5 text-xs font-mono-tech ${
                    activeLabel === sec.label
                      ? "bg-[var(--ink)] text-[var(--sodium)]"
                      : "hover:bg-[var(--sodium)]/40"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setPopoverOpen((v) => !v)}
            className={`px-3 py-1.5 text-xs font-mono-tech border transition-colors ${badgeTone}`}
          >
            ({activeLabel || "Section"}) ↑↓
          </button>
        </div>
      )}

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed right-[var(--margin)] bottom-4 z-40 px-3 py-1.5 text-xs font-mono-tech border transition-colors ${badgeTone}`}
        >
          (Top) ↑
        </button>
      )}
    </>
  );
}

export function Footer() {
  const { motionOn, toggleMotion } = useMotion();
  const [cookieDialogOpen, setCookieDialogOpen] = useState(false);
  const [consentChoice, setConsentChoice] = useState<string>(() => {
    try {
      return window.localStorage.getItem("applyd-consent") || "unset";
    } catch {
      return "unset";
    }
  });

  const saveConsent = (val: "accepted" | "rejected") => {
    setConsentChoice(val);
    try {
      window.localStorage.setItem("applyd-consent", val);
    } catch {
      // ignore
    }
    setCookieDialogOpen(false);
  };

  const stairCells = 96;

  return (
    <footer
      data-surface="ink"
      className="border-t border-[var(--sodium)] pt-14 md:pt-20 overflow-hidden"
    >
      <div className="swiss-container">
        <div className="pb-10 border-b border-[var(--sodium)]/35">
          <BitmapSvgText
            text="APPLYD.AI"
            cellH={10}
            fill={TOKENS.sodium}
            fluid
            className="block w-full max-w-5xl"
          />
          <p className="t-lead text-[var(--paper)] mt-6 max-w-2xl">
            {COMPANY.tagline}
          </p>
        </div>

        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 border-b border-[var(--sodium)]/35">
          <div>
            <p className="font-mono-tech text-xs text-[var(--sodium)] mb-3">Product</p>
            <ul className="space-y-2 text-sm text-[var(--paper)]">
              <li><a href="#/how-it-works" className="u-anim">How it works</a></li>
              <li><a href="#/platform" className="u-anim">Platform</a></li>
              <li><a href="#/pilot-fit" className="u-anim">Pilot fit check</a></li>
              <li><a href="#/faq" className="u-anim">FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tech text-xs text-[var(--sodium)] mb-3">Industries</p>
            <ul className="space-y-2 text-sm text-[var(--paper)]">
              <li><a href="#/industries" className="u-anim">All 20 industries</a></li>
              <li><a href="#/industries/saas" className="u-anim">SaaS</a></li>
              <li><a href="#/industries/financial-services" className="u-anim">Financial services</a></li>
              <li><a href="#/industries/insurance" className="u-anim">Insurance</a></li>
              <li><a href="#/industries/healthcare" className="u-anim">Healthcare</a></li>
              <li><a href="#/industries/legal" className="u-anim">Legal</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tech text-xs text-[var(--sodium)] mb-3">Industrial & Video</p>
            <ul className="space-y-2 text-sm text-[var(--paper)]">
              <li><a href="#/ai/video-ai" className="u-anim">Video AI</a></li>
              <li><a href="#/industrial" className="u-anim">Industrial applications</a></li>
              <li><a href="#/ai/physical-ai" className="u-anim">Physical AI</a></li>
              <li><a href="#/ai/ot-cybersecurity" className="u-anim">OT cybersecurity</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tech text-xs text-[var(--sodium)] mb-3">AI services</p>
            <ul className="space-y-2 text-sm text-[var(--paper)]">
              <li><a href="#/ai" className="u-anim">AI development</a></li>
              <li><a href="#/ai/agent-development" className="u-anim">AI agent development</a></li>
              <li><a href="#/ai/generative-ai" className="u-anim">Generative AI</a></li>
              <li><a href="#/ai/llm-integration" className="u-anim">LLM & RAG</a></li>
              <li><a href="#/ai/chatbots" className="u-anim">AI chatbots</a></li>
              <li><a href="#/ai/consulting" className="u-anim">AI consulting</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tech text-xs text-[var(--sodium)] mb-3">Resources</p>
            <ul className="space-y-2 text-sm text-[var(--paper)]">
              <li><a href="#/resources" className="u-anim">All guides</a></li>
              <li><a href="#/resources/speed-to-lead" className="u-anim">Speed to lead</a></li>
              <li><a href="#/resources/handoff-rules" className="u-anim">Hand-off rules</a></li>
              <li><a href="#/resources/evaluating-ai-sdr-vendors" className="u-anim">Vendor checklist</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tech text-xs text-[var(--sodium)] mb-3">Trust & contact</p>
            <ul className="space-y-2 text-sm text-[var(--paper)]">
              <li><a href="#/security" className="u-anim">Security</a></li>
              <li><a href="#/security#request" className="u-anim">Request NDA pack</a></li>
              <li><a href="#/demo" className="u-anim">Book a demo</a></li>
              <li><a href={`mailto:${COMPANY.email}`} className="u-anim">{COMPANY.email}</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & Motion Controls */}
        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-[var(--sodium)]">
          <div className="space-y-1">
            <p>{COMPANY.copyright}</p>
            <p className="opacity-80">
              {COMPANY.legalName}, registered in {COMPANY.jurisdiction} (no. {COMPANY.companyNumber}). Registered office: {COMPANY.address}.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono-tech">
            <a href="#/privacy" className="u-anim">Privacy</a>
            <a href="#/terms" className="u-anim">Terms</a>
            <a href="#/cookies" className="u-anim">Cookies</a>
            <button
              type="button"
              onClick={() => setCookieDialogOpen((v) => !v)}
              className="u-anim underline"
            >
              Cookie settings ({consentChoice})
            </button>
            <button
              type="button"
              onClick={toggleMotion}
              aria-pressed={motionOn}
              className="px-2.5 py-1 border border-[var(--sodium)] text-[var(--sodium)] hover:bg-[var(--sodium)] hover:text-[var(--ink)]"
            >
              Motion: {motionOn ? "on" : "off"}
            </button>
          </div>
        </div>

        {cookieDialogOpen && (
          <div className="mb-8 p-4 border border-[var(--sodium)] bg-[var(--paper)] text-[var(--ink)] flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-xl text-sm">
              <p className="font-semibold">Cookie & analytics settings</p>
              <p className="mt-1">
                No analytics cookies are set unless you accept Google Analytics 4. Advertising storage is always denied.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => saveConsent("rejected")}
                className="btn-swiss-outline btn-sm text-xs"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="btn-swiss btn-sm text-xs"
              >
                <span>Accept analytics</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Signature 4-color Pixel Staircase Strip */}
      <svg
        className="w-full h-3 block pixel-crisp"
        viewBox={`0 0 ${stairCells} 1`}
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {Array.from({ length: stairCells }).map((_, i) => (
          <rect
            key={i}
            x={i}
            y="0"
            width="1"
            height="1"
            fill={SERVICE_COLORS[Math.floor(i / 4) % 4]}
          />
        ))}
      </svg>
    </footer>
  );
}

export function PageCTA({
  surface = "sodium",
}: {
  surface?: "sodium" | "paper" | "ink";
}) {
  return (
    <section data-surface={surface} className="sec-pad border-t border-[var(--rule-color)]">
      <div className="swiss-grid items-center gap-y-6">
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <p className="t-micro font-mono-tech">(Next step)</p>
        </div>
        <div className="col-span-4 md:col-span-4 lg:col-span-8 space-y-5">
          <h2 className="t-h2" data-gsap-clip>
            See applyd.ai on your own data and conversations.
          </h2>
          <p className="t-body max-w-2xl">
            Pick the service you want to see. A 30-minute call mapped to your own systems, CRM, cameras or equipment — followed by a written pilot proposal if it is a fit.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#/demo" className="btn-swiss t-small">
              <span>Book a demo</span>
              <PixelIcon name="arrow-right" size={13} />
            </a>
            <a href="#/security#request" className="btn-swiss-outline t-small">
              Request NDA security pack
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
