"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mainPortrait from "../../../public/mainpic.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Hero entrance ────────────────────────────────────────────────
        const heroTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

        heroTimeline
          .from("[data-hero-word]", {
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
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.to("[data-hero-backdrop]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // ── Hero backdrop hover ─────────────────────────────────────────
        const hero = heroRef.current;
        const heroBackdrop = hero?.querySelector<HTMLElement>("[data-hero-backdrop]");
        const heroBackdropFill = hero?.querySelector<HTMLElement>("[data-hero-backdrop-fill]");
        const heroWash = hero?.querySelector<SVGGElement>("[data-hero-wash]");

        if (hero && heroBackdrop && heroBackdropFill && heroWash) {
          const fillOpacity = gsap.quickTo(heroBackdropFill, "opacity", { duration: 0.5, ease: "power2.out" });
          const washX = gsap.quickTo(heroWash, "x", { duration: 0.72, ease: "power3.out" });
          const washY = gsap.quickTo(heroWash, "y", { duration: 0.72, ease: "power3.out" });

          gsap.set(heroBackdropFill, { opacity: 0 });
          gsap.set(heroBackdrop, { x: 0, y: 0 });
          gsap.set(heroWash, { x: 800, y: 420 });

          const handlePointerMove = (event: PointerEvent) => {
            const rect = hero.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;

            washX(180 + px * 1240);
            washY(140 + py * 500);
            fillOpacity(1);
          };

          const handlePointerLeave = () => {
            washX(800);
            washY(450);
            fillOpacity(0);
          };

          hero.addEventListener("pointermove", handlePointerMove);
          hero.addEventListener("pointerleave", handlePointerLeave);

          return () => {
            hero.removeEventListener("pointermove", handlePointerMove);
            hero.removeEventListener("pointerleave", handlePointerLeave);
          };
        }

        // ── Ambient hero glow ───────────────────────────────────────────
        gsap.to("[data-ambient-glow]", {
          xPercent: 8,
          yPercent: -8,
          repeat: -1,
          yoyo: true,
          duration: 8,
          ease: "sine.inOut",
        });
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      data-hero
      className="relative flex h-screen min-h-[700px] w-full flex-col items-center justify-center overflow-hidden"
    >
      <div
        data-ambient-glow
        className="pointer-events-none absolute left-[-8vw] top-[16vh] z-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(17,17,17,0.08)_0%,rgba(17,17,17,0.035)_38%,rgba(17,17,17,0)_72%)] blur-3xl"
      />

      <div
        data-hero-backdrop
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1600 900"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroTextWash" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F1110" stopOpacity="0.015" />
              <stop offset="38%" stopColor="#161918" stopOpacity="0.1" />
              <stop offset="52%" stopColor="#73BEB1" stopOpacity="0.06" />
              <stop offset="68%" stopColor="#161918" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0F1110" stopOpacity="0.02" />
            </linearGradient>
            <filter id="heroWashBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="34" />
            </filter>
            <filter id="heroWashGrain" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="7" result="noise" />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 0.18 0"
              />
            </filter>
            <mask id="heroWashMask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
              <rect x="0" y="0" width="1600" height="900" fill="black" />
              <g data-hero-wash filter="url(#heroWashBlur)">
                <ellipse cx="0" cy="0" rx="220" ry="108" fill="white" opacity="0.18" />
                <rect x="-340" y="-38" width="680" height="76" rx="38" fill="white" opacity="0.84" transform="rotate(-12)" />
                <rect x="-200" y="-14" width="400" height="28" rx="14" fill="white" opacity="0.42" transform="rotate(-12)" />
              </g>
            </mask>
          </defs>

          <g
            fill="none"
            stroke="rgba(0,0,0,0.9)"
            strokeOpacity="0.09"
            strokeWidth="1.6"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="900"
            letterSpacing="-0.06em"
            className="uppercase"
          >
            <text data-hero-word x="50%" y="44%" fontSize="320">
              SYSTEMS
            </text>
            <text data-hero-word x="50%" y="71%" fontSize="320">
              ARCHIVE
            </text>
          </g>

          <g data-hero-backdrop-fill opacity="0" mask="url(#heroWashMask)" textAnchor="middle">
            <text
              x="50%"
              y="44%"
              fontSize="320"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="900"
              letterSpacing="-0.06em"
              fill="url(#heroTextWash)"
              fillOpacity="0.72"
              className="uppercase"
            >
              SYSTEMS
            </text>
            <text
              x="50%"
              y="71%"
              fontSize="320"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="900"
              letterSpacing="-0.06em"
              fill="url(#heroTextWash)"
              fillOpacity="0.72"
              className="uppercase"
            >
              ARCHIVE
            </text>

            <text
              x="50%"
              y="44%"
              fontSize="320"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="900"
              letterSpacing="-0.06em"
              fill="#111111"
              fillOpacity="0.08"
              filter="url(#heroWashGrain)"
              className="uppercase"
            >
              SYSTEMS
            </text>
            <text
              x="50%"
              y="71%"
              fontSize="320"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="900"
              letterSpacing="-0.06em"
              fill="#111111"
              fillOpacity="0.08"
              filter="url(#heroWashGrain)"
              className="uppercase"
            >
              ARCHIVE
            </text>

            <text
              x="50%"
              y="44%"
              fontSize="320"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="900"
              letterSpacing="-0.06em"
              fill="none"
              stroke="#0F1110"
              strokeOpacity="0.08"
              strokeWidth="1.8"
              className="uppercase"
            >
              SYSTEMS
            </text>
            <text
              x="50%"
              y="71%"
              fontSize="320"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="900"
              letterSpacing="-0.06em"
              fill="none"
              stroke="#0F1110"
              strokeOpacity="0.08"
              strokeWidth="1.8"
              className="uppercase"
            >
              ARCHIVE
            </text>
          </g>
        </svg>
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
        <div className="flex justify-end pt-4" />
        <div className="flex items-end justify-between pb-12">
          <div data-animate className="max-w-[30rem] flex flex-col gap-3">
            <h2 className="text-3xl font-black leading-tight tracking-tight tracking-[-0.05em] text-black uppercase">
              Backend Developer
            </h2>
            <p className="text-[11px] font-black tracking-[0.1em] text-[#73BEB1] uppercase">
              Node.js / Bun / Go
            </p>
            <p className="max-w-[34ch] text-sm leading-6 text-black/60">
              Developer focused on the architecture and internal mechanics of distributed systems. 
            </p>
            <div className="pt-2">
              <a 
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex cursor-pointer items-center border border-black/10 px-3 py-2 font-mono text-[10px] font-medium leading-none tracking-[0.24em] text-black/38 uppercase transition-all duration-300 hover:-translate-y-[1px] hover:border-black/20 hover:bg-black hover:text-[#FAF9F6]">
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-8 sm:px-10 md:hidden">
        <div data-animate className="max-w-[22rem] space-y-2">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.05em] text-black uppercase">
            Backend Developer
          </h2>
          <p className="text-[10px] font-black tracking-[0.12em] text-[#73BEB1] uppercase">
            Node.js / Bun / Go
          </p>
          <p className="max-w-[28ch] text-sm leading-6 text-black/60">
            Developer focused on the architecture and internal mechanics of distributed systems. 
          </p>
          <div data-animate className="pt-2">
            <a 
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex cursor-pointer items-center border border-black/10 px-3 py-2 font-mono text-[10px] font-medium leading-none tracking-[0.24em] text-black/38 uppercase transition-all duration-300 hover:-translate-y-[1px] hover:border-black/20 hover:bg-black hover:text-[#FAF9F6]">
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
