"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sparkles, Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { easing } from "maath"

function NeuralNetwork({ count = 100, connections = 150 }) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const {  mouse } = useThree()

  // Create nodes
  useEffect(() => {
    if (!pointsRef.current || !linesRef.current) return

    // Create nodes
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 0.1 + 0.05
    }

    pointsRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    pointsRef.current.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    pointsRef.current.geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    // Create connections
    const linePositions = new Float32Array(connections * 6)
    const lineColors = new Float32Array(connections * 6)

    for (let i = 0; i < connections; i++) {
      const i6 = i * 6

      const nodeA = Math.floor(Math.random() * count)
      const nodeB = Math.floor(Math.random() * count)

      // Start point
      linePositions[i6] = positions[nodeA * 3]
      linePositions[i6 + 1] = positions[nodeA * 3 + 1]
      linePositions[i6 + 2] = positions[nodeA * 3 + 2]

      // End point
      linePositions[i6 + 3] = positions[nodeB * 3]
      linePositions[i6 + 4] = positions[nodeB * 3 + 1]
      linePositions[i6 + 5] = positions[nodeB * 3 + 2]

      // Colors
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6)

      lineColors[i6] = color.r
      lineColors[i6 + 1] = color.g
      lineColors[i6 + 2] = color.b

      lineColors[i6 + 3] = color.r
      lineColors[i6 + 4] = color.g
      lineColors[i6 + 5] = color.b
    }

    linesRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
    linesRef.current.geometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3))
  }, [count, connections])

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return
  
    // Rotate based on mouse position
    const rotationSpeed = 0.05
    pointsRef.current.rotation.y += rotationSpeed * delta
    linesRef.current.rotation.y += rotationSpeed * delta
  
    // Create a temporary vector from the Euler values
    const currentRot = new THREE.Vector3(
      pointsRef.current.rotation.x,
      pointsRef.current.rotation.y,
      pointsRef.current.rotation.z
    )
    const targetRot = new THREE.Vector3(
      Math.PI / 4 + mouse.y * 0.2,
      Math.PI / 4 + mouse.x * 0.2,
      0
    )
  
    // Damp the vector values
    easing.damp3(currentRot, targetRot, 0.2, delta)
  
    // Update the Euler with the damped values
    pointsRef.current.rotation.set(currentRot.x, currentRot.y, currentRot.z)
    linesRef.current.rotation.copy(pointsRef.current.rotation)
  
    // Pulse effect code...
    const time = state.clock.getElapsedTime()
    const sizes = pointsRef.current.geometry.attributes.size as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      sizes.array[i] = Math.sin(time * 2 + i) * 0.05 + 0.1
    }
    sizes.needsUpdate = true
  })
  
  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  )
}

function DataSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.1
    meshRef.current.rotation.z = t * 0.05
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#4b0082" roughness={0.1} metalness={0.8} distort={0.3} speed={2} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8a2be2" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#4b0082" />

      <DataSphere />
      <NeuralNetwork count={150} connections={200} />

      <Sparkles count={500} scale={15} size={1} speed={0.3} color="#8a2be2" />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
        <Vignette darkness={0.7} offset={0.1} />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 10, 30]} />
        <Scene />
      </Canvas>
    </div>
  )
}

