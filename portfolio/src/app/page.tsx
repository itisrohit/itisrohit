import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#FAF9F6] overflow-x-hidden font-sans selection:bg-[#73BEB1] selection:text-white pb-64">
      
      {/* --- 1. CORE SYSTEM LAYERS --- */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="rough-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="paper-texture" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.012]" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '150px 150px' }} />

      {/* --- 2. HERO SECTION --- */}
      <section className="relative h-screen min-h-[700px] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Backdrop Text */}
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

        {/* The Subject Image (Layered Cutout Effect) */}
        <div className="relative z-10 flex w-full max-w-[85vw] sm:max-w-[550px] items-center justify-center translate-y-[-2%]">
          <div className="absolute inset-0 flex items-center justify-center paper-cutout pointer-events-none">
            <Image src="/mainpic.png" alt="" width={1200} height={1200} priority draggable={false} className="h-auto w-full object-contain select-none" style={{ height: "auto" }} />
          </div>
          <Image src="/mainpic.png" alt="Subject" width={1200} height={1200} priority draggable={false} className="relative h-auto w-full object-contain select-none pointer-events-none" style={{ height: "auto" }} />
        </div>

        {/* Hero Details Meta */}
        <div className="absolute inset-x-0 inset-y-0 p-12 pointer-events-none z-20 hidden md:flex flex-col justify-between">
          <div className="flex justify-end pt-4">
            <p className="text-[10px] tracking-[0.3em] text-black/40 font-medium uppercase font-mono leading-none">Bun / Node.js / Next.js</p>
          </div>
          <div className="flex justify-between items-end pb-12">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black tracking-[-0.05em] text-black uppercase leading-tight tracking-tight">Backend First Developer</h2>
              <p className="text-[11px] tracking-[0.4em] text-[#73BEB1] font-black uppercase tracking-[0.1em]">Architecture / Core Systems</p>
            </div>
            <p className="text-[10px] tracking-[0.4em] text-black/30 font-medium uppercase leading-none">v1.0 / Archive</p>
          </div>
        </div>
      </section>

      {/* --- 3. ARCHIVAL PROJECT GRID (PHASE 1) --- */}
      <section className="relative z-20 w-full max-w-7xl mx-auto px-12 py-32 space-y-12">
        <div className="flex items-center gap-4 border-b border-black/5 pb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#73BEB1]">Archive.01</span>
          <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-black/40">Selected Operations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5">
          {[
            { id: "01", name: "SYNTAX_CORE", year: "2024", tech: "Go / Distributed / gRPC", desc: "High-performance distributed engine for real-time massive data synchronization." },
            { id: "02", name: "QUANTUM_FLOW", year: "2023", tech: "Node / Bun / Event-driven", desc: "Low-latency message broker specializing in asynchronous streams and logic handlers." },
            { id: "03", name: "VOID_SCAN", year: "2023", tech: "Rust / Security / Micro", desc: "Real-time security analyzer built for scanning cloud-scale microservice architectures." },
            { id: "04", name: "NEURAL_GRID", year: "2022", tech: "C++ / Vector / Search", desc: "Distributed vector database optimized for high-dimensional semantic search engines." }
          ].map((p) => (
            <div key={p.id} className="group bg-[#FAF9F6] p-12 hover:bg-black-[0.02] transition-all cursor-crosshair relative overflow-hidden">
              <div className="flex justify-between items-start mb-16 relative z-10">
                <span className="text-6xl font-black text-black-[0.03] group-hover:text-[#73BEB1]/20 transition-colors uppercase leading-none">{p.id}</span>
                <span className="text-[10px] font-mono text-black/30 underline decoration-black/5 underline-offset-4">{p.year}</span>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight mb-2 relative z-10">{p.name}</h4>
              <p className="text-[10px] font-mono text-[#73BEB1] font-black uppercase tracking-[0.25em] mb-6 relative z-10">{p.tech}</p>
              <p className="text-sm text-black/50 max-w-[85%] leading-relaxed relative z-10">{p.desc}</p>
              {/* Subtle hover effect light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#73BEB1]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. LABORATORY CORE / TECH SPECS (PHASE 4 - REPLACING EXPERIENCE) --- */}
      <section className="relative z-20 w-full max-w-4xl mx-auto px-12 py-32 space-y-16">
        <div className="flex items-center gap-4 border-b border-black/5 pb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#73BEB1]">Archive.02</span>
          <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-black/40">System Capabilities</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {[
            { category: "Protocol", items: ["Go / gRPC", "Rust Core", "Node.js (Bun)", "C++ Systems"] },
            { category: "Infrastructure", items: ["PostgreSQL", "Redis / Memcached", "Docker / K8s", "AWS / Cloudflare Edge"] },
            { category: "Core Logic", items: ["Distributed Sync", "Event-driven Arch", "Microservices", "Low-Latency TCP"] }
          ].map((spec, i) => (
            <div key={i} className="space-y-6 group">
              <h4 className="text-[10px] font-mono text-black/40 uppercase tracking-[0.5em] border-b border-black/5 pb-2 group-hover:text-[#73BEB1] transition-colors">{spec.category}</h4>
              <ul className="space-y-4">
                {spec.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#73BEB1] rounded-full shadow-[0_0_8px_rgba(115,190,177,0.4)]" />
                    <span className="text-xs font-black uppercase tracking-tight text-black/70 group-hover:text-black transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
