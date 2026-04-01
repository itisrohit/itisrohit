"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Hero } from "./components/Hero";
import { SelectedOperations } from "./components/SelectedOperations";
import { Capabilities } from "./components/Capabilities";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      let lenis: Lenis | null = null;
      let tickerFn: ((time: number) => void) | null = null;

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-animate]", { clearProps: "all" });
        gsap.set("[data-project-card]", { clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Initialize Lenis (Ken) smooth scroll for a premium, organic feel
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        // Sync GSAP ticker with Lenis raf
        tickerFn = (time: number) => lenis?.raf(time * 1000);
        if (tickerFn) gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        // Update GSAP and ScrollTrigger whenever Lenis scrolls
        lenis?.on("scroll", ScrollTrigger.update);
      });

      return () => {
        mm.revert();
        lenis?.destroy();
        if (tickerFn) gsap.ticker.remove(tickerFn);
      };
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative flex min-h-screen w-full flex-col bg-[#FAF9F6] pb-64 font-sans selection:bg-[#73BEB1] selection:text-white"
    >
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="rough-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="paper-texture" />

      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "150px 150px",
        }}
      />

      <Hero />
      <SelectedOperations />
      <Capabilities />
    </div>
  );
}
