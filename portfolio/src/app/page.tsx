"use client";

import { useRef} from "react";
import Image from "next/image";
import mainPortrait from "../../public/mainpic.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    id: "01",
    name: "SYNTAX_CORE",
    year: "2024",
    tech: "Go / Distributed / gRPC",
    tag: "Realtime Infrastructure",
    result: "42ms median sync window",
    desc: "High-performance distributed engine for real-time massive data synchronization.",
  },
  {
    id: "02",
    name: "QUANTUM_FLOW",
    year: "2023",
    tech: "Node / Bun / Event-driven",
    tag: "Message Systems",
    result: "1.2M async events routed",
    desc: "Low-latency message broker specializing in asynchronous streams and logic handlers.",
  },
  {
    id: "03",
    name: "VOID_SCAN",
    year: "2023",
    tech: "Rust / Security / Micro",
    tag: "Cloud Security",
    result: "Continuous service anomaly scans",
    desc: "Real-time security analyzer built for scanning cloud-scale microservice architectures.",
  },
  {
    id: "04",
    name: "NEURAL_GRID",
    year: "2022",
    tech: "C++ / Vector / Search",
    tag: "Semantic Retrieval",
    result: "Sub-second vector recall",
    desc: "Distributed vector database optimized for high-dimensional semantic search engines.",
  },
] as const;

