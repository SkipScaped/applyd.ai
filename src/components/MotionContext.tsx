import React, { createContext, useContext, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MotionContextValue {
  motionOn: boolean;
  setMotionOn: (val: boolean) => void;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextValue>({
  motionOn: true,
  setMotionOn: () => {},
  toggleMotion: () => {},
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motionOn, setMotionOnState] = useState<boolean>(() => {
    try {
      const saved = window.localStorage.getItem("applyd-motion");
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    if (typeof window !== "undefined" && window.matchMedia) {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("motion-on", motionOn);
    try {
      window.localStorage.setItem("applyd-motion", JSON.stringify(motionOn));
    } catch {
      // ignore
    }
    ScrollTrigger.refresh();
  }, [motionOn]);

  const setMotionOn = (val: boolean) => setMotionOnState(Boolean(val));
  const toggleMotion = () => setMotionOnState((prev) => !prev);

  return (
    <MotionContext.Provider value={{ motionOn, setMotionOn, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}

export function useGsapPageChoreography(containerRef: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const { motionOn } = useMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!motionOn) {
      gsap.set(el.querySelectorAll("[data-gsap-clip], [data-gsap-stagger], [data-gsap-rule]"), {
        clearProps: "all",
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Stepped Neo-Swiss clip reveals for headings & key copy
      const clipEls = gsap.utils.toArray<HTMLElement>("[data-gsap-clip]");
      clipEls.forEach((item) => {
        gsap.fromTo(
          item,
          { clipPath: "inset(0 100% 0 0)", opacity: 0.15 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.55,
            ease: "steps(10)",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // Staggered grid items
      const staggerContainers = gsap.utils.toArray<HTMLElement>("[data-gsap-stagger-group]");
      staggerContainers.forEach((group) => {
        const items = group.querySelectorAll("[data-gsap-stagger]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.42,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      // Hairline rule draw-in
      const rules = gsap.utils.toArray<HTMLElement>("[data-gsap-rule]");
      rules.forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.5,
            ease: "steps(8)",
            scrollTrigger: {
              trigger: rule,
              start: "top 92%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [motionOn, ...deps]);
}
