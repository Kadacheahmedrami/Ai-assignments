"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import NeuralNetwork from "@/components/neural-network"

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
    <main className="relative w-full h-[92.2vh] overflow-hidden bg-black dark">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black"></div>

      {/* Neural network background */}
      <NeuralNetwork />

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-violet-600/30 to-indigo-600/30 blur-3xl animate-pulse"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600">
                Neural
              </span>{" "}
              Intelligence Evolved
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
              Experience the next generation of artificial intelligence. Our neural networks learn, adapt, and evolve to
              solve the most complex problems.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 text-white px-8 py-3 rounded-full text-lg font-medium flex items-center transition-all duration-300 shadow-lg shadow-violet-700/30 hover:shadow-violet-700/50">
                Explore AI Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-500/80 animate-pulse"
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

