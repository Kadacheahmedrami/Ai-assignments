"use client"

import { useRef } from "react"
import type * as THREE from "three"

interface GameBoardProps {
  board: number[][]
  emptyValue: number
}

export default function GameBoard({ board, emptyValue }: GameBoardProps) {
  const boardRef = useRef<THREE.Group>(null)

  return (
    <group ref={boardRef}>
      {/* Main board frame - simplified material */}
      <mesh position={[0, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[7.5, 6.5, 0.5]} />
        <meshPhysicalMaterial
          color="#4338ca"
          metalness={0.2}
          roughness={0.1}
          transmission={0.6}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Holes for the pieces - only render for empty positions */}
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          // Only render the hole if the position is empty
          if (cell === emptyValue) {
            return (
              <mesh key={`hole-${rowIndex}-${colIndex}`} position={[colIndex - 3, 5 - rowIndex, 0.3]}>
                <cylinderGeometry args={[0.4, 0.4, 0.6, 16]} />
                <meshStandardMaterial color="#000" transparent opacity={0.7} />
              </mesh>
            )
          }
          return null
        }),
      )}

      {/* Base of the board - simplified material */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[8, 1, 2]} />
        <meshPhysicalMaterial color="#4f46e5" metalness={0.2} roughness={0.2} transmission={0.4} clearcoat={0.3} />
      </mesh>

      {/* Side columns - simplified material */}
      <mesh position={[-4, 2.5, 0]}>
        <boxGeometry args={[0.5, 6.5, 0.5]} />
        <meshPhysicalMaterial color="#6366f1" metalness={0.3} roughness={0.2} transmission={0.5} />
      </mesh>

      <mesh position={[4, 2.5, 0]}>
        <boxGeometry args={[0.5, 6.5, 0.5]} />
        <meshPhysicalMaterial color="#6366f1" metalness={0.3} roughness={0.2} transmission={0.5} />
      </mesh>

      {/* Bottom tray for pieces - simplified material */}
      <mesh position={[0, -1.25, 1]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[7.5, 0.2, 2]} />
        <meshPhysicalMaterial color="#4f46e5" metalness={0.3} roughness={0.2} transmission={0.5} />
      </mesh>
    </group>
  )
}
