export const projects = [
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

export const capabilities = [
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

export const workflowMarginalia = [
  { label: "Editor", value: "Neovim" },
  { label: "OS", value: "Arch Linux" },
  { label: "Terminal", value: "tmux / zsh" },
  { label: "Git style", value: "Small commits, clean diffs" },
] as const;
