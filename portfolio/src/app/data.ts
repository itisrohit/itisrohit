export const projects = [
  {
    id: "01",
    name: "Outlyne",
    year: "2026",
    tech: "Python / SigLIP2 / OpenVINO",
    tag: "Visual Search / ML",
    link: "https://github.com/itisrohit/Outlyne",
    result: "~92ms Visual Encoding",
    desc: "AI-powered sketch-to-image search engine using zero-shot visual discovery. Offloads heavy visual encoding to a CPU-optimized OpenVINO pipeline for real-time intent matching.",
  },
  {
    id: "02",
    name: "Befu",
    year: "2026",
    tech: "Rust / React / mobile native",
    tag: "Bridge / Runtimes",
    link: "https://github.com/itisrohit/Befu",
    result: "~1s Hot-Reload for Rust",
    desc: "A high-performance cross-platform framework for hot-reloading Rust backend logic inside mobile apps. Features a custom low-latency bridge between React and native code.",
  },
  {
    id: "03",
    name: "base0",
    year: "2026",
    tech: "Bun v1.2 / Hono / PostgreSQL",
    tag: "Systems / Backend",
    link: "https://github.com/itisrohit/base0",
    result: "Type-safe Auth / RBAC Platform",
    desc: "A minimal, edge-native backend platform providing authentication, document storage, and RBAC via standard Web APIs and shared type-safe monorepo orchestration.",
  },
  {
    id: "04",
    name: "Draftly",
    year: "2026",
    tech: "Rust / WASM / React",
    tag: "Graphics / Engine",
    link: "https://github.com/itisrohit/Draftly",
    result: "Deterministic Geometry Core",
    desc: "An engine-first design drafting system. Decouples geometric computation from the UI, moving all scene management to a high-precision Rust core compiled to WebAssembly.",
  },
] as const;

export const capabilities = [
  {
    category: "Languages",
    code: "ST-01",
    summary: "Runtimes and languages I use while building concurrent, high-throughput systems through personal experimentation.",
    items: ["Go (QuietHire)", "Rust (Systems)", "Node.js (Bun)", "Python (ML Core)"],
  },
  {
    category: "Infrastructure",
    code: "IN-02",
    summary: "Exploring databases, containerization, and modern deployment surfaces in an isolated development environment.",
    items: ["PostgreSQL / SQLite", "Vector Indexing", "Docker / Bun", "Web Standard APIs"],
  },
  {
    category: "Architecture",
    code: "AR-03",
    summary: "Core design patterns and architectural decisions I'm applying and testing in my own software projects.",
    items: ["WASM Runtimes", "Mobile-to-Rust Bridge", "Zero-shot Vision", "Monorepo Orchestration"],
  },
] as const;

export const workflowMarginalia = [
  { label: "Editor", value: "Neovim" },
  { label: "OS", value: "macOS (Darwin)" },
  { label: "Terminal", value: "Ghostty / zsh" },
  { label: "Git style", value: "Small commits, clean diffs" },
] as const;
