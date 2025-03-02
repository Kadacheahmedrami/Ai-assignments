"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

// Define node type
interface Node {
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
}

// Define connection type
interface Connection {
  source: number
  target: number
  opacity: number
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationRef = useRef<number>(0)

  // Handle mouse movement
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  // Initialize nodes and connections
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Create nodes
    const nodeCount = 100
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(100 + Math.random() * 100)}, ${Math.floor(50 + Math.random() * 150)}, ${Math.floor(200 + Math.random() * 55)}, ${0.5 + Math.random() * 0.5})`,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    nodesRef.current = nodes

    // Create connections
    const connectionCount = 150
    const connections: Connection[] = []

    for (let i = 0; i < connectionCount; i++) {
      connections.push({
        source: Math.floor(Math.random() * nodeCount),
        target: Math.floor(Math.random() * nodeCount),
        opacity: 0.1 + Math.random() * 0.2,
      })
    }

    connectionsRef.current = connections

    // Animation function
    const animate = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodesRef.current.forEach((node, index) => {
        // Update position
        node.x += node.speedX
        node.y += node.speedY

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1
        if (node.y < 0 || node.y > canvas.height) node.speedY *= -1

        // Apply slight attraction to mouse
        const dx = mousePosition.x - node.x
        const dy = mousePosition.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          node.x += dx * 0.01
          node.y += dy * 0.01
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })

      // Draw connections
      connectionsRef.current.forEach((connection) => {
        const sourceNode = nodesRef.current[connection.source]
        const targetNode = nodesRef.current[connection.target]

        const dx = targetNode.x - sourceNode.x
        const dy = targetNode.y - sourceNode.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only draw connections if nodes are close enough
        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(sourceNode.x, sourceNode.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.strokeStyle = `rgba(138, 43, 226, ${connection.opacity * (1 - distance / 150)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [mousePosition.x, mousePosition.y]) // Added dependencies here

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" onMouseMove={handleMouseMove} />
}

