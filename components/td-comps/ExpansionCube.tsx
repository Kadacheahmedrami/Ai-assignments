"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ExpansionCubeProps {
  position: [number, number, number]
  scale: { x: number; y: number; z: number }
  color: string
  delay: number
  // Removed unused 'neighbors' prop
}

export default function ExpansionCube({ position, scale, color, delay }: ExpansionCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [active, setActive] = useState<boolean>(false)
  const [fullyAnimated, setFullyAnimated] = useState<boolean>(false)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    const timer = setTimeout(() => {
      setActive(true)

      const fullTimer = setTimeout(() => {
        setFullyAnimated(true)
      }, 500)

      timers.push(fullTimer)
    }, delay * 100)

    timers.push(timer)

    return () => {
      timers.forEach((t) => clearTimeout(t))
    }
  }, [delay])

  useFrame((state) => {
    if (!meshRef.current || !active) return

    const time = state.clock.getElapsedTime()

    if (!fullyAnimated) {
      const progress = Math.min((state.clock.elapsedTime - delay * 0.1) * 2, 1)
      meshRef.current.scale.set(scale.x * progress, scale.y * progress, scale.z * progress)
    }

    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      const emissiveIntensity = 0.3 + Math.sin(time * 4 + delay) * 0.2
      meshRef.current.material.emissiveIntensity = emissiveIntensity
    }
  })

  const initialScale: [number, number, number] = active
    ? [scale.x, scale.y, scale.z]
    : [0.01, 0.01, 0.01]

  return (
    <mesh ref={meshRef} position={position} scale={initialScale} castShadow receiveShadow>
      <boxGeometry args={[1.0, 1.0, 1.0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.9}
        roughness={0.2}
        metalness={0.4}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}
