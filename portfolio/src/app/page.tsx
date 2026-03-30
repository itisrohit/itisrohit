import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF9F6] overflow-hidden font-sans selection:bg-[#73BEB1] selection:text-white">
      
      {/* 1. Hidden SVG Filter for Rough/Torn Edges - Procedural Distortion for Border Only */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="rough-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 2. Premium 2026 Paper Texture (Defined in globals.css) */}
      <div className="paper-texture" />

      {/* 3. Subtle Technical System Grid (Architecture Layer) */}
      <div className="absolute inset-x-0 inset-y-0 z-0 pointer-events-none opacity-[0.012]" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '150px 150px' }} />

      {/* 4. Backend Systems Backdrop - Massive & Minimalist */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden px-4 opacity-[0.07]">
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="text-[max(15vw,120px)] md:text-[20vw] font-black uppercase text-transparent leading-none text-center" 
              style={{ WebkitTextStroke: '1px rgba(0,0,0,1)' }}>
            SYSTEMS
          </h1>
          <h1 className="text-[max(15vw,120px)] md:text-[20vw] font-black uppercase text-transparent leading-none mt-[-5vw] text-center" 
              style={{ WebkitTextStroke: '1px rgba(0,0,0,1)' }}>
            ARCHIVE
          </h1>
        </div>
      </div>

      {/* 5. The Subject Image (Layered Strategy for Rough Edge + Clean Artwork) */}
      <div className="relative z-10 flex w-full max-w-[85vw] sm:max-w-[550px] items-center justify-center translate-y-[-2%]">
        
        {/* Border Layer: This copy creates the rough "torn paper" white edge */}
        <div className="absolute inset-0 flex items-center justify-center paper-cutout pointer-events-none">
          <Image
            src="/mainpic.png"
            alt=""
            width={1200}
            height={1200}
            priority
            draggable={false}
            className="h-auto w-full object-contain select-none"
            style={{ height: "auto" }}
          />
        </div>

        {/* Artwork Layer: The clean, undistorted illustration sits on top */}
        <Image
          src="/mainpic.png"
          alt="Subject"
          width={1200}
          height={1200}
          priority
          draggable={false}
          className="relative h-auto w-full object-contain select-none pointer-events-none"
          style={{ height: "auto" }}
        />
      </div>

      {/* 6. Floating Corner Details - Technical Premium Style */}
      <div className="absolute inset-x-0 inset-y-0 p-12 pointer-events-none z-20 hidden md:flex flex-col justify-between">
        <div className="flex justify-end items-start pt-4">
          <p className="text-[10px] tracking-[0.3em] text-black/40 font-medium uppercase font-mono leading-none">
            Node.js / Bun / Next.js
          </p>
        </div>
        
        <div className="flex justify-between items-end pb-12">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black tracking-[-0.05em] text-black uppercase leading-tight tracking-tight">
              Backend First Developer
            </h2>
            <p className="text-[11px] tracking-[0.4em] text-[#73BEB1] font-black uppercase tracking-[0.1em]">
              Architecture / Core Systems
            </p>
          </div>
          <p className="text-[10px] tracking-[0.4em] text-black/30 font-medium uppercase leading-none">
            v1.0 / Archive
          </p>
        </div>
      </div>

      {/* Mobile Details (Simplified) */}
      <div className="absolute bottom-10 w-full px-12 flex justify-between items-end md:hidden z-20">
        <h2 className="text-xl font-black tracking-tighter text-black uppercase leading-none">Systems</h2>
        <p className="text-[10px] tracking-[0.2em] text-[#73BEB1] font-bold uppercase leading-none opacity-80">Backend Dev</p>
      </div>

    </div>
  );
}
