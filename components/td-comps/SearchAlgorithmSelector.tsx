"use client"

import { useState } from "react"
import type { SearchAlgorithm } from "@/app/types/search-types"

interface SearchAlgorithmSelectorProps {
  onSelect: (algorithm: SearchAlgorithm) => void
}

export default function SearchAlgorithmSelector({ onSelect }: SearchAlgorithmSelectorProps) {
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState<SearchAlgorithm | null>(null)

  const algorithms = [
    {
      id: "bfs",
      name: "Breadth-First Search",
      description: "Explores all neighbor nodes at the present depth before moving to nodes at the next depth level.",
    },
    {
      id: "dfs",
      name: "Depth-First Search",
      description: "Explores as far as possible along each branch before backtracking.",
    },
    {
      id: "ucs",
      name: "Uniform Cost Search",
      description: "Explores paths in order of increasing path cost.",
    },
    {
      id: "astar",
      name: "A* Search",
      description: "Uses heuristics to find the shortest path more efficiently.",
    },
    {
      id: "greedy",
      name: "Greedy Best-First Search",
      description: "Selects the next node to expand based solely on the heuristic estimating the cost from that node to the goal.",
    },
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Select Search Algorithm</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {algorithms.map((algorithm) => (
            <button
              key={algorithm.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                hoveredAlgorithm === algorithm.id
                  ? "bg-blue-600 border-blue-400"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => onSelect(algorithm.id as SearchAlgorithm)}
              onMouseEnter={() => setHoveredAlgorithm(algorithm.id as SearchAlgorithm)}
              onMouseLeave={() => setHoveredAlgorithm(null)}
            >
              <h3 className="text-lg font-semibold text-white">{algorithm.name}</h3>
            </button>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg min-h-24">
          {hoveredAlgorithm ? (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {algorithms.find((a) => a.id === hoveredAlgorithm)?.name}
              </h3>
              <p className="line-clamp-1 text-gray-300">
                {algorithms.find((a) => a.id === hoveredAlgorithm)?.description}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Hover over an algorithm to see its description
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