const capabilities = [
  {
    category: "Protocol",
    code: "P-01",
    summary: "Runtime and language choices for transport, concurrency, and low-level throughput.",
    items: ["Go / gRPC", "Rust Core", "Node.js (Bun)", "C++ Systems"],
  },
  {
    category: "Infrastructure",
    code: "I-02",
    summary: "Data, caching, orchestration, and edge delivery tuned for resilient production systems.",
    items: ["PostgreSQL", "Redis / Memcached", "Docker / K8s", "AWS / Cloudflare Edge"],
  },
  {
    category: "Core Logic",
    code: "L-03",
    summary: "Architectural patterns used to keep high-volume services predictable and maintainable.",
    items: ["Distributed Sync", "Event-driven Arch", "Microservices", "Low-Latency TCP"],
  },
] as const;

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

        // ── Hero entrance ────────────────────────────────────────────────
        const heroTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

        heroTimeline
          .from("[data-hero-backdrop] h1", {
            yPercent: 18,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.12,
          })
          .from(
            "[data-hero-image]",
            {
              y: 36,
              rotate: -2,
              scale: 0.96,
              autoAlpha: 0,
              duration: 1,
            },
            "<0.12",
          )
          .from(
            "[data-hero-meta] > *",
            {
              y: 18,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.08,
            },
            "<0.2",
          );

        // ── Hero parallax ────────────────────────────────────────────────
        gsap.to("[data-hero-image]", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.to("[data-hero-backdrop]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // ── Ambient hero glow ───────────────────────────────────────────
        gsap.to("[data-ambient-glow]", {
          xPercent: 8,
          yPercent: -8,
          repeat: -1,
          yoyo: true,
          duration: 8,
          ease: "sine.inOut",
        });

        // ── Selected Operations: Pin + Card Stack ──────────────────────
        const root = container.current!;
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>("[data-project-card]"),
        );
        const overlays = Array.from(
          root.querySelectorAll<HTMLElement>("[data-project-overlay]"),
        );
        const pinSection = root.querySelector<HTMLElement>("[data-ops-pin]");

        if (!pinSection || cards.length < 2) return;

        // Set initial stacking: card[i+1] slides over card[i] so needs higher z
        cards.forEach((card, i) => {
          gsap.set(card, { zIndex: i + 1 });
          if (i > 0) {
            gsap.set(card, { yPercent: 100, willChange: "transform" });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSection,
            start: "clamp(top top)",
            end: () => `+=${(cards.length - 1) * window.innerHeight}`,
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none", duration: 1 },
        });

        // Sequential pairs: one full timeline unit per card transition
        for (let i = 0; i < cards.length - 1; i++) {
          const label = `step-${i}`;
          tl.addLabel(label);
          tl.to(overlays[i], { opacity: 1 }, label);
          tl.to(cards[i + 1], { yPercent: 0 }, label);
        }
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

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        data-hero
        className="relative flex h-screen min-h-[700px] w-full flex-col items-center justify-center overflow-hidden"
      >
        <div
          data-ambient-glow
          className="pointer-events-none absolute left-[-8vw] top-[16vh] z-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(17,17,17,0.08)_0%,rgba(17,17,17,0.035)_38%,rgba(17,17,17,0)_72%)] blur-3xl"
        />

        <div
          data-hero-backdrop
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden px-4 opacity-[0.07]"
        >
          <div className="relative flex flex-col items-center justify-center">
            <h1
              data-animate
              className="text-[max(15vw,120px)] text-center text-transparent font-black leading-none uppercase md:text-[20vw]"
              style={{ WebkitTextStroke: "1px rgba(0,0,0,1)" }}
            >
              SYSTEMS
            </h1>
            <h1
              data-animate
              className="mt-[-5vw] text-[max(15vw,120px)] text-center text-transparent font-black leading-none uppercase md:text-[20vw]"
              style={{ WebkitTextStroke: "1px rgba(0,0,0,1)" }}
            >
              ARCHIVE
            </h1>
          </div>
        </div>

        <div
          data-hero-image
          data-animate
          className="relative z-10 flex w-full max-w-[85vw] translate-y-[-2%] items-center justify-center will-change-transform sm:max-w-[550px]"
        >
          <div className="paper-cutout absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src={mainPortrait}
              alt=""
              loading="eager"
              sizes="(max-width: 640px) 85vw, 550px"
              draggable={false}
              className="h-auto w-full select-none object-contain"
              style={{ height: "auto" }}
            />
          </div>
          <Image
            src={mainPortrait}
            alt="Rohit Kumar portrait cutout"
            preload
            fetchPriority="high"
            decoding="sync"
            sizes="(max-width: 640px) 85vw, 550px"
            draggable={false}
            className="relative h-auto w-full pointer-events-none select-none object-contain"
            style={{ height: "auto" }}
          />
        </div>

        <div
          data-hero-meta
          className="pointer-events-none absolute inset-x-0 inset-y-0 z-20 hidden flex-col justify-between p-12 md:flex"
        >
          <div className="flex justify-end pt-4">
            <p data-animate className="font-mono text-[10px] font-medium leading-none tracking-[0.3em] text-black/40 uppercase">
              Bun / Node.js / Next.js
            </p>
          </div>
          <div className="flex items-end justify-between pb-12">
            <div data-animate className="flex flex-col gap-1">
              <h2 className="text-3xl font-black leading-tight tracking-tight tracking-[-0.05em] text-black uppercase">
                Backend First Developer
              </h2>
              <p className="text-[11px] font-black tracking-[0.1em] text-[#73BEB1] uppercase">
                Architecture / Core Systems
              </p>
            </div>
            <p data-animate className="text-[10px] font-medium leading-none tracking-[0.4em] text-black/30 uppercase">
              v1.0 / Archive
            </p>
          </div>
        </div>
      </section>

      {/* ── Selected Operations: Pinned card stack ────────────────────── */}
      <section
        data-ops-pin
        className="relative z-20 w-full bg-[#FAF9F6]"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Header — just the label and title */}
          <div className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-7xl px-6 pt-10 sm:px-10 lg:px-12">
            <div className="border-b border-black/8 pb-8">
              <span className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-[#73BEB1] uppercase">
                <span className="h-px w-8 bg-[#73BEB1]/50" />
                Archive.01
              </span>
              <h3 className="mt-3 max-w-md text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Selected Operations
              </h3>
            </div>
          </div>

          {/*
            The clip wrapper. overflow-hidden here ensures cards translated
            below (yPercent:100) are invisible until GSAP slides them up.
            top:148px clears the header strip above.
          */}
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            style={{ top: "148px" }}
          >
            <div className="relative mx-auto h-full w-full max-w-7xl px-6 sm:px-10 lg:px-12">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  data-project-card
                  className="absolute inset-0 border border-black/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,255,255,0.60))] px-6 py-8 backdrop-blur-[2px] sm:px-8 sm:py-10 lg:px-10"
                >
                  {/* Frosted exit overlay — opacity animated 0→1 to fake blur-out */}
                  <div
                    data-project-overlay
                    className="pointer-events-none absolute inset-0 opacity-0"
                    style={{
                      background: "rgba(250,249,246,0.78)",
                      backdropFilter: "blur(4px)",
                      zIndex: 10,
                    }}
                  />

                  <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
                  <span className="pointer-events-none absolute right-4 top-3 select-none text-[5rem] font-black leading-none tracking-[-0.08em] text-black/[0.04] sm:right-6 sm:text-[7rem] lg:text-[8rem]">
                    {project.id}
                  </span>

                  <div className="relative z-0 grid h-full gap-8 lg:grid-cols-[180px_minmax(0,1fr)_260px] lg:items-center">
                    <div className="space-y-5 border-b border-black/8 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                      <div className="space-y-1">
                        <p className="font-mono text-[10px] tracking-[0.32em] text-black/40 uppercase">Record</p>
                        <p className="text-2xl font-black tracking-[-0.06em] text-black uppercase">{project.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-[10px] tracking-[0.32em] text-black/40 uppercase">Year</p>
                        <p className="text-sm font-medium tracking-[0.2em] text-black/65 uppercase">{project.year}</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="border border-black/10 px-3 py-1 font-mono text-[10px] tracking-[0.24em] text-black/55 uppercase">
                          {project.tag}
                        </span>
                        <span className="text-[10px] font-black tracking-[0.28em] text-[#73BEB1] uppercase">{project.tech}</span>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-3xl font-black leading-none tracking-[-0.06em] text-black uppercase sm:text-4xl lg:text-[3.6rem]">
                          {project.name}
                        </h4>
                        <p className="max-w-2xl text-sm leading-7 text-black/58 sm:text-[15px]">{project.desc}</p>
                      </div>
                    </div>

                    <div className="grid gap-4 border-t border-black/8 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <div className="space-y-2">
                        <p className="font-mono text-[10px] tracking-[0.32em] text-black/40 uppercase">Outcome</p>
                        <p className="text-lg font-black leading-tight tracking-[-0.04em] text-black uppercase">{project.result}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-dashed border-black/10 pt-4">
                        <span className="text-[10px] font-medium tracking-[0.28em] text-black/40 uppercase">
                          Layer {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-black tracking-[0.16em] text-black uppercase">
                          View Case
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── System Capabilities ───────────────────────────────────────── */}
      <section className="relative z-20 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div className="lg:sticky lg:top-16 lg:self-start">
            <div className="space-y-6 border-b border-black/8 pb-10 lg:border-b-0 lg:pb-0">
              <span className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-[#73BEB1] uppercase">
                <span className="h-px w-8 bg-[#73BEB1]/50" />
                Archive.02
              </span>
              <h3 className="max-w-[11ch] text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-black sm:text-5xl lg:text-[4.8rem]">
                System Capabilities
              </h3>
              <p className="max-w-sm text-sm font-medium leading-8 tracking-[0.12em] text-black/48 uppercase sm:text-[13px]">
                Operational stack / architecture grammar / deploy surface
              </p>
              <p className="max-w-sm text-base leading-8 text-black/58 sm:text-lg">
                I changed this away from matching cards. Current references lean toward editorial contrast:
                one anchored narrative column and one flowing capability ledger.
              </p>
            </div>
          </div>

          <div className="space-y-10 lg:space-y-12">
            {capabilities.map((spec) => (
              <article
                key={spec.category}
                className="group relative overflow-hidden border-t border-black/8 pt-8 lg:pt-10"
              >
                <div className="relative z-10 grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-12">
                  <div className="space-y-3 pt-1">
                    <p className="font-mono text-[10px] tracking-[0.28em] text-black/35 uppercase">Capability Cluster</p>
                    <div className="h-px w-12 bg-black/10" />
                  </div>

                  <div className="space-y-7">
                    <div className="space-y-5 border-b border-dashed border-black/10 pb-7">
                      <h4 className="max-w-[11ch] text-3xl font-black leading-[0.95] tracking-[-0.055em] text-black uppercase sm:text-4xl lg:text-[2.35rem] xl:text-[2.55rem]">
                        {spec.category}
                      </h4>
                      <p className="max-w-[42rem] text-base leading-8 text-black/58">{spec.summary}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1 pr-4">
                      {spec.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex min-h-11 items-center gap-3 border border-black/10 bg-white/60 px-4 py-2.5 text-[11px] font-black tracking-[0.16em] text-black/78 uppercase"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#73BEB1]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
