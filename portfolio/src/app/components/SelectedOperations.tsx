"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SelectedOperations() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = sectionRef.current!;
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>("[data-project-card]"),
        );
        const overlays = Array.from(
          root.querySelectorAll<HTMLElement>("[data-project-overlay]"),
        );
        const timelinePanels = Array.from(
          root.querySelectorAll<HTMLElement>("[data-track-panel]"),
        );
        const timelineLines = Array.from(
          root.querySelectorAll<HTMLElement>("[data-track-line]"),
        );
        const timelineTrails = Array.from(
          root.querySelectorAll<HTMLElement>("[data-track-trail]"),
        );
        const timelineNodes = Array.from(
          root.querySelectorAll<HTMLElement>("[data-track-node]"),
        );
        const timelineEnds = Array.from(
          root.querySelectorAll<HTMLElement>("[data-track-end]"),
        );
        const pinSection = root;

        if (!pinSection || cards.length < 2) return;

        // Set initial stacking: card[i+1] slides over card[i] so needs higher z
        cards.forEach((card, i) => {
          const drift = i % 2 === 0 ? 1.8 : -1.8;

          gsap.set(card, {
            zIndex: i + 1,
            transformOrigin: "50% 8%",
            boxShadow: i === 0
              ? "0 4px 14px rgba(17,17,17,0.03), 0 1px 2px rgba(17,17,17,0.02)"
              : "0 2px 8px rgba(17,17,17,0.02)",
          });

          if (i > 0) {
            gsap.set(card, {
              yPercent: 104,
              xPercent: drift,
              rotation: drift > 0 ? 0.22 : -0.22,
              scale: 0.996,
              willChange: "transform",
            });
          } else {
            gsap.set(card, { xPercent: 0, rotation: 0, scale: 1 });
          }
        });

        timelinePanels.forEach((panel, i) => {
          gsap.set(panel, {
            autoAlpha: i === 0 ? 1 : 0.45,
            y: i === 0 ? 0 : 10,
          });
        });

        timelineLines.forEach((line, i) => {
          gsap.set(line, {
            scaleY: i === 0 ? 1 : 0.72,
            autoAlpha: i === 0 ? 1 : 0.5,
            transformOrigin: "top center",
          });
        });

        timelineTrails.forEach((trail, i) => {
          const startProgress = cards.length > 1 ? i / (cards.length - 1) : 0;

          gsap.set(trail, {
            scaleY: startProgress,
            autoAlpha: startProgress > 0 ? 0.9 : 0.55,
            transformOrigin: "top center",
          });
        });

        timelineNodes.forEach((node, i) => {
          const endNode = timelineEnds[i];
          const dotTravel = Math.max(0, endNode.offsetTop - node.offsetTop - 2);
          const startProgress = cards.length > 1 ? i / (cards.length - 1) : 0;

          gsap.set(node, {
            y: dotTravel * startProgress,
            scale: i === 0 ? 1.08 : 0.82,
            autoAlpha: i === 0 ? 1 : 0.45,
            transformOrigin: "center center",
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSection,
            start: "clamp(top top)",
            end: () => `+=${(cards.length - 1) * window.innerHeight}`,
            scrub: 0.32,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none", duration: 1 },
        });

        // Sequential pairs: one full timeline unit per card transition
        for (let i = 0; i < cards.length - 1; i++) {
          const label = `step-${i}`;
          const drift = (i + 1) % 2 === 0 ? 1.8 : -1.8;
          const dotTravel = Math.max(
            0,
            timelineEnds[i].offsetTop - timelineNodes[i].offsetTop - 2,
          );
          const nextProgress = cards.length > 1 ? (i + 1) / (cards.length - 1) : 1;
          tl.addLabel(label);
          tl.to(overlays[i], { opacity: 1 }, label);
          tl.to(timelinePanels[i], { autoAlpha: 0.35, y: -8, duration: 0.45 }, label);
          tl.to(timelineLines[i], { scaleY: 0.72, autoAlpha: 0.5, duration: 0.45 }, label);
          tl.to(
            timelineTrails[i],
            { scaleY: nextProgress, autoAlpha: 0.7, duration: 0.5 },
            label,
          );
          tl.to(
            timelineNodes[i],
            {
              y: dotTravel * nextProgress,
              scale: 0.86,
              autoAlpha: 0.45,
              duration: 0.5,
              ease: "power2.out",
            },
            label,
          );
          tl.to(
            cards[i],
            {
              yPercent: -1.2,
              xPercent: drift * -0.12,
              rotation: drift * -0.025,
              scale: 0.994,
              boxShadow: "0 1px 4px rgba(17,17,17,0.015)",
              duration: 0.62,
              ease: "power2.out",
            },
            label,
          );
          tl.to(
            cards[i + 1],
            {
              yPercent: 0,
              xPercent: 0,
              rotation: 0,
              scale: 1,
              boxShadow: "0 4px 14px rgba(17,17,17,0.03), 0 1px 2px rgba(17,17,17,0.02)",
              duration: 0.78,
              ease: "power3.out",
            },
            label,
          );
          tl.to(timelinePanels[i + 1], { autoAlpha: 1, y: 0, duration: 0.55 }, label);
          tl.to(timelineLines[i + 1], { scaleY: 1, autoAlpha: 1, duration: 0.55 }, label);
          tl.to(
            timelineTrails[i + 1],
            { autoAlpha: 0.9, duration: 0.55 },
            label,
          );
          tl.to(
            timelineNodes[i + 1],
            { scale: 1.08, autoAlpha: 1, duration: 0.55, ease: "power2.out" },
            label,
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
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
            {projects.map((project) => (
              <article
                key={project.id}
                data-project-card
                className="absolute inset-0 isolate overflow-hidden border border-black/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,255,255,0.60))] px-6 py-8 backdrop-blur-[2px] [backface-visibility:hidden] [transform:translateZ(0)] sm:px-8 sm:py-10 lg:px-10"
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
                  <div className="border-b border-black/8 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                    <div data-track-panel className="relative lg:-ml-2 lg:max-w-[144px] lg:pl-6">
                      <div data-track-line className="absolute bottom-1 left-[5px] top-1 w-px bg-black/12" />
                      <div
                        data-track-trail
                        className="absolute left-[5px] top-1 w-px origin-top bg-gradient-to-b from-[#73BEB1]/75 via-[#73BEB1]/35 to-transparent"
                        style={{ height: "calc(100% - 8px)" }}
                      />
                      <span data-track-node className="absolute left-[1px] top-1.5 h-[9px] w-[9px] rounded-full border border-[#73BEB1]/50 bg-[#73BEB1]/22 shadow-[0_0_0_4px_rgba(250,249,246,0.96)]" />
                      <span data-track-end className="absolute bottom-1 left-[3px] h-[5px] w-[5px] rounded-full bg-black/10 shadow-[0_0_0_4px_rgba(250,249,246,0.96)]" />

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="h-px w-6 bg-[#73BEB1]/55" />
                            <p className="font-mono text-[10px] tracking-[0.32em] text-black/42 uppercase">Filed</p>
                          </div>
                          <p className="pl-8 text-[2rem] font-black leading-none tracking-[-0.08em] text-black uppercase">{project.year}</p>
                        </div>

                        <div className="pl-8 pt-1">
                          <p className="font-mono text-[9px] tracking-[0.28em] text-black/28 uppercase">Current archive</p>
                        </div>
                      </div>
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
                    <div className="flex items-center justify-end border-t border-dashed border-black/10 pt-4">
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
  );
}
