// Portfolio Data Configuration
// Update this file to modify all content across the portfolio

export interface CommandResponse {
  output: string
  type: string
}

export interface Commands {
  [key: string]: CommandResponse
}

export const siteConfig = {
  // Basic site info
  title: "Fullstack Developer | TypeScript & Node.js",
  domain: "rohx.vercel.app",
  email: "dv6510@gmail.com",
  location: "Remote (India-based)",
  
  
  // Social links
  social: {
    github: "https://github.com/itisrohit",
    linkedin: "https://www.linkedin.com/in/ayorohit",
    calendly: "https://calendly.com/roku6510/30min",
  },

  // Hero section
  hero: {
    badge: {
      icon: "Terminal",
      text: "rohx.vercel.app",
    },
    headline: {
      primary: "I Build Fast Systems",
      secondary: "Clean APIs &",
      tertiary: "Scalable Products",
    },
    subheadline: "Architecting robust backend systems, craft clean APIs, and build fullstack web apps that are fast and scalable.",
    buttons: {
      primary: {
        text: "View My Work",
        icon: "Briefcase",
        href: "#projects",
      },
      secondary: {
        text: "Book a Call",
        icon: "Calendar",
        action: "calendly",
      },
    },
  },

  // Terminal content
  terminal: {
    demo: {
      lines: [
        { text: "$ whoami", type: "command", delay: 0 },
        { text: "backend-first-developer", type: "output", delay: 400 },
        { text: "$ cat ~/.stack", type: "command", delay: 800 },
        { text: "✔ runtime: Node.js, Bun", type: "success", delay: 1200 },
        { text: "✔ frameworks: Next.js, Express, Hono", type: "success", delay: 1600 },
        { text: "✔ databases: MongoDB, PostgreSQL, Redis", type: "success", delay: 2000 },
        { text: "✔ styling: TailwindCSS, ShadCN", type: "success", delay: 2400 },
        { text: "✔ tools: tRPC, WebSockets, Zod, Prisma", type: "success", delay: 2800 },
        { text: "✔ deployments: Vercel, Railway, Render", type: "success", delay: 3200 },
        { text: "$ system status", type: "command", delay: 3600 },
        { text: "✔ Projects deployed & stable", type: "success", delay: 4000 },
        { text: "✔ APIs responding < 100ms", type: "success", delay: 4200 },
        { text: "✔ DX optimized, bugs minimal", type: "success", delay: 4400 },
        { text: "$ achievements", type: "command", delay: 4800 },
        { text: "✔ Built & shipped fullstack SaaS apps", type: "success", delay: 5200 },
        { text: "✔ Built real-time chat & stream systems", type: "success", delay: 5600 },
        { text: "✔ Reduced cold start times & complexity", type: "success", delay: 6000 },
        { text: "$ echo 'Let's build your next product 🚀'", type: "command", delay: 6400 },
        { text: "Let's build your next product 🚀", type: "success", delay: 6800 },
      ],
    },
    interactive: {
      welcome: {
        command: "welcome",
        output: "Welcome to my interactive terminal! Try: help, about, skills, projects, contact",
        type: "info",
      },
      commands: {
        help: {
          output: `Available commands:
• about - Learn about me
• skills - View technical skills
• projects - See my projects
• contact - Get in touch
• clear - Clear terminal
• whoami - Current user info
• uptime - System uptime
• ps - Running processes`,
          type: "info",
        },
        about: {
          output: `Backend-first Fullstack Developer
I build performant APIs, real-time systems, and fullstack apps with clean architecture and dev-first DX.
Focused on shipping minimal, scalable software that works in production.`,
          type: "success",
        },
        skills: {
          output: `Core Technologies:
• Languages: TypeScript, JavaScript
• Runtime: Node.js, Bun
• Frameworks: Next.js, Express, Hono
• Databases: MongoDB, PostgreSQL, Redis
• Tools: WebSockets, Prisma, Zod, tRPC
• Infra & Deploy: Docker, Railway, Vercel, Render`,
          type: "success",
        },
        projects: {
          output: `Featured Projects:
• Valkode - Sandboxed code execution engine (multi-language, secure, fast)
• Mimir — Document Chat CLI search with RAG + vector DB
• Moir - WebSocket-based fullstack chat app with AI Icebreaker`,
          type: "success",
        },
        contact: {
          output: `Let's connect:
• Email: dv6510@gmail.com
• LinkedIn: /in/ayorohit
• GitHub: /itisrohit
• Schedule a call: calendly.com/itisrohit/30min`,
          type: "info",
        },
        whoami: {
          output: "backend-first-developer",
          type: "output",
        },
        uptime: {
          output: "up 47 days, 12:34, load average: 0.15, 0.12, 0.08",
          type: "output",
        },
        ps: {
          output: `PID  COMMAND
1234 api-gateway
1235 user-service  
1236 redis-cache
1237 monitoring-agent`,
          type: "output",
        },
        clear: {
          output: "",
          type: "clear",
        },
      } as Commands,
    },
  },

  // Deployment logs
  deploymentLogs: [
    "$ docker build -t api-service:latest .",
    "✓ Building image... completed in 2.3s",
    "$ kubectl apply -f deployment.yaml",
    "✓ Deployment api-service scaled to 3 replicas",
    "$ curl -X GET /health",
    "✓ Health check passed - 200 OK",
    "$ monitoring systems online",
    "✓ All services operational",
  ],

  // Projects
  projects: [
    {
      title: "Valkode — Blazing-Fast Multi-Language Code Execution Engine",
      description: "A high-performance, security-focused code execution engine with hybrid architecture — combining Bun APIs, Node.js V8 sandboxing, and persistent Python daemons for sub-millisecond execution.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["Bun", "Node.js", "Python", "Docker", "isolated-vm", "TypeScript"],
      bullets: [
        "Built hybrid engine using Bun (API), Node.js (sandbox), and Python daemons (speed)",
        "Achieved 1ms warm execution with dynamic worker pools and V8-level isolation",
        "Stress-tested with 320+ req/sec throughput and 100% pass rate (30 tests, 178 assertions)"
      ],
      role: "Architecture & Performance Engineer",
      links: {
        github: "https://github.com/itisrohit/valkode",
        demo: "#",
        case: "#",
      },
      hasDemo: false,
    },
    {
      title: "Mimir — Document Chat CLI",
      description:"A fast, cross-platform C++ CLI tool for chatting with your documents. Built with reproducible builds, intelligent chunking, and modular architecture — ready for AI & vector search integration.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["C++17", "YAML", "Nix", "Make", "FAISS (planned)"],
      bullets: [
        "Built a full-featured CLI for managing, querying, and persisting document sessions",
        "Designed YAML-based config system and session storage for scalable extensibility",
        "Implemented chunking, metadata indexing, and CI pipeline with reproducible Nix builds"
      ],
      role: "Creator & C++ Systems Developer",
      links: {
        github: "https://github.com/itisrohit/mimir",
        demo: "#",
        case: "#",
      },
      hasDemo: false,
    },
    {
      title: "MOIR — Real-Time Chat App with AI Icebreakers",
      description:  "A minimal real-time chat app that enhances 1-on-1 conversations through AI-powered icebreakers designed to reduce social friction and spark meaningful interactions.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["Next.js", "Express", "WebSockets", "MongoDB", "TailwindCSS", "TypeScript"],
      bullets: [
        "Built real-time 1-on-1 messaging with WebSockets and persistent chat history",
        "Integrated AI-generated icebreakers to initiate and enrich conversations",
        "Designed clean, responsive UI with focus on minimalism and user flow"
      ],
      role: "Fullstack Developer & AI UX Engineer",
      links: {
        github: "https://github.com/itisrohit/moir",
        demo: "#",
        case: "#",
      },
      hasDemo: false,
    },
  ],

  // Services/What I Engineer
  services: [
    {
      title: "// backend engineering",
      description: "Building fast, type-safe APIs and robust backend logic",
      details: [
        "Schema-first REST/tRPC APIs with strict TypeScript types",
        "Real-time systems using WebSockets and event emitters",
        "Authentication, RBAC, and secure session management"
      ],
      icon: "Server",
      tools: ["TypeScript", "Fastify", "tRPC", "Bun", "Redis"],
      tooltip: "// api design · real-time · type safety"
    },
    {
      title: "// databases & data modeling",
      description: "Designing schemas and flows that scale with low-latency reads",
      details: [
        "Optimized schema design with compound indexing",
        "MongoDB for dynamic apps, PostgreSQL for relational use-cases",
        "Safe migrations, backups, and cache sync strategies"
      ],
      icon: "Database",
      tools: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
      tooltip: "// modeling · indexing · data flows"
    },
    {
      title: "// infra & dev workflow",
      description: "Fast local dev + seamless CI/CD for backend-first apps",
      details: [
        "Containerized builds with Bun & multi-runtime support",
        "GitHub Actions pipelines with test + lint + deploy",
        "Environment-aware config and secrets management"
      ],
      icon: "Monitor",
      tools: ["Docker", "GitHub Actions", "Railway", "Vercel", "Bun"],
      tooltip: "// deployment · pipelines · infrastructure"
    }
  ],
  

  // Easter eggs
  easterEggs: {
    konamiCode: [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ],
    konamiMessage: {
      title: "🎉 Konami Code Activated!",
      quote: '"There are only two hard things in Computer Science:\ncache invalidation and naming things." - Phil Karlton',
    },
  },

  // Spotify widget
  spotify: {
    mockTracks: [
      {
        name: "Resonance",
        artist: "HOME",
        url: "https://open.spotify.com/track/2jJfnDA6LI0UuLyBUNDUKS",
        image: "/placeholder.svg?height=32&width=32",
        isPlaying: true,
      },
      {
        name: "Midnight City",
        artist: "M83",
        url: "https://open.spotify.com/track/0FDzzruyVECATHXKHFs9M0",
        image: "/placeholder.svg?height=32&width=32",
        isPlaying: true,
      },
      {
        name: "Synthwave Dreams",
        artist: "Neon Nights",
        url: "https://open.spotify.com/track/example",
        image: "/placeholder.svg?height=32&width=32",
        isPlaying: true,
      },
    ],
  },

  // Footer
  footer: {
    terminalCommand: "connect --to github, linkedin, email",
    terminalResponse: "Connection established. Ready to collaborate.",
    tagline: "Crafted with precision • Designed to inspire • Deployed with intent",
    status: "Adding features nobody asked for",
  },

  // Contact section
  contact: {
    title: "Let's Build Fast & Scalable Systems",
    subtitle: "Got an idea or project in mind? Let's talk.",
    description:
      "Whether you're building a startup backend, need help scaling infrastructure, or just want to jam on ideas — I'm always open to interesting conversations. Reach out!",
    email: "dv6510@gmail.com",
    calendly: "https://calendly.com/itisrohit/30min",
    availability: "Open to freelance and short-term collaborations",
    responseTime: "Typically replies within a day",
    location: "India (Remote-first, flexible hours)",
    timezone: "IST (UTC+5:30)"
  },
  

  // System metrics defaults
  systemMetrics: {
    defaultCpuUsage: 23,
    defaultMemoryUsage: 67,
    defaultUptime: 99.99,
    defaultLatency: 12.5,
    cpuRange: { min: 15, max: 35 },
    memoryRange: { min: 60, max: 80 },
    latencyRange: { min: 10, max: 15 },
    statusLabel: "ALIVE",
    uptimeLabel: "0x7FFF",
    hackerStatusLabel: "HACKED",
    hackerUptimeLabel: "0x1337",
  },
}

// Helper function to get icon component by name
export const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    Terminal,
    Briefcase,
    Calendar,
    ArrowRight,
    Server,
    Database,
    Monitor,
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Cpu,
    HardDrive,
    Wifi,
    CheckCircle,
    Play,
    Pause,
  }
  return iconMap[iconName] || Terminal
}

// Import all icons at the top
import {
  Terminal,
  Briefcase,
  Calendar,
  ArrowRight,
  Server,
  Database,
  Monitor,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cpu,
  HardDrive,
  Wifi,
  CheckCircle,
  Play,
  Pause,
} from "lucide-react" 