"use client";

import React from "react";
import { capabilities, workflowMarginalia } from "../data";

export function Capabilities() {
  return (
    <section className="relative z-20 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div className="lg:sticky lg:top-16 lg:self-start">
          <div className="border-b border-black/8 pb-10 lg:flex lg:min-h-[calc(100vh-4rem)] lg:flex-col lg:justify-between lg:border-b-0 lg:pb-0">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-[#73BEB1] uppercase">
                <span className="h-px w-8 bg-[#73BEB1]/50" />
                02 / Skillset
              </span>
              <h3 className="max-w-[11ch] text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-black sm:text-5xl lg:text-[4.8rem]">
                Technical Skillset
              </h3>
              <p className="max-w-sm text-sm font-medium leading-8 tracking-[0.12em] text-black/48 uppercase sm:text-[13px]">
                Technical Stack & Applied Patterns
              </p>
              <p className="max-w-sm text-base leading-8 text-black/58 sm:text-lg">
                A log of the technologies and architectural patterns currently in rotation across my projects. 
              </p>
            </div>

            <div className="mt-10 max-w-sm border-t border-dashed border-black/10 pt-7 lg:mt-16">
              <p className="font-mono text-[10px] tracking-[0.3em] text-black/35 uppercase">
                Workflow marginalia
              </p>
              <div className="mt-4 grid grid-cols-[88px_1fr] gap-x-4 gap-y-3 text-[11px] uppercase sm:text-[12px]">
                {workflowMarginalia.map((item) => (
                  <React.Fragment key={item.label}>
                    <span className="font-mono tracking-[0.24em] text-black/30">{item.label}</span>
                    <span className="font-black tracking-[0.18em] text-black/74">{item.value}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
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
  );
}
