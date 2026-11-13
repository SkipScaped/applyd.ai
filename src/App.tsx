import React, { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedFavicon } from "./components/AnimatedFavicon";
import {
  FloatingSectionControls,
  Footer,
  Header,
  PageCTA,
} from "./components/Layout";
import { MotionProvider } from "./components/MotionContext";
import { TrailCanvas, WipeOverlay } from "./components/PixelGraphics";
import { HomePage } from "./pages/HomePage";
import {
  HowItWorksPage,
  PlatformPage,
  SecurityPage,
} from "./pages/HowItWorksAndPlatformPages";
import {
  IndustriesDirectoryPage,
  IndustryDetailPage,
} from "./pages/IndustriesPages";
import {
  AiHubPage,
  AiServiceDetailPage,
  IndustrialHubPage,
  VideoAiSectorPage,
} from "./pages/ServicesPages";
import {
  DemoPage,
  FaqPage,
  LegalPage,
  PilotFitPage,
  ResourcesPage,
} from "./pages/ToolsAndInfoPages";

interface ParsedRoute {
  path: string;
  anchor: string;
  params: URLSearchParams;
}

function parseHash(rawHash: string): ParsedRoute {
  let clean = rawHash.startsWith("#") ? rawHash.slice(1) : rawHash;
  if (!clean) clean = "/";

  let anchor = "";
  const hashIdx = clean.indexOf("#");
  if (hashIdx !== -1) {
    anchor = clean.slice(hashIdx + 1);
    clean = clean.slice(0, hashIdx);
  }

  let queryStr = "";
  const qIdx = clean.indexOf("?");
  if (qIdx !== -1) {
    queryStr = clean.slice(qIdx + 1);
    clean = clean.slice(0, qIdx);
  }

  if (!clean.startsWith("/")) clean = "/" + clean;
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);

  return {
    path: clean,
    anchor,
    params: new URLSearchParams(queryStr),
  };
}

function AppShell() {
  const [activeHash, setActiveHash] = useState<string>(() =>
    window.location.hash || "#/"
  );
  const [pendingHash, setPendingHash] = useState<string>(activeHash);
  const [wipeTrigger, setWipeTrigger] = useState<number>(0);

  useEffect(() => {
    const onHashChange = () => {
      const next = window.location.hash || "#/";
      const curParsed = parseHash(activeHash);
      const nextParsed = parseHash(next);

      if (curParsed.path === nextParsed.path && nextParsed.anchor) {
        setActiveHash(next);
        window.setTimeout(() => {
          document.getElementById(nextParsed.anchor)?.scrollIntoView({ behavior: "smooth" });
        }, 40);
        return;
      }

      setPendingHash(next);
      setWipeTrigger((n) => n + 1);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [activeHash]);

  const handleWipeMidpoint = useCallback(() => {
    setActiveHash(pendingHash);
    const parsed = parseHash(pendingHash);
    window.setTimeout(() => {
      if (parsed.anchor) {
        const el = document.getElementById(parsed.anchor);
        if (el) {
          el.scrollIntoView({ behavior: "auto" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      ScrollTrigger.refresh();
    }, 30);
  }, [pendingHash]);

  const { path, anchor, params } = parseHash(activeHash);

  useEffect(() => {
    const labelMap: Record<string, string> = {
      "/": "applyd.ai — Physical AI, Video AI, AI Agents & OT Security",
      "/how-it-works": "How it works — applyd.ai",
      "/platform": "Platform & Audit Controls — applyd.ai",
      "/security": "Security & NDA Pack — applyd.ai",
      "/ai": "Solutions & Custom AI — applyd.ai",
      "/industrial": "Industrial Applications — applyd.ai",
      "/industries": "Industries — applyd.ai",
      "/pilot-fit": "Pilot Fit Check — applyd.ai",
      "/demo": "Book a Demo — applyd.ai",
      "/resources": "Resources — applyd.ai",
      "/faq": "FAQ — applyd.ai",
      "/privacy": "Privacy — applyd.ai",
      "/terms": "Terms — applyd.ai",
      "/cookies": "Cookies — applyd.ai",
    };
    document.title = labelMap[path] || "applyd.ai — AI Agents & Industrial AI";
  }, [path]);

  const renderPage = () => {
    if (path === "/" || path === "") return <HomePage />;
    if (path === "/how-it-works") return <HowItWorksPage />;
    if (path === "/platform") return <PlatformPage />;
    if (path === "/security") {
      return <SecurityPage initialFocusRequest={anchor === "request"} />;
    }
    if (path === "/ai") return <AiHubPage />;
    if (path.startsWith("/ai/video-ai/")) {
      const sector = path.replace("/ai/video-ai/", "");
      return <VideoAiSectorPage sectorSlug={sector} />;
    }
    if (path.startsWith("/ai/")) {
      const slug = path.replace("/ai/", "");
      return <AiServiceDetailPage slug={slug} />;
    }
    if (path === "/industrial") return <IndustrialHubPage />;
    if (path.startsWith("/industrial/")) {
      const sector = path.replace("/industrial/", "");
      return <IndustrialHubPage sectorSlug={sector} />;
    }
    if (path === "/industries") return <IndustriesDirectoryPage />;
    if (path.startsWith("/industries/")) {
      const slug = path.replace("/industries/", "");
      return <IndustryDetailPage slug={slug} />;
    }
    if (path === "/pilot-fit") return <PilotFitPage />;
    if (path === "/demo") {
      return (
        <DemoPage
          serviceParam={params.get("service") || ""}
          fitParam={params.get("fit") || ""}
        />
      );
    }
    if (path === "/resources") return <ResourcesPage />;
    if (path.startsWith("/resources/")) {
      const slug = path.replace("/resources/", "");
      return <ResourcesPage articleSlug={slug} />;
    }
    if (path === "/faq") return <FaqPage />;
    if (path === "/privacy") return <LegalPage kind="privacy" />;
    if (path === "/terms") return <LegalPage kind="terms" />;
    if (path === "/cookies") return <LegalPage kind="cookies" />;
    return <HomePage />;
  };

  const hideBottomCTA = path === "/" || path === "/demo" || path === "/security";

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedFavicon currentRoute={path} />
      <Header currentRoute={path} />
      <TrailCanvas />
      <WipeOverlay triggerKey={wipeTrigger} onMidpoint={handleWipeMidpoint} />
      <main id="main-content" className="flex-1">
        {renderPage()}
        {!hideBottomCTA && <PageCTA surface="sodium" />}
      </main>
      <Footer />
      <FloatingSectionControls route={path} />
    </div>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <AppShell />
    </MotionProvider>
  );
}
