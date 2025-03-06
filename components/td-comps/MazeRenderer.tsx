"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import MazeScene from "./MazeScene"
import SearchAlgorithmSelector from "./SearchAlgorithmSelector"
import type { MazeProps } from "@/app/types/maze"
import type { SearchAlgorithm } from "@/app/types/search-types"

export default function MazeRenderer({ grid, cellSize = 1 }: MazeProps) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [showInstructions, setShowInstructions] = useState<boolean>(true)
  const [showSelector, setShowSelector] = useState<boolean>(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SearchAlgorithm | null>(null)
  const [canRestart, setCanRestart] = useState<boolean>(false)
  // Use a key to force re-render of MazeScene on restart
  const [sceneKey, setSceneKey] = useState<number>(0)

  // Note: With the updated SearchAlgorithm type, this now supports "greedy" as well.
  const startAnimation = () => {
    setShowSelector(true)
    setShowInstructions(false)
  }

  const handleAlgorithmSelect = (algorithm: SearchAlgorithm) => {
    setSelectedAlgorithm(algorithm)
    setShowSelector(false)
    setIsAnimating(true)
  }

  const handleRestart = () => {
    // Completely reset the state
    setIsAnimating(false)
    setSelectedAlgorithm(null)
    setShowSelector(false)
    setCanRestart(false)
    setSceneKey((prev) => prev + 1) // Force re-render of MazeScene

    // Short delay before allowing to start again
    setTimeout(() => {
      setShowInstructions(true)
    }, 500)
  }

  const handleAnimationComplete = () => {
    setCanRestart(true)
  }

  // Hide instructions after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full bg-black">
      <Canvas shadows camera={{ position: [0, 20, 0], fov: 60 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 30, 60]} />

        {/* Enhanced lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[10, 10, -10]} color="#5555ff" intensity={0.3} />

        {/* Add stars for a more dynamic background */}
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

        <MazeScene
          key={sceneKey} // Force re-render on restart
          grid={grid}
          cellSize={cellSize}
          isAnimating={isAnimating}
          startAnimation={startAnimation}
          searchAlgorithm={selectedAlgorithm}
          onAnimationComplete={handleAnimationComplete}
        />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minDistance={10}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={0}
        />
      </Canvas>


      {showInstructions && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 p-2 rounded-lg animate-pulse">
          Click on the green START cube to begin expansion animation
        </div>
      )}

      {showSelector && <SearchAlgorithmSelector onSelect={handleAlgorithmSelect} />}

      {canRestart && (
        <button
          onClick={handleRestart}
          className="absolute bottom-4  left-[82%]   lg:left-[93%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Restart
        </button>
      )}
    </div>
  )
}
