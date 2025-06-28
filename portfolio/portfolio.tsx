"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

import {
  ArrowRight,
  CheckCircle,
  Cpu,
  HardDrive,
  Terminal,
  Wifi,
  Play,
  Pause,
  Github,
  ExternalLink,
  Mail,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { siteConfig, getIconComponent } from "@/lib/data";

// Magnetic Button Component
function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    if (distance < 100) {
      const strength = Math.max(0, 1 - distance / 100);
      x.set((e.clientX - centerX) * strength * 0.3);
      y.set((e.clientY - centerY) * strength * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Cursor Following Gradient - Updated for subtle, premium feel
function CursorGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{
        left: mousePosition.x - 75,
        top: mousePosition.y - 75,
        width: 150,
        height: 150,
        background:
          "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(40px)",
        mixBlendMode: "soft-light",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        opacity: { duration: 0.4, ease: "easeOut" },
        x: { type: "spring", stiffness: 80, damping: 20, mass: 0.5 },
        y: { type: "spring", stiffness: 80, damping: 20, mass: 0.5 },
      }}
    />
  );
}

// Floating Background Elements
function FloatingElements() {
  const symbols = [
    "<>",
    "{}",
    "const",
    "fn",
    "[]",
    "()",
    "=>",
    "&&",
    "||",
    "async",
  ];
  const [positions, setPositions] = useState<
    Array<{
      left: number;
      top: number;
      x: number;
      rotate: number;
      duration: number;
      delay: number;
    }>
  >([]);

  // Generate random positions only on client side
  useEffect(() => {
    setPositions(
      symbols.map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        x: Math.random() * 20 - 10,
        rotate: Math.random() * 10 - 5,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  if (positions.length === 0) {
    return null; // Don't render until positions are generated
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {symbols.map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-blue-400/5 text-lg select-none"
          style={{
            left: `${positions[i].left}%`,
            top: `${positions[i].top}%`,
            filter: "blur(1px)",
            mixBlendMode: "soft-light",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, positions[i].x, 0],
            rotate: [0, positions[i].rotate, 0],
            opacity: [0.05, 0.02, 0.05],
          }}
          transition={{
            duration: positions[i].duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: positions[i].delay,
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}

// Easter Egg Components
function EasterEggs({
  hackerMode,
  setHackerMode,
}: {
  hackerMode: boolean;
  setHackerMode: (v: boolean) => void;
}) {
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [showKonamiEgg, setShowKonamiEgg] = useState(false);
  const [show404, setShow404] = useState(false);

  const konamiCode = siteConfig.easterEggs.konamiCode;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Konami Code
      const newSequence = [...konamiSequence, e.code].slice(-10);
      setKonamiSequence(newSequence);

      if (newSequence.join(",") === konamiCode.join(",")) {
        setShowKonamiEgg(true);
        setTimeout(() => setShowKonamiEgg(false), 3000);
        setKonamiSequence([]);
      }

      // Hacker mode toggle
      if (e.key === "*") {
        setHackerMode(!hackerMode);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // 404 corner trap
      const { innerWidth, innerHeight } = window;
      const cornerSize = 100;
      const isInCorner =
        (e.clientX < cornerSize && e.clientY < cornerSize) ||
        (e.clientX > innerWidth - cornerSize && e.clientY < cornerSize) ||
        (e.clientX < cornerSize && e.clientY > innerHeight - cornerSize) ||
        (e.clientX > innerWidth - cornerSize &&
          e.clientY > innerHeight - cornerSize);

      if (isInCorner && Math.random() < 0.01) {
        setShow404(true);
        setTimeout(() => setShow404(false), 1500);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [konamiSequence, hackerMode, setHackerMode]);

  return (
    <>
      {/* Konami Code Easter Egg */}
      {showKonamiEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-900/95 backdrop-blur-sm border border-green-400/50 rounded-lg p-6 text-center"
        >
          <div className="text-green-400 font-mono text-lg mb-2">
            {siteConfig.easterEggs.konamiMessage.title}
          </div>
          <div className="text-gray-300 font-mono text-sm">
            {siteConfig.easterEggs.konamiMessage.quote}
          </div>
        </motion.div>
      )}

      {/* 404 Corner Trap */}
      {show404 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 right-4 z-50 bg-red-900/20 border border-red-400/30 rounded px-3 py-1"
        >
          <span className="text-red-400 font-mono text-sm">
            ⚠️ unexpected route: /chaos-mode
          </span>
        </motion.div>
      )}

      {/* Hacker Mode Indicator */}
      {hackerMode && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-3 left-3 z-50 pointer-events-none"
        >
          {/* Matrix Rain Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 animate-matrix-rain" style={{ zIndex: 0, pointerEvents: 'none' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="block absolute left-0 top-0 text-green-400 font-mono text-[10px] select-none animate-matrix-fall"
                style={{
                  left: `${i * 10}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1.5 + Math.random()}s`,
                }}
              >
                {Array.from({ length: 7 })
                  .map(() => String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)))
                  .join('')}
              </span>
            ))}
          </div>
          {/* Glitchy/animated text */}
          <span className="relative z-10 px-2 py-1 bg-black/70 border border-green-400/30 rounded shadow font-mono text-green-400 text-xs md:text-sm tracking-wider glitch" style={{ letterSpacing: '0.08em', textShadow: '0 0 4px #00ff99, 0 0 1px #00ff99' }}>
            <span className="glitch-text">hacker-mode: enabled</span>
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1 text-green-400"
            >
              █
            </motion.span>
          </span>
          <style jsx>{`
            .glitch {
              position: relative;
              display: inline-block;
            }
            .glitch-text {
              position: relative;
              animation: glitch 1.2s infinite linear alternate-reverse;
            }
            @keyframes glitch {
              0% { text-shadow: 2px 0 #00ff99, -2px 0 #00ff99; }
              20% { text-shadow: -2px 2px #00ff99, 2px -2px #00ff99; }
              40% { text-shadow: 2px -2px #00ff99, -2px 2px #00ff99; }
              60% { text-shadow: -2px 0 #00ff99, 2px 0 #00ff99; }
              80% { text-shadow: 2px 2px #00ff99, -2px -2px #00ff99; }
              100% { text-shadow: 0 0 8px #00ff99, 0 0 2px #00ff99; }
            }
            @keyframes matrix-fall {
              0% { top: -24px; opacity: 0; }
              10% { opacity: 1; }
              100% { top: 60px; opacity: 0; }
            }
            .animate-matrix-fall {
              animation: matrix-fall linear infinite;
            }
            .animate-matrix-rain {
              pointer-events: none;
            }
          `}</style>
        </motion.div>
      )}

      {/* Apply hacker mode styles */}
      {hackerMode && (
        <style jsx global>{`
          body {
            filter: hue-rotate(120deg) contrast(1.1);
          }
        `}</style>
      )}
      {hackerMode && (
  <style jsx global>{`
    body,
    * {
      cursor: url("/cursoricon.svg") 16 16, auto !important;
    }
  `}</style>
)}

    </>
  );
}

// Name Hover Component
function NameHover({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded px-3 py-1 whitespace-nowrap z-[9999] shadow-xl"
        >
          <span className="text-gray-400 font-mono text-sm">{tooltip}</span>
        </motion.div>
      )}
    </div>
  );
}

function TerminalOutput() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const terminalLines = siteConfig.terminal.demo.lines;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < terminalLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [isPlaying, terminalLines.length]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  const resetAnimation = () => {
    setVisibleLines(0);
    setIsPlaying(true);
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-1">
      {/* Terminal content */}
      <div className="space-y-1">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-2 ${
              line.type === "success"
                ? "text-green-400"
                : line.type === "command"
                ? "text-blue-400"
                : line.type === "output"
                ? "text-gray-300"
                : "text-gray-300"
            }`}
          >
            {line.type === "success" && (
              <span className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] mt-0.5">
                ✔
              </span>
            )}
            {line.type === "command" && (
              <span className="text-blue-400 mt-0.5">$</span>
            )}
            {line.type === "output" && (
              <span className="text-gray-500 mt-0.5">→</span>
            )}
            <span
              className={`${
                line.type === "success"
                  ? "drop-shadow-[0_0_4px_rgba(34,197,94,0.2)]"
                  : ""
              } font-mono text-sm leading-relaxed`}
            >
              {line.text.replace(/^[✔$→]\s*/, "")}
            </span>
          </motion.div>
        ))}

        {/* Final cursor */}
        {visibleLines === terminalLines.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-gray-400"
          >
            <span className="text-blue-400">$</span>
            <span>_</span>
            {showCursor && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="bg-green-400 text-gray-900 px-1"
              >
                █
              </motion.span>
            )}
          </motion.div>
        )}
      </div>

      {/* Terminal Controls */}
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-700/30">
        <Button
          onClick={toggleAnimation}
          className="border-gray-600 text-gray-400 hover:bg-gray-700/50 h-8 px-3 text-xs"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 mr-1" />
          ) : (
            <Play className="w-3 h-3 mr-1" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={resetAnimation}
          className="border-gray-600 text-gray-400 hover:bg-gray-700/50 h-8 px-3 text-xs"
        >
          Reset
        </Button>
        <div className="flex-1" />
        <div className="text-xs text-gray-500 font-mono">
          {visibleLines}/{terminalLines.length} lines
        </div>
      </div>
    </div>
  );
}

function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    Array<{ command: string; output: string; type: string }>
  >([
    {
      command: siteConfig.terminal.interactive.welcome.command,
      output: siteConfig.terminal.interactive.welcome.output,
      type: siteConfig.terminal.interactive.welcome.type,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Add useEffect for auto-scrolling
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = siteConfig.terminal.interactive.commands;

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    const response = commands[trimmedCmd] || {
      output: `Command not found: ${cmd}. Type 'help' for available commands.`,
      type: "error",
    };

    setHistory((prev) => [
      ...prev,
      { command: cmd, output: response.output, type: response.type },
    ]);
    setCommandHistory((prev) => [...prev, cmd]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        handleCommand(input);
        setInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div ref={terminalRef} className="space-y-2 max-h-96 overflow-y-auto">
      {history.map((entry, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center gap-2 text-blue-400">
            <span>$</span>
            <span className="font-mono text-sm">{entry.command}</span>
          </div>
          {entry.output && (
            <div
              className={`ml-4 font-mono text-sm whitespace-pre-line ${
                entry.type === "success"
                  ? "text-green-400"
                  : entry.type === "error"
                  ? "text-red-400"
                  : entry.type === "info"
                  ? "text-cyan-400"
                  : "text-gray-300"
              }`}
            >
              {entry.output}
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center gap-2 text-blue-400">
        <span>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-white font-mono text-sm flex-1"
          placeholder="Type a command..."
          autoFocus
        />
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="bg-green-400 text-gray-900 px-1"
        >
          █
        </motion.span>
      </div>
    </div>
  );
}

// Spotify Now Playing Widget - Real API Integration
function SpotifyWidget() {
  const [currentTrack, setCurrentTrack] = useState<{
    name: string;
    artist: string;
    url: string;
    image?: string;
    isPlaying: boolean;
    album?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCurrentTrack = async () => {
    try {
      setIsLoading(true);
      setError(false);

      const response = await fetch("/api/spotify");
      const data = await response.json();

      if (data.isPlaying && data.title) {
        setCurrentTrack({
          name: data.title,
          artist: data.artist,
          url: data.songUrl,
          image: data.albumImageUrl,
          isPlaying: data.isPlaying,
          album: data.album,
        });
      } else {
        setCurrentTrack(null);
      }
    } catch (error) {
      console.error("Failed to fetch Spotify data:", error);
      setError(true);
      setCurrentTrack(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700/50 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-700/50 rounded animate-pulse" />
              <div className="h-2 bg-gray-700/30 rounded animate-pulse w-2/3" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-red-300 text-sm font-medium">
                Spotify connection error
              </p>
              <p className="text-red-500 text-xs">Check API configuration</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!currentTrack) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 text-sm font-medium">
                Nothing playing right now
              </p>
              <p className="text-gray-500 text-xs">Spotify</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={currentTrack.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="block w-full max-w-sm mx-auto group"
    >
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-green-500/30 transition-colors">
        <div className="flex items-center gap-3">
          {/* Album art */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-600/50 group-hover:border-green-500/50 transition-colors">
              {currentTrack.image ? (
                <img
                  src={currentTrack.image}
                  alt={currentTrack.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700/50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-green-500 font-medium">
                NOW PLAYING
              </span>
              <div className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-green-500 rounded-full"
                    animate={{
                      height: ["2px", "6px", "2px"],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-white text-sm font-medium truncate group-hover:text-green-400 transition-colors">
              {currentTrack.name}
            </h3>

            <p className="text-gray-400 text-xs truncate">
              {currentTrack.artist}
            </p>

            {currentTrack.album && (
              <p className="text-gray-500 text-xs truncate">
                {currentTrack.album}
              </p>
            )}
          </div>

          {/* Spotify icon */}
          <div className="flex-shrink-0 text-gray-500 group-hover:text-green-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

// 1. Background Particles
function BackgroundParticles() {
  const [particles, setParticles] = useState<
    Array<{
      left: number;
      top: number;
      duration: number;
      delay: number;
    }>
  >([]);

  // Generate random positions only on client side
  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  if (particles.length === 0) {
    return null; // Don't render until particles are generated
  }

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
}

// 2. Footer Particles
function FooterParticles({ isActive }: { isActive: boolean }) {
  const [smallParticles, setSmallParticles] = useState<
    Array<{
      left: number;
      top: number;
      duration: number;
      delay: number;
      repeatDelay: number;
      x1: number;
      x2: number;
      x3: number;
    }>
  >([]);
  const [accentParticles, setAccentParticles] = useState<
    Array<{
      left: number;
      top: number;
      duration: number;
      delay: number;
      repeatDelay: number;
      x1: number;
      x2: number;
    }>
  >([]);
  const [lines, setLines] = useState<
    Array<{
      left: number;
      top: number;
      width: number;
      rotate: number;
      duration: number;
      delay: number;
      repeatDelay: number;
      rotate2: number;
    }>
  >([]);

  // Generate random positions only on client side
  useEffect(() => {
    setSmallParticles(
      Array.from({ length: 30 }).map((_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        repeatDelay: Math.random() * 3 + 1,
        x1: Math.random() * 40 - 20,
        x2: Math.random() * 60 - 30,
        x3: Math.random() * 80 - 40,
      }))
    );
    setAccentParticles(
      Array.from({ length: 8 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 1.5,
        repeatDelay: Math.random() * 4 + 2,
        x1: Math.random() * 60 - 30,
        x2: Math.random() * 80 - 40,
      }))
    );
    setLines(
      Array.from({ length: 5 }).map(() => ({
        left: Math.random() * 60 + 20,
        top: Math.random() * 80 + 10,
        width: Math.random() * 100 + 50,
        rotate: Math.random() * 360,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        repeatDelay: Math.random() * 5 + 2,
        rotate2: Math.random() * 360 + 180,
      }))
    );
  }, []);

  if (smallParticles.length === 0) {
    return null; // Don't render until particles are generated
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {isActive &&
        smallParticles.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0
                ? "bg-blue-400/40"
                : i % 3 === 1
                ? "bg-cyan-400/40"
                : "bg-green-400/40"
            }`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              y: 20,
            }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0],
              y: [20, -60, -120, -180],
              x: [0, p.x1, p.x2, p.x3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: p.repeatDelay,
              ease: "easeOut",
            }}
          />
        ))}

      {isActive &&
        accentParticles.map((p, i) => (
          <motion.div
            key={`accent-${i}`}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/30 to-cyan-400/30 blur-sm"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0.6, 0],
              scale: [0, 1.5, 1.2, 0],
              rotate: [0, 180, 360],
              y: [0, -80, -160, -240],
              x: [0, p.x1, p.x2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: p.repeatDelay,
              ease: "easeOut",
            }}
          />
        ))}

      {isActive &&
        lines.map((p, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}px`,
              transformOrigin: "left center",
            }}
            initial={{
              opacity: 0,
              scaleX: 0,
              rotate: p.rotate,
            }}
            animate={{
              opacity: [0, 0.6, 0.3, 0],
              scaleX: [0, 1, 0.8, 0],
              rotate: [p.rotate, p.rotate2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: p.repeatDelay,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}

function CardTitleWithTooltip({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (showTooltip && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      
      // Only apply responsive positioning on smaller screens
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate available space
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        let left = rect.left + 16;
        let top = rect.bottom + 8;
        
        // If not enough space below, position above
        if (spaceBelow < 40 && spaceAbove >= 40) {
          top = rect.top - 40;
        }
        
        // Ensure tooltip doesn't go off-screen horizontally with generous margins
        const tooltipWidth = Math.min(rect.width, viewportWidth - 80); // 40px margin on each side
        if (left + tooltipWidth > viewportWidth - 40) {
          left = viewportWidth - tooltipWidth - 40;
        }
        if (left < 40) {
          left = 40;
        }
        
        // Ensure tooltip doesn't go off-screen vertically with generous margins
        if (top + 40 > viewportHeight - 40) {
          top = viewportHeight - 40 - 40;
        }
        if (top < 40) {
          top = 40;
        }
        
        setCoords({
          left,
          top,
          width: tooltipWidth,
        });
      } else {
        // Original desktop behavior
        setCoords({
          left: rect.left + 16,
          top: rect.bottom + 8,
          width: rect.width,
        });
      }
    }
  }, [showTooltip]);

  return (
    <>
      <h3
        ref={ref}
        className="text-xl font-bold mb-3 text-white font-mono cursor-pointer group-hover:text-blue-400 transition-colors duration-300"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </h3>
      {showTooltip && tooltip && coords && typeof window !== "undefined"
        ? createPortal(
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded px-3 py-1 z-[9999] shadow-xl pointer-events-none"
              style={{
                left: coords.left,
                top: coords.top,
                minWidth: coords.width,
                // Only apply responsive text wrapping on mobile
                ...(typeof window !== "undefined" && window.innerWidth < 768 && {
                  maxWidth: 'calc(100vw - 80px)', // 40px margin on each side
                  whiteSpace: 'normal',
                }),
                ...(typeof window !== "undefined" && window.innerWidth >= 768 && {
                  whiteSpace: 'nowrap',
                }),
              }}
            >
              <span className="text-gray-400 font-mono text-sm">
                {tooltip}
              </span>
            </motion.div>,
            document.body
          )
        : null}
    </>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [currentTime, setCurrentTime] = useState("");
  const [uptime, setUptime] = useState(siteConfig.systemMetrics.defaultUptime);
  const [latency, setLatency] = useState(
    siteConfig.systemMetrics.defaultLatency
  );
  const [cpuUsage, setCpuUsage] = useState(
    siteConfig.systemMetrics.defaultCpuUsage
  );
  const [memoryUsage, setMemoryUsage] = useState(
    siteConfig.systemMetrics.defaultMemoryUsage
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [deployLogs, setDeployLogs] = useState(siteConfig.deploymentLogs);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [activeTerminal, setActiveTerminal] = useState("demo");
  const [footerParticlesActive, setFooterParticlesActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // Move hackerMode state to top-level
  const [hackerMode, setHackerMode] = useState(false);

  // Add ref for deployment logs container
  const deployLogsRef = useRef<HTMLDivElement>(null);
  // Add ref to track last added log to prevent duplicates
  const lastAddedLogRef = useRef<string>("");

  // Add state for terminal burst particles
  const [terminalBurstParticles, setTerminalBurstParticles] = useState<
    Array<{
      left: number;
      top: number;
      x: number;
    }>
  >([]);

  const logs = siteConfig.deploymentLogs;

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Dynamic system metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // CPU usage: realistic fluctuations within configured range
      setCpuUsage((prev) => {
        const change = (Math.random() - 0.5) * 8; // -4 to +4
        const newValue = Math.max(
          siteConfig.systemMetrics.cpuRange.min,
          Math.min(siteConfig.systemMetrics.cpuRange.max, prev + change)
        );
        return Math.round(newValue * 10) / 10; // Round to 1 decimal
      });

      // Memory usage: realistic fluctuations within configured range
      setMemoryUsage((prev) => {
        const change = (Math.random() - 0.5) * 6; // -3 to +3
        const newValue = Math.max(
          siteConfig.systemMetrics.memoryRange.min,
          Math.min(siteConfig.systemMetrics.memoryRange.max, prev + change)
        );
        return Math.round(newValue * 10) / 10; // Round to 1 decimal
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Set client flag and initialize time-dependent state
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(format(new Date(), "HH:mm:ss"));

    // Generate terminal burst particles only on client side
    setTerminalBurstParticles(
      Array.from({ length: 6 }).map(() => ({
        left: 20 + Math.random() * 60,
        top: 20 + Math.random() * 60,
        x: Math.random() * 20 - 10,
      }))
    );
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "HH:mm:ss"));
      setUptime(99.99 + Math.random() * 0.01);
      setLatency(
        siteConfig.systemMetrics.latencyRange.min +
          Math.random() *
            (siteConfig.systemMetrics.latencyRange.max -
              siteConfig.systemMetrics.latencyRange.min)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const logTimer = setInterval(() => {
      setCurrentLogIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= logs.length) {
          // Reset when we reach the end
          setDeployLogs([]);
          lastAddedLogRef.current = "";
          return 0;
        } else {
          const nextLog = logs[nextIndex];
          // Only add if this log hasn't been added recently
          if (lastAddedLogRef.current !== nextLog) {
            setDeployLogs((prev) => [...prev, nextLog]);
            lastAddedLogRef.current = nextLog;
          }
          return nextIndex;
        }
      });
    }, 2000);

    return () => clearInterval(logTimer);
  }, [isClient, logs.length]);

  useEffect(() => {
    if (deployLogsRef.current) {
      deployLogsRef.current.scrollTop = deployLogsRef.current.scrollHeight;
    }
  }, [deployLogs]);

  const handleBookCall = () => {
    // Open Calendly in a new tab
    window.open(siteConfig.social.calendly, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    function playClickSound() {
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // Main click (high freq, less shrill)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.value = 950;
      gain1.gain.value = 0.13;
      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Sub click (low freq, for depth)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.value = 90;
      gain2.gain.value = 0.14;
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      // Envelope for both
      gain1.gain.setValueAtTime(0.13, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.035);
      gain2.gain.setValueAtTime(0.14, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.035);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.035);
      osc2.stop(ctx.currentTime + 0.035);

      osc1.onended = () => ctx.close();
    }

    const handler = () => playClickSound();
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
        {/* Show a loading state or skeleton */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative"
      suppressHydrationWarning
    >
      {/* Enhanced Background Effects */}
      <CursorGradient />
      <FloatingElements />
      <EasterEggs hackerMode={hackerMode} setHackerMode={setHackerMode} />

      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Interactive Mouse Trail */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full pointer-events-none"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
              animate={{
                x: mousePosition.x + i * 10,
                y: mousePosition.y + i * 10,
                opacity: [0.3, 0, 0],
                scale: [1, 0.5, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Ambient gradient shifts */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Subtle particle flow */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${20 + ((i * 7) % 80)}%`,
                top: `${30 + ((i * 11) % 70)}%`,
              }}
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -25, 15, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Minimal grid perspective */}
        <motion.div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "perspective(1000px) rotateX(5deg)",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "25px 25px"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating radial gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-purple-500/2 to-transparent rounded-full blur-3xl" />

        {/* Background particles */}
        <BackgroundParticles />
      </div>

      {/* System Status Bar - Repositioned */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <div className="flex items-center gap-4 px-4 py-2 bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-green-400">
              {hackerMode ? siteConfig.systemMetrics.hackerStatusLabel : siteConfig.systemMetrics.statusLabel}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-700" />
          <span className="font-mono text-xs text-gray-400">
            {hackerMode ? siteConfig.systemMetrics.hackerUptimeLabel : siteConfig.systemMetrics.uptimeLabel}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 z-10 pt-20 sm:pt-0">
        <motion.div
          style={{ y }}
          className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full mb-5 text-xs font-mono text-blue-400 tracking-wide transition-shadow duration-200 hover:shadow-[0_0_8px_2px_rgba(34,197,246,0.15)]">
                {(() => {
                  const IconComponent = getIconComponent(
                    siteConfig.hero.badge.icon
                  );
                  return (
                    <IconComponent className="w-3.5 h-3.5 text-blue-400" />
                  );
                })()}
                {siteConfig.hero.badge.text}
              </div>

              {/* HEADLINE */}
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {siteConfig.hero.headline.primary}
                </span>
                ,<br />
                <span className="text-gray-300 font-semibold">
                  {siteConfig.hero.headline.secondary}
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {siteConfig.hero.headline.tertiary}
                </span>
              </h1>

              {/* SUBHEADLINE */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl"
              >
                {siteConfig.hero.subheadline}
              </motion.p>

              {/* BUTTONS */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-3 mb-2 w-full">
                <MagneticButton
                  size="lg"
                  className="flex items-center justify-center w-full xs:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 text-lg font-semibold rounded-lg border-0 shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
                  onClick={() => {
                    const el = document.getElementById('projects');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="flex items-center justify-center gap-2 w-full">
                    {(() => {
                      const IconComponent = getIconComponent(
                        siteConfig.hero.buttons.primary.icon
                      );
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                    {siteConfig.hero.buttons.primary.text}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </MagneticButton>
                <MagneticButton
                  size="lg"
                  onClick={handleBookCall}
                  className="flex items-center justify-center w-full xs:w-auto bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-200"
                >
                  <span className="flex items-center justify-center gap-2 w-full">
                    {(() => {
                      const IconComponent = getIconComponent(
                        siteConfig.hero.buttons.secondary.icon
                      );
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                    {siteConfig.hero.buttons.secondary.text}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right Column - System Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* System Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 transition-all duration-200 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-blue-500/10 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-mono text-sm text-gray-400">
                      SYSTEM METRICS
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.5)]" />
                      <span className="font-mono text-xs text-green-400">
                        LIVE
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 divide-x divide-gray-800">
                    <div className="space-y-2 pr-4">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-blue-400" />
                        <span className="font-mono text-sm text-gray-400">
                          CPU
                        </span>
                      </div>
                      <div className="text-2xl font-mono font-bold text-blue-300">
                        {cpuUsage.toFixed(1)}%
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-blue-400 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${cpuUsage}%` }}
                          whileHover={{ scaleY: 1.2 }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-green-400" />
                        <span className="font-mono text-sm text-gray-400">
                          Memory
                        </span>
                      </div>
                      <div className="text-2xl font-mono font-bold text-green-300">
                        {memoryUsage.toFixed(1)}%
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-green-400 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${memoryUsage}%` }}
                          whileHover={{ scaleY: 1.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Network Status */}
            <Card className="bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 transition-all duration-200 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-cyan-500/10 mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-sm text-gray-400">
                    NETWORK STATUS
                  </h3>
                  <Wifi className="w-4 h-4 text-blue-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-gray-400">
                      Latency
                    </span>
                    <span className="font-mono text-sm text-cyan-300 font-bold">
                      {latency.toFixed(1)}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-gray-400">
                      Uptime
                    </span>
                    <span className="font-mono text-sm text-green-400 font-bold">
                      {uptime.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-gray-400">
                      Region
                    </span>
                    <span className="font-mono text-sm text-gray-300 font-bold">
                      {siteConfig.location}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deployment Logs */}
            <Card className="bg-gray-900/50 border border-gray-800 hover:border-green-400/30 transition-all duration-200 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-green-400/10 mt-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-sm text-gray-400">
                    DEPLOYMENT LOGS
                  </h3>
                  <Terminal className="w-4 h-4 text-green-400" />
                </div>
                <div
                  className="space-y-1 h-32 overflow-hidden"
                  ref={deployLogsRef}
                >
                  {deployLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-mono text-xs text-gray-300 flex items-center gap-2"
                    >
                      {log.includes("✓") ? (
                        <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      ) : (
                        <div className="w-3 h-3 flex-shrink-0" />
                      )}
                      <span
                        className={
                          log.includes("✓") ? "text-green-400" : "text-gray-400"
                        }
                      >
                        {log}
                      </span>
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="font-mono text-xs text-green-400"
                  >
                    <span className="bg-green-400 w-2 h-3 inline-block ml-5 rounded animate-pulse" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Terminal Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* ASCII Art Banner for Hacker Mode */}
          {hackerMode && (
            <div className="mb-6 flex justify-center">
              <pre
                className="text-green-400 font-mono text-xs md:text-base leading-tight select-none text-center mx-auto drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                style={{
                  maxWidth: "100%",
                  whiteSpace: "pre",
                  overflowX: "auto",
                  display: "inline-block",
                }}
              >
                {String.raw`
   (\__/) 
   (•ㅅ•) 
   / 　 づ
-------------------------
🐔 "I peck firewalls for fun"
`}
              </pre>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Terminal Window */}
            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 xs:gap-4 px-2 xs:px-4 py-2 xs:py-3 bg-gray-800/50 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex flex-col xs:flex-row gap-1 xs:gap-4 w-full xs:w-auto min-w-0 overflow-x-auto">
                  <button
                    onClick={() => setActiveTerminal("demo")}
                    className={`font-mono text-xs xs:text-sm w-full xs:w-auto px-3 py-1 rounded transition-colors truncate ${
                      activeTerminal === "demo"
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    stack-demo.sh
                  </button>
                  <button
                    onClick={() => setActiveTerminal("interactive")}
                    className={`font-mono text-xs xs:text-sm w-full xs:w-auto px-3 py-1 rounded transition-colors truncate ${
                      activeTerminal === "interactive"
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    interactive.sh
                  </button>
                </div>
                <div className="w-16"></div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm leading-relaxed min-h-[400px] overflow-x-auto">
                {activeTerminal === "demo" ? (
                  <TerminalOutput />
                ) : (
                  <InteractiveTerminal />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Featured <span className="text-blue-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-400">
              Production systems built for scale and performance
            </p>
          </motion.div>

          <div className="space-y-16">
            {siteConfig.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col gap-6 relative overflow-hidden">
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Icon, Title, Role Row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-4 mb-2 relative z-10">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <Terminal className="w-5 h-5 text-blue-400" />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono mb-0 min-w-0">
                        {project.title}
                      </h3>
                    </div>
                    <div className="relative group/role w-full sm:w-auto">
                      <span className="font-mono font-normal text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 block w-full text-center sm:inline-block sm:w-auto sm:max-w-max sm:text-left sm:whitespace-nowrap break-words mt-2 sm:mt-0">
                        {project.role}
                      </span>
                    </div>
                  </div>
                  {/* Description */}
                  <p className="text-base text-gray-400 leading-relaxed mb-2 relative z-10">
                    {project.description}
                  </p>
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-2 relative z-10">
                    {project.stack.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-0.5 bg-gray-800/40 border border-gray-700/40 rounded-full font-mono text-xs text-gray-400 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-200 cursor-default"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          borderColor: "rgba(59, 130, 246, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  {/* Impact Bullets */}
                  <div className="space-y-2 mb-2">
                    {project.bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Buttons */}
                  <div className="flex flex-row flex-wrap gap-3 pt-2 relative z-10">
                    <MagneticButton
                      size="lg"
                      className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-600 hover:border-gray-500 px-6 py-3 font-semibold group/btn transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                      onClick={() => window.open(project.links.github, '_blank', 'noopener,noreferrer')}
                    >
                      <span className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.div>
                        View Source
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </span>
                    </MagneticButton>
                    {project.hasDemo ? (
                      <MagneticButton
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 font-semibold group/btn transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40"
                        onClick={() => window.open(project.links.demo, '_blank', 'noopener,noreferrer')}
                      >
                        <span className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.div>
                          Live Demo
                          <motion.div
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </span>
                      </MagneticButton>
                    ) : (
                      <MagneticButton
                        size="lg"
                        className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 px-6 py-3 font-semibold group/btn transition-all duration-300 shadow-lg cursor-not-allowed opacity-60"
                        disabled
                      >
                        <span className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          No Live Demo
                        </span>
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Engineer Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white font-mono">
              <span className="text-gray-500">//</span> what I engineer
            </h2>
            <p className="text-xl text-gray-400">
              Production-ready systems built with intention
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {siteConfig.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{ y: -2 }}
                className="group relative"
              >
                <Card className="bg-gray-900/30 border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-xl bg-gray-800/50 flex items-center justify-center mb-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                      {(() => {
                        const IconComponent = getIconComponent(service.icon);
                        return <IconComponent className="w-8 h-8" />;
                      })()}
                    </div>

                    <CardTitleWithTooltip tooltip={service.tooltip}>
                      {service.title}
                    </CardTitleWithTooltip>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      {service.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.15 + detailIndex * 0.1,
                          }}
                          viewport={{ once: false, amount: 0.2 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1 h-1 bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {detail}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tool badges */}
                    <div className="flex flex-wrap gap-2">
                      {service.tools.map((tool, toolIndex) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.15 + toolIndex * 0.05 + 0.3,
                          }}
                          viewport={{ once: false, amount: 0.2 }}
                          className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded font-mono text-xs text-gray-400 hover:border-gray-600 hover:text-gray-300 transition-all duration-200"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Let's <span className="text-blue-400">Connect</span>
            </h2>
            <p className="text-xl text-gray-400">
              {siteConfig.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                  <span className="text-gray-500">//</span> contact info
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {siteConfig.contact.description}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors font-mono"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <p className="text-gray-500 text-sm mt-1">
                      {siteConfig.contact.responseTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Schedule a Call
                    </h4>
                    <a
                      href={siteConfig.contact.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors font-mono"
                    >
                      Book 30-min session
                    </a>
                    <p className="text-gray-500 text-sm mt-1">
                      {siteConfig.contact.availability}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Terminal className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Location & Time
                    </h4>
                    <p className="text-cyan-400 font-mono">
                      {siteConfig.contact.location}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {siteConfig.contact.timezone}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Terminal-style contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm rounded-2xl shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-mono text-sm text-gray-400 ml-4">
                      contact-form.sh
                    </span>
                  </div>

                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex items-center gap-2 text-blue-400">
                      <span>$</span>
                      <span>
                        echo "Hello! I'm interested in working together."
                      </span>
                    </div>
                    <div className="text-gray-300 ml-4">
                      Hello! I'm interested in working together.
                    </div>

                    <div className="flex items-center gap-2 text-blue-400">
                      <span>$</span>
                      <span>cat &gt; message.txt</span>
                    </div>

                    <div className="ml-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-400">
                          Project: [Your project description]
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-400">
                          Timeline: [Expected timeline]
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-400">
                          Budget: [Budget range]
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-blue-400">
                      <span>$</span>
                      <span>send_message --to {siteConfig.contact.email}</span>
                    </div>
                    <div className="text-green-400 ml-4">
                      ✓ Message sent successfully!
                    </div>
                    <div className="text-gray-500 ml-4">
                      Response expected within 24 hours
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700/50">
                    <MagneticButton
                      onClick={handleBookCall}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 font-semibold rounded-lg border-0 shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Schedule a Call
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </MagneticButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 px-6 relative z-10">
        <FooterParticles isActive={footerParticlesActive} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Terminal command */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              onViewportEnter={() => setFooterParticlesActive(true)}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/30 transition-colors duration-300 relative overflow-hidden min-h-[80px]"
              >
                {/* Terminal particle burst on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  whileHover="hover"
                  initial="initial"
                >
                  {terminalBurstParticles.length > 0 &&
                    terminalBurstParticles.map((p, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400/60 rounded-full"
                        style={{
                          left: `${p.left}%`,
                          top: `${p.top}%`,
                        }}
                        variants={{
                          initial: { opacity: 0, scale: 0 },
                          hover: {
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            y: [0, -20, -40],
                            x: [0, p.x],
                          },
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-blue-400 mb-2 overflow-hidden"
                >
                  <span className="font-mono text-sm">$</span>
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: 'auto' }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="font-mono text-sm overflow-hidden whitespace-nowrap inline-block"
                    style={{
                      maxWidth: typeof window !== "undefined" && window.innerWidth < 768 
                        ? 'calc(100vw - 120px)' // Account for $ symbol, cursor, and margins
                        : 'auto'
                    }}
                  >
                    {siteConfig.footer.terminalCommand}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 2,
                      repeat: Number.POSITIVE_INFINITY, 
                      repeatDelay: 0.5
                    }}
                    className="bg-blue-400 text-gray-900 px-1 font-mono text-sm"
                  >
                    █
                  </motion.span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-green-400"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.8,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                    className="font-mono text-xs"
                  >
                    ✓
                  </motion.span>
                  <span className="font-mono text-xs">
                    {siteConfig.footer.terminalResponse}
                  </span>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="font-mono text-sm text-gray-400"
              >
                {siteConfig.footer.tagline}
              </motion.div>
            </motion.div>

            {/* Right side - Social links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center md:justify-end"
            >
              <div className="flex items-center gap-6">
                {[
                  {
                    icon: getIconComponent("Github"),
                    label: "GitHub",
                    onClick: () => window.open(siteConfig.social.github, '_blank', 'noopener,noreferrer'),
                    hoverColor: "hover:text-gray-300",
                    particleColor: "bg-gray-400/60",
                  },
                  {
                    icon: getIconComponent("Linkedin"),
                    label: "LinkedIn",
                    onClick: () => window.open(siteConfig.social.linkedin, '_blank', 'noopener,noreferrer'),
                    hoverColor: "hover:text-blue-400",
                    particleColor: "bg-blue-400/60",
                  },
                  {
                    icon: getIconComponent("Mail"),
                    label: "Email",
                    onClick: () => window.open(`mailto:${siteConfig.email}`),
                    hoverColor: "hover:text-cyan-400",
                    particleColor: "bg-cyan-400/60",
                  },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={social.onClick}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    viewport={{ once: true }}
                    className={`relative group text-gray-500 ${social.hoverColor} transition-all duration-300`}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <div className="relative">
                      {(() => {
                        const IconComponent = social.icon;
                        return <IconComponent className="w-6 h-6" />;
                      })()}
                      {/* Icon-specific particle burst */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        whileHover="hover"
                        initial="initial"
                      >
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 ${social.particleColor} rounded-full`}
                            style={{
                              left: "50%",
                              top: "50%",
                            }}
                            variants={{
                              initial: { opacity: 0, scale: 0, x: 0, y: 0 },
                              hover: {
                                opacity: [0, 1, 0],
                                scale: [0, 1.2, 0],
                                x: Math.cos((i / 8) * Math.PI * 2) * 30,
                                y: Math.sin((i / 8) * Math.PI * 2) * 30,
                              },
                            }}
                            transition={{
                              duration: 0.8,
                              delay: i * 0.05,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </motion.div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-current rounded-full blur-lg opacity-20" />
                      </div>
                      {/* Pulse ring on hover */}
                      <motion.div
                        className="absolute inset-0 border-2 border-current rounded-full opacity-0"
                        whileHover={{
                          opacity: [0, 0.3, 0],
                          scale: [1, 1.5, 2],
                          transition: { duration: 0.6 },
                        }}
                      />
                    </div>
                    {/* Label tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <motion.div
                        initial={{ scale: 0.8, y: 5 }}
                        whileHover={{ scale: 1, y: 0 }}
                        className="bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-1"
                      >
                        <span className="font-mono text-xs text-gray-300">
                          {social.label}
                        </span>
                      </motion.div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700/50" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 pt-6 border-t border-gray-800/30 space-y-6"
          >
            {/* Spotify Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <SpotifyWidget />
            </motion.div>

            {/* Time and status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="font-mono text-sm text-gray-400">
                {currentTime}
                {" • "}
                {siteConfig.footer.status}
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-2 text-gray-400"
                >
                  _
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
