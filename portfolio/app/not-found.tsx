"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowLeft, Terminal, Home } from "lucide-react"
import Link from "next/link"

// Ambient Background Particles
function AmbientParticles() {
  const [particles, setParticles] = useState<Array<{
    left: number
    top: number
    duration: number
    delay: number
    size: number
  }>>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 4,
        size: Math.random() * 3 + 1,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400/20 rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Drifting Gradient Blob
function GradientBlob() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          left: "20%",
          top: "30%",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          right: "25%",
          bottom: "20%",
        }}
      />
    </div>
  )
}

// Magnetic Button Component
function MagneticButton({ children, className, ...props }: any) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setMousePosition({
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    })
  }

  return (
    <motion.button
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      animate={{
        x: isHovered ? mousePosition.x * 0.1 : 0,
        y: isHovered ? mousePosition.y * 0.1 : 0,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background Effects */}
      <AmbientParticles />
      <GradientBlob />
      
      {/* Large Blurred 404 Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[20rem] font-black text-blue-400/30 blur-sm select-none"
          style={{ lineHeight: 0.8 }}
        >
          404
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Glassmorphism Card */}
          <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800/50 rounded-2xl p-8 md:p-12 shadow-2xl">
            {/* Error Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center"
            >
              <Terminal className="w-10 h-10 text-red-400" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Page Not Found
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-xl text-gray-400 mb-8 leading-relaxed"
            >
              The page you're looking for doesn't exist or has been moved to a different location.
            </motion.p>

            {/* Terminal-style Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mb-8 font-mono text-sm"
            >
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <span>$</span>
                <span>find /pages --name "requested-page"</span>
              </div>
              <div className="text-gray-300 ml-4">find: no such file or directory</div>
              <div className="flex items-center gap-2 text-blue-400 mt-2">
                <span>$</span>
                <span>echo "404 - Page not found"</span>
              </div>
              <div className="text-red-400 ml-4">404 - Page not found</div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex justify-center"
            >
              <MagneticButton
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 font-semibold rounded-lg border-0 shadow-lg hover:shadow-blue-500/20 transition-all duration-200 group"
              >
                <Link href="/">
                  <span className="flex items-center justify-center gap-2">
                    <Home className="w-5 h-5" />
                    Back to Home
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </motion.div>
                  </span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 text-sm font-mono">
              Error 404 • Page not found • <span className="text-blue-400">backend-first.dev</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 