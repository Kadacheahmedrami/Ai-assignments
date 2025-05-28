"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Play, Pause, SkipForward, SkipBack, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

type GameNode = {
  sequence: number[]
  player: 1 | 2
  p1Score: number
  p2Score: number
  move?: "left" | "right"
  takenValue?: number
  minimax?: number
  children: GameNode[]
  isOptimal?: boolean
  parent?: GameNode
}

export function GameVisualizer() {
  const [sequence, setSequence] = useState<number[]>([1, 2, 7, 5])
  const [inputSequence, setInputSequence] = useState("1,2,7,5")
  const [gameTree, setGameTree] = useState<GameNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [flattenedTree, setFlattenedTree] = useState<GameNode[]>([])
  const [highlightedPath, setHighlightedPath] = useState<GameNode[]>([])
  const [error, setError] = useState("")

  // Parse input sequence
  const handleSequenceChange = () => {
    try {
      const parsed = inputSequence.split(",").map((s) => {
        const num = Number.parseInt(s.trim())
        if (isNaN(num) || num < 0) throw new Error("Invalid sequence")
        return num
      })

      if (parsed.length < 2) {
        setError("Sequence must have at least 2 numbers")
        return
      }

      setSequence(parsed)
      setError("")
      generateGameTree(parsed)
      setCurrentStep(0)
      setIsPlaying(false)
    } catch (e) {
      setError("Invalid sequence. Please enter comma-separated positive numbers.")
    }
  }

  // Generate the game tree with minimax values
  const generateGameTree = (seq: number[]) => {
    const buildTree = (seq: number[], player: 1 | 2, p1Score: number, p2Score: number, parent?: GameNode): GameNode => {
      const node: GameNode = {
        sequence: [...seq],
        player,
        p1Score,
        p2Score,
        children: [],
        parent,
      }

      // Base case: no more numbers
      if (seq.length === 0) {
        node.minimax = p1Score - p2Score
        return node
      }

      // Take from left
      if (seq.length > 0) {
        const leftChild = buildTree(
          seq.slice(1),
          player === 1 ? 2 : 1,
          player === 1 ? p1Score + seq[0] : p1Score,
          player === 2 ? p2Score + seq[0] : p2Score,
          node,
        )
        leftChild.move = "left"
        leftChild.takenValue = seq[0]
        node.children.push(leftChild)
      }

      // Take from right
      if (seq.length > 0) {
        const rightChild = buildTree(
          seq.slice(0, seq.length - 1),
          player === 1 ? 2 : 1,
          player === 1 ? p1Score + seq[seq.length - 1] : p1Score,
          player === 2 ? p2Score + seq[seq.length - 1] : p2Score,
          node,
        )
        rightChild.move = "right"
        rightChild.takenValue = seq[seq.length - 1]
        node.children.push(rightChild)
      }

      // Calculate minimax value
      if (player === 1) {
        node.minimax = Math.max(...node.children.map((child) => child.minimax || Number.NEGATIVE_INFINITY))
        // Mark optimal path
        node.children.forEach((child) => {
          child.isOptimal = child.minimax === node.minimax
        })
      } else {
        node.minimax = Math.min(...node.children.map((child) => child.minimax || Number.POSITIVE_INFINITY))
        // Mark optimal path
        node.children.forEach((child) => {
          child.isOptimal = child.minimax === node.minimax
        })
      }

      return node
    }

    const root = buildTree(seq, 1, 0, 0)
    setGameTree(root)

    // Flatten the tree for animation
    const flatten = (node: GameNode): GameNode[] => {
      return [node, ...node.children.flatMap(flatten)]
    }

    const flattened = flatten(root)
    setFlattenedTree(flattened)

    // Find optimal path
    const findOptimalPath = (node: GameNode): GameNode[] => {
      if (node.children.length === 0) return [node]

      const optimalChild = node.children.find((child) => child.isOptimal)
      if (!optimalChild) return [node]

      return [node, ...findOptimalPath(optimalChild)]
    }

    setHighlightedPath(findOptimalPath(root))
  }

  // Animation effect
  useEffect(() => {
    if (!gameTree || !isPlaying) return

    const timer = setTimeout(() => {
      if (currentStep < highlightedPath.length - 1) {
        setCurrentStep((prev) => prev + 1)
      } else {
        setIsPlaying(false)
      }
    }, 1000 / animationSpeed)

    return () => clearTimeout(timer)
  }, [gameTree, isPlaying, currentStep, highlightedPath, animationSpeed])

  // Initialize game tree on component mount
  useEffect(() => {
    generateGameTree(sequence)
  }, [])

  const currentNode = highlightedPath[currentStep]

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-blue-900/20">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-300">Game Tree Visualization</CardTitle>
        <CardDescription className="text-gray-400">
          See how the minimax algorithm determines the optimal strategy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="sequence" className="text-gray-300">
              Enter sequence (comma separated)
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="sequence"
                value={inputSequence}
                onChange={(e) => setInputSequence(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button
                onClick={handleSequenceChange}
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generate
              </Button>
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex-1">
            <Label className="text-gray-300">Animation Speed</Label>
            <div className="flex items-center gap-4 mt-1">
              <Slider
                value={[animationSpeed]}
                min={0.5}
                max={3}
                step={0.5}
                onValueChange={(value) => setAnimationSpeed(value[0])}
                className="flex-1"
              />
              <span className="text-gray-300 w-10">{animationSpeed}x</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setCurrentStep(0)
              setIsPlaying(false)
            }}
            disabled={currentStep === 0}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (currentStep > 0) setCurrentStep((prev) => prev - 1)
            }}
            disabled={currentStep === 0}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (currentStep < highlightedPath.length - 1) setCurrentStep((prev) => prev + 1)
            }}
            disabled={currentStep === highlightedPath.length - 1}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setCurrentStep(highlightedPath.length - 1)
              setIsPlaying(false)
            }}
            disabled={currentStep === highlightedPath.length - 1}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setCurrentStep(0)
              setIsPlaying(false)
              generateGameTree(sequence)
            }}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {currentNode && (
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                Step {currentStep} of {highlightedPath.length - 1}
              </h3>
              <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Player 1</div>
                  <div className="text-2xl font-bold text-blue-300">{currentNode.p1Score}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Player 2</div>
                  <div className="text-2xl font-bold text-cyan-300">{currentNode.p2Score}</div>
                </div>
                {currentNode.minimax !== undefined && (
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Minimax</div>
                    <div
                      className={cn(
                        "text-2xl font-bold",
                        currentNode.minimax > 0
                          ? "text-green-400"
                          : currentNode.minimax < 0
                            ? "text-red-400"
                            : "text-yellow-400",
                      )}
                    >
                      {currentNode.minimax}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="flex gap-2 items-center">
                {currentNode.sequence.length > 0 ? (
                  <>
                    <div className="text-gray-400">Current Sequence:</div>
                    <div className="flex gap-1">
                      {currentNode.sequence.map((num, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-700 text-white font-bold"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400">Game Over</div>
                )}
              </div>
            </div>

            {currentStep > 0 && currentNode.move && (
              <div className="text-center mb-4">
                <div className="text-gray-400">
                  {currentNode.player === 1 ? "Player 2" : "Player 1"} took {currentNode.takenValue} from the{" "}
                  {currentNode.move}
                </div>
              </div>
            )}

            {currentNode.children.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentNode.children.map((child, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-lg border",
                      child.isOptimal ? "bg-blue-900/30 border-blue-700" : "bg-gray-800/30 border-gray-700",
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-300">
                        Take {child.takenValue} from {child.move}
                      </div>
                      <div
                        className={cn(
                          "px-2 py-1 rounded text-sm font-medium",
                          child.isOptimal ? "bg-blue-700 text-white" : "bg-gray-700 text-gray-300",
                        )}
                      >
                        {child.isOptimal ? "Optimal" : "Suboptimal"}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm text-gray-400">Minimax</div>
                        <div
                          className={cn(
                            "font-bold",
                            child.minimax && child.minimax > 0
                              ? "text-green-400"
                              : child.minimax && child.minimax < 0
                                ? "text-red-400"
                                : "text-yellow-400",
                          )}
                        >
                          {child.minimax}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">
                          {currentNode.player === 1 ? "Player 1" : "Player 2"} Score
                        </div>
                        <div className="font-bold text-white">
                          {currentNode.player === 1 ? child.p1Score : child.p2Score}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentNode.sequence.length === 0 && (
              <div className="text-center mt-6">
                <div className="text-2xl font-bold mb-2">
                  {currentNode.p1Score > currentNode.p2Score
                    ? "Player 1 Wins!"
                    : currentNode.p1Score < currentNode.p2Score
                      ? "Player 2 Wins!"
                      : "It's a Tie!"}
                </div>
                <div className="text-gray-400">
                  Final Score: Player 1 ({currentNode.p1Score}) - Player 2 ({currentNode.p2Score})
                </div>
              </div>
            )}
          </div>
        )}
        <div className="mt-6 pt-4 border-t border-blue-800/50 text-center">
          <p className="text-xs text-blue-300">
            Developed by <span className="font-semibold">Kadache Ahmed Rami</span> | Group 4 | AI Assignment | ESTIN
            School
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
