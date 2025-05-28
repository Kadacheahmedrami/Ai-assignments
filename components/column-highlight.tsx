"use client"

import { useRef } from "react"
import type * as THREE from "three"

interface ColumnHighlightProps {
  column: number
  valid: boolean
}

export default function ColumnHighlight({ column, valid }: ColumnHighlightProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={[column - 3, 3, 0.4]} scale={[0.9, 6, 0.1]}>
      <boxGeometry />
      <meshBasicMaterial color={valid ? "#4ade80" : "#ef4444"} transparent opacity={0.3} />
    </mesh>
  )
}
