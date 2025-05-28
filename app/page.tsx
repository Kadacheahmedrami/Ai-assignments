"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import NeuralNetwork from "@/components/tp-comps/neural-network"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Add dark class to body on mount
    document.body.classList.add("dark")

    return () => {
      document.body.classList.remove("dark")
    }
  }, [])

  if (!mounted) return null

  return (
    <main className="relative w-full h-full overflow-hidden bg-black dark">
      {/* Blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>

      {/* Neural network background */}
      <NeuralNetwork />

      {/* Glowing blue orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-blue-600/30 to-blue-800/30 blur-3xl animate-pulse"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                Kadache ahmed rami
              </span>{" "}
              AI Projects &amp; Assignments
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
              Welcome to my personal website where I share my assignments and projects from AI courses. Dive into my experiments and explore the innovative work I&apos;m doing in the field of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/assignments" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full text-lg font-medium flex items-center transition-all duration-300 shadow-lg shadow-blue-700/30 hover:shadow-blue-700/50">
                View Assignments
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="https://github.com/Kadacheahmedrami/Ai-assignments.git" className="border border-blue-700 text-blue-300 hover:bg-blue-800/50 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300">
                View GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating blue particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-500/80 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-zinc-500 text-sm animate-bounce">
        <p>Scroll to explore</p>
      </div>
    </main>
  )
}
