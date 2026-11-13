import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { hashStr, makeRng, TOKENS } from "../data/glyphs";
import {
  AGENT_STAGES,
  CONVERSATION_REPLAY,
  HOME_INDUSTRY_EXAMPLES,
} from "../data/siteData";
import { useMotion } from "./MotionContext";
import { PixelIcon } from "./PixelGraphics";

// 1. Physical AI Multi-Sensor Waveform Simulator (P-204, HX-204, C-108, M-410)
const SENSOR_ASSETS = [
  {
    id: "p-204",
    name: "P-204 · Process pump",
    metrics: [
      { label: "Vibration", base: "2.4 mm/s", fault: "3.3 mm/s (+38%)" },
      { label: "Motor current", base: "16.1 A", fault: "18.4 A (+14%)" },
      { label: "Discharge pressure", base: "4.2 bar", fault: "3.7 bar (-12%)" },
    ],
    diagnosis: "Bearing vibration +38% vs baseline with rising motor current — possible early bearing wear, engineer to check.",
  },
  {
    id: "hx-204",
    name: "HX-204 · Heat exchanger",
    metrics: [
      { label: "Cooling flow", base: "42 m³/h", fault: "51 m³/h (+21%)" },
      { label: "Pressure drop", base: "0.8 bar", fault: "1.3 bar (+62%)" },
      { label: "Process outlet", base: "45 °C", fault: "45 °C (steady)" },
    ],
    diagnosis: "Outlet temperature held steady only because cooling flow and pressure drop rose together — consistent with developing fouling.",
  },
  {
    id: "c-108",
    name: "C-108 · Compressor",
    metrics: [
      { label: "Bearing temp", base: "64 °C", fault: "79 °C (+15 °C)" },
      { label: "Suction pressure", base: "2.1 bar", fault: "1.8 bar (-14%)" },
      { label: "Frame vibration", base: "1.9 mm/s", fault: "2.9 mm/s (+52%)" },
    ],
    diagnosis: "Multi-signal divergence at comparable load — possible valve wear or misalignment for reliability review.",
  },
  {
    id: "m-410",
    name: "M-410 · Drive motor",
    metrics: [
      { label: "Phase current", base: "28.4 A", fault: "32.1 A (+13%)" },
      { label: "Winding temp", base: "71 °C", fault: "84 °C (+13 °C)" },
      { label: "Axial vibration", base: "1.6 mm/s", fault: "2.4 mm/s (+50%)" },
    ],
    diagnosis: "Thermal and axial vibration pattern departing from load baseline — maintenance inspection recommended.",
  },
];

