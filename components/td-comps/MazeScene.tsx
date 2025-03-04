"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"
import ExpansionCube from "./ExpansionCube"
import CubeConnector from "./CubeConnector"
import type { MazeProps } from "@/app/types/maze"
import type { SearchAlgorithm } from "@/app/types/search-types"
import {
  calculateBfsExpansionPath,
  calculateDfsExpansionPath,
  calculateUniformCostExpansionPath,
  calculateAStarExpansionPath,
  calculateGreedySearchExpansionPath, // Added Greedy search import
} from "@/app/utils/td01Utils/search"

interface MazeNode {
  x: number
  z: number
  distance: number
}

interface MazeSceneProps extends MazeProps {
  isAnimating: boolean
  startAnimation: () => void
  cellSize?: number
  searchAlgorithm: SearchAlgorithm | null
  onAnimationComplete?: () => void
}

export default function MazeScene({
  grid,
  cellSize = 1,
  isAnimating,
  startAnimation,
  searchAlgorithm,
  onAnimationComplete,
}: MazeSceneProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const startRef = useRef<THREE.Mesh>(null)
  const endRef = useRef<THREE.Mesh>(null)
  const startTextRef = useRef<THREE.Object3D>(null)
  const endTextRef = useRef<THREE.Object3D>(null)
  const [expansionPath, setExpansionPath] = useState<MazeNode[]>([])
  const [algorithmName, setAlgorithmName] = useState<string>("")
  const { raycaster, camera, mouse } = useThree()

  // Calculate maze dimensions
  const width = grid[0].length
  const height = grid.length

  // Count walls for the instanced mesh
  const wallCount = grid.reduce<number>(
    (count, row) => count + row.reduce<number>((rowCount, cell) => rowCount + (cell === 1 ? 1 : 0), 0),
    0,
  )

  // Memoize start and end positions to avoid re-creation on every render
  const { startPos, endPos } = useMemo(() => {
    let start = { x: 0, z: 0 }
    let end = { x: 0, z: 0 }
    grid.forEach((row, z) => {
      row.forEach((cell, x) => {
        if (cell === 2) start = { x, z }
        if (cell === 3) end = { x, z }
      })
    })
    return { startPos: start, endPos: end }
  }, [grid])

  // Reset expansion path when not animating
  useEffect(() => {
    if (!isAnimating) {
      setExpansionPath([])
      setAlgorithmName("")
    }
  }, [isAnimating])

  // Use the selected search algorithm to calculate the expansion path
  useEffect(() => {
    if (!isAnimating || !searchAlgorithm) return

    let expansionNodes: MazeNode[] = []

    switch (searchAlgorithm) {
      case "bfs":
        expansionNodes = calculateBfsExpansionPath(grid, startPos)
        setAlgorithmName("Breadth-First Search")
        break
      case "dfs":
        expansionNodes = calculateDfsExpansionPath(grid, startPos)
        setAlgorithmName("Depth-First Search")
        break
      case "ucs":
        expansionNodes = calculateUniformCostExpansionPath(grid, startPos)
        setAlgorithmName("Uniform Cost Search")
        break
      case "astar":
        expansionNodes = calculateAStarExpansionPath(grid, startPos)
        setAlgorithmName("A* Search")
        break
      case "greedy":
        expansionNodes = calculateGreedySearchExpansionPath(grid, startPos)
        setAlgorithmName("Greedy Best-First Search")
        break
      default:
        expansionNodes = calculateBfsExpansionPath(grid, startPos)
        setAlgorithmName("Breadth-First Search")
    }

    setExpansionPath(expansionNodes)

    // Notify when animation is complete (after the last node is expanded)
    const maxDelay = Math.max(...expansionNodes.map((node) => node.distance))
    const timer = setTimeout(
      () => {
        if (onAnimationComplete) onAnimationComplete()
      },
      (maxDelay + 5) * 100,
    ) // Add a buffer to ensure all animations complete

    return () => clearTimeout(timer)
  }, [isAnimating, grid, startPos, searchAlgorithm, onAnimationComplete])

  // Create a map of neighboring cells for each expansion node
  const nodeNeighbors = useMemo(() => {
    const neighbors = new Map<string, { x: number; z: number }[]>()

    if (expansionPath.length > 0) {
      expansionPath.forEach((node) => {
        const key = `${node.x},${node.z}`
        const nodeNeighbors: { x: number; z: number }[] = []

        // Check all 4 directions
        const directions = [
          { dx: 1, dz: 0 },
          { dx: -1, dz: 0 },
          { dx: 0, dz: 1 },
          { dx: 0, dz: -1 },
        ]

        directions.forEach((dir) => {
          const nx = node.x + dir.dx
          const nz = node.z + dir.dz

          // Check if this neighbor is also in the expansion path
          const hasNeighbor = expansionPath.some((n) => n.x === nx && n.z === nz)

          if (hasNeighbor) {
            nodeNeighbors.push({ x: nx, z: nz })
          }
        })

        neighbors.set(key, nodeNeighbors)
      })
    }

    return neighbors
  }, [expansionPath])

  const handleStartClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    if (!isAnimating) {
      startAnimation()
    }
  }

  useFrame((state) => {
    if (!meshRef.current) return

    let index = 0
    const matrix = new THREE.Matrix4()
    const color = new THREE.Color()

    // Handle start cube hover effect
    if (startRef.current) {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(startRef.current)
      if (intersects.length > 0 && !isAnimating) {
        startRef.current.scale.set(1.1, 1.1, 1.1)
      } else if (!isAnimating) {
        startRef.current.scale.set(1, 1, 1)
      }
    }

    // Place walls using the instanced mesh
    grid.forEach((row, z) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          const worldX = (x - width / 2) * cellSize
          const worldZ = (z - height / 2) * cellSize

          matrix.setPosition(worldX, 0, worldZ)
          meshRef.current!.setMatrixAt(index, matrix)

          const distance = Math.sqrt(worldX * worldX + worldZ * worldZ)
          const hue = 0.6
          const lightness = 0.4 + distance / (width * cellSize)
          color.setHSL(hue, 0.7, lightness)
          meshRef.current!.setColorAt(index, color)

          index++
        }
      })
    })

    // Update start and end cube positions
    if (startRef.current) {
      const startWorldX = (startPos.x - width / 2) * cellSize
      const startWorldZ = (startPos.z - height / 2) * cellSize
      startRef.current.position.set(startWorldX, 0.5, startWorldZ)
      startRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1
    }

    if (endRef.current) {
      const endWorldX = (endPos.x - width / 2) * cellSize
      const endWorldZ = (endPos.z - height / 2) * cellSize
      endRef.current.position.set(endWorldX, 0.5, endWorldZ)
      endRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 2.5 + 1) * 0.1
    }

    // Update label positions
    if (startTextRef.current) {
      const startWorldX = (startPos.x - width / 2) * cellSize
      const startWorldZ = (startPos.z - height / 2) * cellSize
      startTextRef.current.position.set(startWorldX, 2, startWorldZ)
    }

    if (endTextRef.current) {
      const endWorldX = (endPos.x - width / 2) * cellSize
      const endWorldZ = (endPos.z - height / 2) * cellSize
      endTextRef.current.position.set(endWorldX, 2, endWorldZ)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  })

  return (
    <group>
      {/* Walls */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, wallCount]} castShadow receiveShadow>
        <boxGeometry args={[cellSize, 1.5, cellSize]} />
        <meshStandardMaterial roughness={0.4} metalness={0.6} />
      </instancedMesh>

      {/* Start Cube */}
      <mesh ref={startRef} castShadow onClick={handleStartClick}>
        <boxGeometry args={[cellSize, cellSize, cellSize]} />
        <meshStandardMaterial
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* End Cube */}
      <mesh ref={endRef} castShadow>
        <boxGeometry args={[cellSize, cellSize, cellSize]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.5}
        />
        <pointLight color="#ef4444" intensity={1} distance={3} />
      </mesh>

      {/* Algorithm Name */}
      {isAnimating && algorithmName && (
        <Text
          position={[0, 5, -10]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {algorithmName}
        </Text>
      )}

      {/* Expansion Cubes */}
      {isAnimating &&
        expansionPath.map((node) => {
          // Skip rendering for start and goal nodes if needed
          if ((node.x === startPos.x && node.z === startPos.z) || (node.x === endPos.x && node.z === endPos.z)) {
            return null
          }

          const worldX = (node.x - width / 2) * cellSize
          const worldZ = (node.z - height / 2) * cellSize

          const maxDistance = Math.max(...expansionPath.map((n) => n.distance))
          const colorProgress = node.distance / maxDistance
          const cubeColor = new THREE.Color().setHSL(0.3 - 0.3 * colorProgress, 0.8, 0.5).getHexString()

          return (
            <ExpansionCube
              key={`${node.x}-${node.z}`}
              position={[worldX, 0.5, worldZ]}
              scale={{ x: cellSize, y: cellSize, z: cellSize }}
              color={`#${cubeColor}`}
              delay={node.distance}
            />
          )
        })}

      {/* Cube Connectors */}
      {isAnimating && (
        <>
          {expansionPath.map((node) => {
            const nodeX = (node.x - width / 2) * cellSize
            const nodeY = 0.5
            const nodeZ = (node.z - height / 2) * cellSize
            const key = `${node.x},${node.z}`
            const neighbors = nodeNeighbors.get(key) || []

            // For each neighbor, render a connector only once
            return neighbors.map((neighbor) => {
              if (node.x < neighbor.x || (node.x === neighbor.x && node.z < neighbor.z)) {
                const neighborX = (neighbor.x - width / 2) * cellSize
                const neighborY = 0.5
                const neighborZ = (neighbor.z - height / 2) * cellSize
                return (
                  <CubeConnector
                    key={`${node.x},${node.z}-${neighbor.x},${neighbor.z}`}
                    startPosition={[nodeX, nodeY, nodeZ]}
                    endPosition={[neighborX, neighborY, neighborZ]}
                    color="#ffffff"
                    thickness={0.05}
                    delay={node.distance}
                  />
                )
              }
              return null
            })
          })}
        </>
      )}

      {/* Labels */}
      <Text ref={startTextRef} position={[0, 2, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        START
      </Text>
      <Text ref={endTextRef} position={[0, 2, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        GOAL
      </Text>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]} receiveShadow>
        <planeGeometry args={[width * cellSize * 1.5, height * cellSize * 1.5]} />
        <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Grid Helper */}
      <gridHelper
        args={[Math.max(width, height) * cellSize * 1.5, Math.max(width, height) * 2, "#444444", "#222222"]}
        position={[0, -0.01, 0]}
      />
    </group>
  )
}
