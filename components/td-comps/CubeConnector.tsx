"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface CubeConnectorProps {
  startPosition: [number, number, number]
  endPosition: [number, number, number]
  color: string
  thickness?: number
  delay?: number
}

export default function CubeConnector({
  startPosition,
  endPosition,
  color,
  thickness = 0.1,
  delay = 0,
}: CubeConnectorProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Clear any existing timeouts to prevent memory leaks
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay * 100)

    return () => clearTimeout(timer)
  }, [delay])

  useFrame((state) => {
    if (!meshRef.current || !visible) return

    const time = state.clock.getElapsedTime()

    // Pulse the connector
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      const emissiveIntensity = 0.3 + Math.sin(time * 3 + delay * 0.5) * 0.2
      meshRef.current.material.emissiveIntensity = emissiveIntensity
    }
  })

  if (!visible) return null

  // Calculate the midpoint between the two positions
  const midX = (startPosition[0] + endPosition[0]) / 2
  const midY = (startPosition[1] + endPosition[1]) / 2
  const midZ = (startPosition[2] + endPosition[2]) / 2

  // Calculate the distance between the two positions
  const dx = endPosition[0] - startPosition[0]
  const dy = endPosition[1] - startPosition[1]
  const dz = endPosition[2] - startPosition[2]
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

  // Calculate the rotation to align the cylinder with the two positions
  const rotationX = Math.atan2(Math.sqrt(dx * dx + dz * dz), dy)
  const rotationY = Math.atan2(dz, dx)

  return (
    <mesh ref={meshRef} position={[midX, midY, midZ]} rotation={[rotationX, rotationY, 0]}>
      <cylinderGeometry args={[thickness, thickness, distance, 8]} />
      <meshStandardMaterial color={color} transparent={true} opacity={0.7} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  )
}