export function PhysicalAISimulator() {
  const { motionOn } = useMotion();
  const [assetIdx, setAssetIdx] = useState(0);
  const [faultActive, setFaultActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [channel, setChannel] = useState<"Dashboard" | "Email" | "Slack" | "Push">("Dashboard");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const faultFactorRef = useRef({ val: 0 });
  const phaseRef = useRef(0);

  const asset = SENSOR_ASSETS[assetIdx];

  useEffect(() => {
    gsap.to(faultFactorRef.current, {
      val: faultActive ? 1 : 0,
      duration: motionOn ? 0.7 : 0.01,
      ease: "power2.out",
    });
  }, [faultActive, motionOn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;

      if (!paused && motionOn) {
        phaseRef.current += 0.045;
      }

      ctx.fillStyle = TOKENS.ink;
      ctx.fillRect(0, 0, w, h);

      // Pixel grid lines
      ctx.strokeStyle = "rgba(243, 172, 240, 0.16)";
      ctx.lineWidth = 1;
      const step = 24;
      for (let x = step; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = step; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const f = faultFactorRef.current.val;
      const midY = h * 0.56;
      const ph = phaseRef.current;

      // Dashed operating baseline
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = TOKENS.sodium;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const t = x / w;
        const y = midY + Math.sin(t * 10 + ph) * 14 + Math.cos(t * 4) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Observed multi-signal curve (diverges upward with jagged harmonics under fault)
      ctx.strokeStyle = f > 0.35 ? TOKENS.coral : TOKENS.mint;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const t = x / w;
        const drift = f * (t * 44 + Math.sin(t * 28 + ph * 2.2) * 14);
        const y = midY + Math.sin(t * 10 + ph) * 14 + Math.cos(t * 4) * 5 - drift;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary process signal
      ctx.strokeStyle = TOKENS.pink;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const t = x / w;
        const y = h * 0.78 + Math.cos(t * 8 + ph * 0.8) * 8 - f * t * 18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    gsap.ticker.add(draw);
    return () => {
      gsap.ticker.remove(draw);
      ro.disconnect();
    };
  }, [paused, motionOn, assetIdx]);

  return (
    <div className="border border-[var(--rule-color)] bg-[var(--paper)] text-[var(--ink)]">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-[var(--ink)] bg-[var(--sodium)]">
        <div className="flex flex-wrap items-center gap-2">
          {SENSOR_ASSETS.map((a, idx) => (
            <button
              key={a.id}
              type="button"
              onClick={() => {
                setAssetIdx(idx);
                setFaultActive(false);
              }}
              aria-pressed={assetIdx === idx}
              className={`px-3 py-1.5 text-xs font-semibold border border-[var(--ink)] transition-colors ${
                assetIdx === idx
                  ? "bg-[var(--ink)] text-[var(--sodium)]"
                  : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFaultActive((v) => !v)}
            className={`px-3 py-1.5 text-xs font-semibold border border-[var(--ink)] ${
              faultActive ? "bg-[var(--coral)] text-[var(--ink)]" : "bg-[var(--ink)] text-[var(--paper)]"
            }`}
          >
            {faultActive ? "Fault simulated" : "Simulate developing fault"}
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume waveform" : "Pause waveform"}
            className="px-2.5 py-1.5 text-xs font-mono-tech border border-[var(--ink)] bg-[var(--paper)]"
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            onClick={() => {
              setFaultActive(false);
              setPaused(false);
            }}
            className="px-2.5 py-1.5 text-xs font-mono-tech border border-[var(--ink)] bg-[var(--paper)]"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 p-4 border-b lg:border-b-0 lg:border-r border-[var(--ink)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-mono-tech">
            <span>{asset.name} · Multi-signal vs baseline</span>
            <span className="flex items-center gap-4">
              <span>— — Baseline</span>
              <span className={faultActive ? "text-[var(--coral)] font-semibold" : "text-[var(--green)] font-semibold"}>
                ─── Observed ({faultActive ? "Out of range" : "Normal"})
              </span>
            </span>
          </div>
          <canvas ref={canvasRef} className="w-full h-48 md:h-56 block border border-[var(--ink)]" />
        </div>

        <div className="lg:col-span-4 p-4 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <p className="t-micro font-mono-tech uppercase tracking-wider">Readings (Simulated)</p>
            {asset.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between border-b border-[var(--ink)]/20 pb-2">
                <span className="t-small">{m.label}</span>
                <span className={`font-mono-tech text-sm font-semibold ${faultActive ? "text-[var(--coral)]" : "text-[var(--ink)]"}`}>
                  {faultActive ? m.fault : m.base}
                </span>
              </div>
            ))}
          </div>

          <div className={`p-3 border border-[var(--ink)] ${faultActive ? "bg-[var(--coral)]/20" : "bg-[var(--sodium)]/35"}`}>
            <p className="text-xs font-mono-tech font-semibold mb-1">
              {faultActive ? `ALERT → ${channel}` : "STATUS: BASELINE OPERATION"}
            </p>
            <p className="text-sm leading-snug">
              {faultActive ? asset.diagnosis : "Observed readings track the load-aware operating baseline. No alert raised."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <span className="text-xs font-mono-tech mr-1">Route:</span>
            {(["Dashboard", "Email", "Slack", "Push"] as const).map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setChannel(ch)}
                aria-pressed={channel === ch}
                className={`px-2 py-1 text-xs font-mono-tech border border-[var(--ink)] ${
                  channel === ch ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--paper)]"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Video AI Camera Zone Raster & Event Log Simulator
const VIDEO_EVENTS = [
  { time: "06:05", cam: "Cam 02 · Press 2", rule: "Guard closed while running", alert: "Access door open while cycling", owner: "Cell supervisor", box: { x: 18, y: 26, w: 28, h: 42 }, level: "alert" },
  { time: "06:50", cam: "Cam 07 · Packing bay", rule: "Safety glasses required", alert: "Person in glasses zone without PPE", owner: "Shift lead", box: { x: 54, y: 30, w: 22, h: 48 }, level: "alert" },
  { time: "09:12", cam: "Cam 03 · Line 3", rule: "Stoppage > 5 min", alert: "Line stopped 5 min — asked operator reason", owner: "Line 3 operator", box: { x: 35, y: 40, w: 34, h: 30 }, level: "query" },
  { time: "13:40", cam: "Cam 04 · Aisle 4", rule: "Forklift separation", alert: "Near-miss logged: pedestrian inside 2m margin", owner: "Safety lead", box: { x: 42, y: 34, w: 36, h: 38 }, level: "alert" },
  { time: "14:02", cam: "Cam 04 · Restricted zone", rule: "Permit required", alert: "Person entering restricted process zone", owner: "Shift supervisor", box: { x: 24, y: 28, w: 24, h: 52 }, level: "alert" },
  { time: "14:15", cam: "Review queue", rule: "Human sign-off", alert: "Safety lead reviewed clips & closed log", owner: "Reviewed", box: { x: 10, y: 20, w: 80, h: 60 }, level: "ok" },
];

export function VideoAISimulator() {
  const { motionOn } = useMotion();
  const [stepIdx, setStepIdx] = useState(4);
  const [playing, setPlaying] = useState(false);
  const [blurFaces, setBlurFaces] = useState(true);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);

  const cur = VIDEO_EVENTS[stepIdx];

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStepIdx((i) => (i + 1) % VIDEO_EVENTS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (!motionOn || !boxRef.current) return;
    gsap.fromTo(
      boxRef.current,
      { scale: 1.08, opacity: 0.4 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "steps(4)" }
    );
  }, [stepIdx, motionOn]);

  useEffect(() => {
    if (!motionOn || !scanRef.current) return;
    const tween = gsap.to(scanRef.current, {
      yPercent: 900,
      duration: 2.8,
      repeat: -1,
      ease: "none",
    });
    return () => {
      tween.kill();
    };
  }, [motionOn]);

  return (
    <div className="border border-[var(--rule-color)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-[var(--sodium)]">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-xs font-mono-tech bg-[var(--green)] text-[var(--ink)] font-semibold">
            RTSP / ONVIF (Scripted)
          </span>
          <span className="font-mono-tech text-xs text-[var(--sodium)]">{cur.cam} · {cur.time}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setBlurFaces((b) => !b)}
            aria-pressed={blurFaces}
            className="px-2.5 py-1 text-xs font-mono-tech border border-[var(--sodium)] text-[var(--sodium)] hover:bg-[var(--sodium)] hover:text-[var(--ink)]"
          >
            {blurFaces ? "Face blur: ON" : "Face blur: OFF"}
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="px-3 py-1 text-xs font-mono-tech border border-[var(--paper)] bg-[var(--paper)] text-[var(--ink)] font-semibold inline-flex items-center gap-1.5"
          >
            <PixelIcon name={playing ? "pause" : "play"} size={10} />
            {playing ? "Pause" : "Play log"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStepIdx((i) => (i + 1) % VIDEO_EVENTS.length);
            }}
            className="px-3 py-1 text-xs font-mono-tech border border-[var(--sodium)] text-[var(--sodium)]"
          >
            Step ({stepIdx + 1}/{VIDEO_EVENTS.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-4 border-b lg:border-b-0 lg:border-r border-[var(--sodium)]/40">
          <div className="relative w-full aspect-[16/9] bg-[#141414] border border-[var(--sodium)] overflow-hidden">
            {/* Pixel-raster factory floor backdrop */}
            <svg viewBox="0 0 32 18" className="w-full h-full opacity-40 pixel-crisp" shapeRendering="crispEdges">
              <rect x="0" y="13" width="32" height="5" fill="#2370E8" fillOpacity="0.25" />
              <rect x="2" y="4" width="8" height="9" fill="#2BA676" fillOpacity="0.25" />
              <rect x="13" y="3" width="9" height="10" fill="#A98BF7" fillOpacity="0.2" />
              <rect x="24" y="5" width="6" height="8" fill="#D873B3" fillOpacity="0.25" />
              <line x1="0" y1="13" x2="32" y2="13" stroke={TOKENS.sodium} strokeWidth="0.15" strokeDasharray="0.6 0.4" />
            </svg>

            {/* Restricted zone polygon hatch */}
            <div
              className="absolute inset-x-[12%] bottom-[12%] top-[22%] border border-dashed border-[var(--coral)]/70 pointer-events-none"
              aria-hidden="true"
            >
              <span className="absolute top-1 left-1.5 text-[10px] font-mono-tech text-[var(--coral)]">
                RESTRICTED ZONE
              </span>
            </div>

            {/* GSAP scanline */}
            <div
              ref={scanRef}
              className="absolute left-0 right-0 top-0 h-[10%] bg-gradient-to-b from-[var(--green)]/20 to-transparent pointer-events-none"
            />

            {/* Tracked event bounding box */}
            <div
              ref={boxRef}
              style={{
                left: `${cur.box.x}%`,
                top: `${cur.box.y}%`,
                width: `${cur.box.w}%`,
                height: `${cur.box.h}%`,
              }}
              className={`absolute border-2 transition-all duration-300 ${
                cur.level === "ok" ? "border-[var(--mint)]" : "border-[var(--coral)]"
              }`}
            >
              <div
                className={`px-1.5 py-0.5 text-[10px] font-mono-tech font-semibold inline-block ${
                  cur.level === "ok" ? "bg-[var(--mint)] text-[var(--ink)]" : "bg-[var(--coral)] text-[var(--ink)]"
                }`}
              >
                {cur.time} · {cur.rule}
              </div>
              {blurFaces && (
                <div className="w-5 h-5 mx-auto mt-2 bg-[var(--paper)]/25 backdrop-blur-sm border border-[var(--paper)]/40" />
              )}
            </div>
          </div>
          <p className="mt-2 text-xs font-mono-tech text-[var(--sodium)]/80">
            Edge / private cloud processing · Raw video stays on site · {cur.alert}
          </p>
        </div>

        <div className="lg:col-span-5 divide-y divide-[var(--sodium)]/30">
          {VIDEO_EVENTS.map((ev, i) => (
            <button
              key={ev.time + ev.cam}
              type="button"
              onClick={() => {
                setPlaying(false);
                setStepIdx(i);
              }}
              className={`w-full text-left p-3 flex items-start justify-between gap-3 transition-colors ${
                i === stepIdx ? "bg-[var(--sodium)] text-[var(--ink)]" : "hover:bg-[var(--paper)]/10"
              }`}
            >
              <div>
                <p className="text-xs font-mono-tech font-semibold">
                  {ev.time} · {ev.cam}
                </p>
                <p className="text-sm font-medium mt-0.5">{ev.alert}</p>
              </div>
              <span className="text-xs font-mono-tech shrink-0 border border-current px-1.5 py-0.5">
                {ev.owner}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. AI Agent 5-Stage & Conversation Hand-off Replay
export function AgentsPipelineReplay() {
  const { motionOn } = useMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [filter, setFilter] = useState<"All" | "Agent" | "Person" | "Outcome">("All");
  const listRef = useRef<HTMLDivElement | null>(null);

  const visibleSteps = CONVERSATION_REPLAY.steps.filter(
    (s) => filter === "All" || s.actor === filter
  );

  useEffect(() => {
    if (!motionOn || !listRef.current) return;
    const rows = listRef.current.querySelectorAll("[data-replay-step]");
    gsap.fromTo(
      rows,
      { x: -12, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.28, stagger: 0.06, ease: "power2.out" }
    );
  }, [filter, motionOn]);

  return (
    <div className="space-y-8">
      {/* 5-Stage Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-[var(--ink)] bg-[var(--paper)]">
        {AGENT_STAGES.map((st, idx) => {
          const active = idx === activeStage;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`p-4 text-left border-b lg:border-b-0 lg:border-r last:border-r-0 last:border-b-0 border-[var(--ink)] transition-colors flex flex-col justify-between gap-3 ${
                active ? "bg-[var(--blue)] text-[var(--paper)]" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--sodium)]/40"
              }`}
            >
              <div>
                <p className="font-mono-tech text-xs opacity-80">{st.num}</p>
                <h3 className="text-lg font-semibold mt-1">{st.name}</h3>
                <p className="text-sm mt-2 opacity-90">{st.desc}</p>
              </div>
              <p className="font-mono-tech text-xs pt-2 border-t border-current/25">{st.meta}</p>
            </button>
          );
        })}
      </div>

      <div className="p-4 border border-[var(--ink)] bg-[var(--sodium)]/40">
        <p className="t-micro font-mono-tech uppercase">Stage detail · {AGENT_STAGES[activeStage].name}</p>
        <p className="t-body mt-1">{AGENT_STAGES[activeStage].detail}</p>
      </div>

      {/* Conversation Replay */}
      <div className="border border-[var(--ink)] bg-[var(--paper)]">
        <div className="p-4 border-b border-[var(--ink)] flex flex-wrap items-center justify-between gap-4 bg-[var(--sodium)]">
          <div>
            <p className="font-mono-tech text-xs">
              EXAMPLE RECORD · FIT SCORE {CONVERSATION_REPLAY.fitScore} · {CONVERSATION_REPLAY.outcome.toUpperCase()}
            </p>
            <h3 className="t-lead font-semibold mt-1">
              {CONVERSATION_REPLAY.lead} · {CONVERSATION_REPLAY.company} — {CONVERSATION_REPLAY.subject}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {(["All", "Agent", "Person", "Outcome"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`px-3 py-1.5 text-xs font-mono-tech border border-[var(--ink)] ${
                  filter === f ? "bg-[var(--ink)] text-[var(--sodium)]" : "bg-[var(--paper)] text-[var(--ink)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div ref={listRef} className="divide-y divide-[var(--ink)]">
          {visibleSteps.map((step) => (
            <div
              key={step.id}
              data-replay-step
              className="p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
            >
              <div className="md:col-span-2 flex items-center gap-2 font-mono-tech text-xs">
                <span>{step.time}</span>
                <span>·</span>
                <span
                  className={`px-1.5 py-0.5 font-semibold ${
                    step.actor === "Person"
                      ? "bg-[var(--coral)] text-[var(--ink)]"
                      : step.actor === "Outcome"
                      ? "bg-[var(--green)] text-[var(--ink)]"
                      : "bg-[var(--blue)] text-[var(--paper)]"
                  }`}
                >
                  {step.actor}
                </span>
              </div>
              <div className="md:col-span-6">
                <p className="font-semibold text-base">{step.title}</p>
                <p className="text-sm mt-1 text-[var(--ink)]/85">{step.detail}</p>
              </div>
              <div className="md:col-span-4 md:text-right font-mono-tech text-xs text-[var(--ink)]/80">
                {step.rule}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. OT Security Passive Asset Discovery Topology
const OT_ASSETS = [
  { id: "PLC-12", zone: "Cell 3 · IEC 62443 L1", method: "Passive", status: "New remote session", vendor: "Remote contractor VPN · 10.42.8.19", risk: "Flagged" },
  { id: "HMI-04", zone: "Cell 3 · IEC 62443 L2", method: "Passive", status: "Known baseline", vendor: "Local operator panel only", risk: "Normal" },
  { id: "SW-02", zone: "Line 1 · Conduit", method: "Passive", status: "Known baseline", vendor: "Managed switch · ACL verified", risk: "Normal" },
  { id: "GW-09", zone: "DMZ · IT/OT Boundary", method: "Passive", status: "Firmware drift noted", vendor: "Data diode outbound to historian", risk: "Review" },
];

export function OTSecurityMatrix() {
  const { motionOn } = useMotion();
  const [selected, setSelected] = useState(0);
  const sweepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!motionOn || !sweepRef.current) return;
    const tween = gsap.to(sweepRef.current, {
      xPercent: 400,
      duration: 3.2,
      repeat: -1,
      ease: "none",
    });
    return () => {
      tween.kill();
    };
  }, [motionOn]);

  const item = OT_ASSETS[selected];

  return (
    <div className="border border-[var(--rule-color)] bg-[var(--ink)] text-[var(--sodium)]">
      <div className="p-4 border-b border-[var(--sodium)] flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono-tech text-xs">PASSIVE DISCOVERY · ZERO ACTIVE PROBING</span>
        <span className="font-mono-tech text-xs">IEC 62443 · NIST SP 800-82 · NCSC CAF</span>
      </div>
      <div className="relative overflow-hidden p-4 border-b border-[var(--sodium)]/40">
        <div
          ref={sweepRef}
          className="absolute inset-y-0 -left-1/4 w-1/4 bg-gradient-to-r from-transparent via-[var(--lavender)]/20 to-transparent pointer-events-none"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
          {OT_ASSETS.map((a, idx) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelected(idx)}
              className={`p-3 text-left border transition-colors ${
                selected === idx
                  ? "border-[var(--paper)] bg-[var(--lavender)] text-[var(--ink)]"
                  : "border-[var(--sodium)]/60 bg-[var(--ink)] text-[var(--sodium)] hover:border-[var(--paper)]"
              }`}
            >
              <div className="flex items-center justify-between font-mono-tech text-xs">
                <span>{a.id}</span>
                <span>{a.risk}</span>
              </div>
              <p className="font-semibold text-sm mt-2">{a.zone}</p>
              <p className="text-xs mt-1 opacity-85">{a.status}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div>
          <span className="font-mono-tech text-xs block opacity-75">SELECTED ASSET CONDUIT</span>
          <span className="font-semibold">{item.id} — {item.vendor}</span>
        </div>
        <span className="font-mono-tech text-xs border border-[var(--sodium)] px-2.5 py-1">
          Changes scheduled under maintenance change control
        </span>
      </div>
    </div>
  );
}

// 5. Generative AI & RAG Drift Check Stepper (01 Draft -> 02 Check -> 03 Fix -> 04 Approve)
const GEN_STEPS = [
  {
    step: "01 Draft",
    text: "Made for muddy weekend runs. It weighs only 230 g, with a 6 mm drop and a recycled upper that handles wet ground.",
    status: "Unchecked model draft from brief",
    alert: false,
  },
  {
    step: "02 Check",
    text: "Made for muddy weekend runs. It weighs only [230 g ≠ SOURCE 260 g], with a 6 mm drop and a recycled upper that handles wet ground.",
    status: "Automated check caught weight drift (230 g vs source fact 260 g)",
    alert: true,
  },
  {
    step: "03 Fix",
    text: "Made for muddy weekend runs. It weighs 260 g, with a 6 mm drop and a recycled upper that handles wet ground.",
    status: "Regenerated from source fact pack · Schema & claims pass",
    alert: false,
  },
  {
    step: "04 Approve",
    text: "Made for muddy weekend runs. It weighs 260 g, with a 6 mm drop and a recycled upper that handles wet ground.",
    status: "Editor approved & published with provenance metadata",
    alert: false,
  },
];

export function AIDevRagStepper() {
  const [idx, setIdx] = useState(1);
  const cur = GEN_STEPS[idx];

  return (
    <div className="border border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]">
      <div className="p-4 border-b border-[var(--ink)] bg-[var(--sodium)] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-mono-tech text-xs block">BRIEF: TRAIL SHOE, PRODUCT PAGE (SCRIPTED DEMO)</span>
          <span className="text-sm font-semibold">Source facts: Weight 260 g · 6 mm drop · Recycled upper</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {GEN_STEPS.map((s, i) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setIdx(i)}
              className={`px-2.5 py-1 text-xs font-mono-tech border border-[var(--ink)] ${
                idx === i ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--paper)]"
              }`}
            >
              {s.step}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5 space-y-4">
        <p className="t-lead leading-snug">{cur.text}</p>
        <div className={`p-3 border border-[var(--ink)] font-mono-tech text-xs flex flex-wrap items-center justify-between gap-2 ${
          cur.alert ? "bg-[var(--coral)] text-[var(--ink)] font-semibold" : "bg-[var(--mint)]/25"
        }`}>
          <span>{cur.status}</span>
          <button
            type="button"
            onClick={() => setIdx((i) => (i + 1) % GEN_STEPS.length)}
            className="underline font-semibold"
          >
            Next stage →
          </button>
        </div>
      </div>
    </div>
  );
}

// 6. RASTER/27-Style Interactive Poster Wall for 6 Industry Examples
function generatePosterSvgCells(seed: string, accent: string) {
  const rng = makeRng(hashStr(seed));
  const cols = 12;
  const rows = 8;
  const palette = [TOKENS.ink, accent, TOKENS.paper, TOKENS.sodium];
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const pick = rng();
      const fill = pick < 0.45 ? TOKENS.ink : pick < 0.78 ? accent : pick < 0.92 ? TOKENS.paper : TOKENS.sodium;
      cells.push(
        <rect key={`${c}-${r}`} data-pcell="1" x={c * 10} y={r * 10} width="10" height="10" fill={fill} />
      );
    }
  }
  return { cols, rows, cells, palette };
}

export function IndustryPosterWall() {
  const { motionOn } = useMotion();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [regenCounts, setRegenCounts] = useState<number[]>(HOME_INDUSTRY_EXAMPLES.map(() => 0));
  const wallRef = useRef<HTMLDivElement | null>(null);

  const active = HOME_INDUSTRY_EXAMPLES[selectedIdx];

  const handlePosterClick = (idx: number) => {
    setSelectedIdx(idx);
    setRegenCounts((prev) => prev.map((v, i) => (i === idx ? v + 1 : v)));
    if (motionOn && wallRef.current) {
      const card = wallRef.current.querySelector(`[data-poster-idx="${idx}"]`);
      const rects = card?.querySelectorAll("rect[data-pcell]");
      if (rects && rects.length > 0) {
        gsap.fromTo(
          rects,
          { opacity: 0.25 },
          { opacity: 1, duration: 0.25, stagger: { amount: 0.2, from: "random" }, ease: "steps(3)" }
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div ref={wallRef} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 border border-[var(--ink)]">
        {HOME_INDUSTRY_EXAMPLES.map((ind, idx) => {
          const seed = `${ind.posterSeed}-${regenCounts[idx]}`;
          const { cols, rows, cells } = generatePosterSvgCells(seed, ind.accent);
          const isSel = idx === selectedIdx;
          return (
            <button
              key={ind.id}
              type="button"
              data-poster-idx={idx}
              onClick={() => handlePosterClick(idx)}
              className={`group relative text-left border-b border-r border-[var(--ink)] focus-visible:z-10 ${
                isSel ? "ring-2 ring-inset ring-[var(--ink)]" : ""
              }`}
              aria-pressed={isSel}
            >
              <svg
                viewBox={`0 0 ${cols * 10} ${rows * 10}`}
                className="w-full block pixel-crisp"
                shapeRendering="crispEdges"
                aria-hidden="true"
              >
                {cells}
              </svg>
              <div
                className={`px-3 py-2 flex items-center justify-between border-t border-[var(--ink)] ${
                  isSel ? "bg-[var(--ink)] text-[var(--sodium)]" : "bg-[var(--paper)] text-[var(--ink)]"
                }`}
              >
                <span className="text-xs font-semibold">{ind.label}</span>
                <span className="font-mono-tech text-[11px]">0{idx + 1}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-5 border border-[var(--ink)] bg-[var(--sodium)] p-6 flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--ink)]">
            <span className="font-mono-tech text-xs">INDUSTRY EXAMPLE 0{selectedIdx + 1}/06</span>
            <span className="font-mono-tech text-xs">{active.eventTime}</span>
          </div>
          <h3 className="t-h2 mt-4">{active.label}</h3>
          <p className="t-body mt-2">{active.summary}</p>

          <div className="mt-5 p-4 border border-[var(--ink)] bg-[var(--paper)]">
            <p className="font-mono-tech text-xs uppercase text-[var(--ink)]/70">Example event (Illustrative)</p>
            <p className="font-semibold mt-1">{active.eventText}</p>
            <p className="font-mono-tech text-xs mt-2">Sent to: {active.routedTo}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {active.services.map((srv) => (
              <span
                key={srv}
                className="text-xs font-mono-tech px-2 py-1 border border-[var(--ink)] bg-[var(--paper)]"
              >
                {srv}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--ink)]">
          <a href={active.href} className="btn-swiss btn-sm t-small">
            <span>See {active.label}</span>
            <PixelIcon name="arrow-right" size={12} />
          </a>
          <a href="#/industries" className="btn-text t-small u-anim font-semibold">
            All 20 industries →
          </a>
        </div>
      </div>
    </div>
  );
}

// 7. RASTER/27-Style 200-Cell Evaluation & Pilot Telemetry Matrix
export function EvaluationMatrixGrid() {
  const { motionOn } = useMotion();
  const total = 200;
  const cols = 25;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const cellCategory = (i: number) => {
    if (i < 118) return { label: "Handled by agent (eval passed)", color: TOKENS.blue };
    if (i < 164) return { label: "Handed to person (written rule)", color: TOKENS.pink };
    if (i < 186) return { label: "Rep CRM edit kept (edit wins)", color: TOKENS.green };
    return { label: "Pending team review", color: TOKENS.sodium };
  };

  useEffect(() => {
    if (!motionOn || !svgRef.current) return;
    const cells = svgRef.current.querySelectorAll("rect[data-eval-cell]");
    gsap.fromTo(
      cells,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        stagger: { amount: 0.55, from: "start" },
        ease: "steps(4)",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [motionOn]);

  const activeInfo = hoveredIdx !== null ? cellCategory(hoveredIdx) : null;

  return (
    <figure className="w-full">
      <div className="border border-[var(--ink)] bg-[var(--paper)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="font-mono-tech text-xs">
            PILOT EVALUATION MATRIX · 200 SAMPLE CONVERSATIONS (ILLUSTRATIVE)
          </span>
          <span className="font-mono-tech text-xs min-h-[18px]">
            {hoveredIdx !== null && activeInfo
              ? `Record #${String(hoveredIdx + 1).padStart(3, "0")} · ${activeInfo.label}`
              : "Hover or focus any cell to inspect outcome"}
          </span>
        </div>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${cols * 12} ${Math.ceil(total / cols) * 12}`}
          className="w-full block pixel-crisp"
          shapeRendering="crispEdges"
          role="img"
          aria-label="200-cell pilot evaluation matrix showing agent resolved, human hand-off, rep edit preserved, and pending review outcomes"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {Array.from({ length: total }).map((_, i) => {
            const c = i % cols;
            const r = Math.floor(i / cols);
            const cat = cellCategory(i);
            const isOpen = i >= 186;
            return (
              <rect
                key={i}
                data-eval-cell="1"
                x={c * 12 + 1}
                y={r * 12 + 1}
                width="10"
                height="10"
                fill={cat.color}
                stroke={isOpen || hoveredIdx === i ? TOKENS.ink : "none"}
                strokeWidth={hoveredIdx === i ? "1.5" : "0.75"}
                onMouseEnter={() => setHoveredIdx(i)}
                className="cursor-crosshair"
              />
            );
          })}
        </svg>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono-tech">
          <li className="flex items-center gap-2">
            <span className="w-3 h-3 inline-block border border-[var(--ink)]" style={{ backgroundColor: TOKENS.blue }} />
            Agent resolved (118)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-3 h-3 inline-block border border-[var(--ink)]" style={{ backgroundColor: TOKENS.pink }} />
            Handed to person (46)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-3 h-3 inline-block border border-[var(--ink)]" style={{ backgroundColor: TOKENS.green }} />
            Rep edit kept (22)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-3 h-3 inline-block border border-[var(--ink)]" style={{ backgroundColor: TOKENS.sodium }} />
            Pending review (14)
          </li>
        </ul>
      </div>
    </figure>
  );
}
