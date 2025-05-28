"use client"

import { useRef } from "react"
import type * as THREE from "three"

interface GamePieceProps {
  position: [number, number, number]
  player: number
}

export default function GamePiece({ position, player }: GamePieceProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Colors for players with more vibrant colors for better visibility
  const playerColors = {
    1: "#ef4444", // Red for player
    2: "#facc15", // Yellow for AI
  }

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
      <meshStandardMaterial
        color={player === 1 ? playerColors[1] : playerColors[2]}
        metalness={0.5}
        roughness={0.2}
        emissive={player === 1 ? playerColors[1] : playerColors[2]}
        emissiveIntensity={0.5}
      />

      {/* Highlight on top of piece */}
      <mesh position={[0, 0.15, 0]} scale={0.9}>
        <cylinderGeometry args={[0.25, 0.25, 0.01, 16]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    </mesh>
  )
}
