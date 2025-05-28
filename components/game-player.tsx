"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RefreshCw, Brain, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

type Player = "human" | "ai"

export function GamePlayer() {
  const [sequence, setSequence] = useState<number[]>([1, 2, 7, 5])
  const [inputSequence, setInputSequence] = useState("1,2,7,5")
  const [currentSequence, setCurrentSequence] = useState<number[]>([1, 2, 7, 5])
  const [humanScore, setHumanScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState<Player>("human")
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<Player | "tie" | null>(null)
  const [humanFirst, setHumanFirst] = useState(true)
  const [thinking, setThinking] = useState(false)
  const [lastMove, setLastMove] = useState<{ player: Player; value: number; position: "left" | "right" } | null>(null)
  const [error, setError] = useState("")
  const [gameHistory, setGameHistory] = useState<Array<{ player: Player; value: number; position: "left" | "right" }>>(
    [],
  )

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
      resetGame(parsed, humanFirst)
      setError("")
    } catch (e) {
      setError("Invalid sequence. Please enter comma-separated positive numbers.")
    }
  }

  // Reset the game
  const resetGame = (seq = sequence, humanStarts = humanFirst) => {
    setCurrentSequence([...seq])
    setHumanScore(0)
    setAiScore(0)
    setCurrentPlayer(humanStarts ? "human" : "ai")
    setGameOver(false)
    setWinner(null)
    setLastMove(null)
    setGameHistory([])
  }

  // Minimax algorithm for AI
  const minimax = (
    arr: number[],
    depth: number,
    isMaximizingPlayer: boolean,
    alpha: number,
    beta: number,
    aiScore: number,
    humanScore: number,
  ): { value: number; position?: "left" | "right" } => {
    // Base case: if no numbers left, compare scores
    if (arr.length === 0) {
      return { value: aiScore - humanScore }
    }

    if (isMaximizingPlayer) {
      // AI's turn
      let bestVal = Number.NEGATIVE_INFINITY
      let bestMove: "left" | "right" | undefined = undefined

      // Try taking from left end
      const leftVal = minimax(arr.slice(1), depth + 1, false, alpha, beta, aiScore + arr[0], humanScore).value

      if (leftVal > bestVal) {
        bestVal = leftVal
        bestMove = "left"
      }

      alpha = Math.max(alpha, bestVal)

      // Try taking from right end
      if (alpha < beta) {
        // Alpha-beta pruning
        const rightVal = minimax(
          arr.slice(0, arr.length - 1),
          depth + 1,
          false,
          alpha,
          beta,
          aiScore + arr[arr.length - 1],
          humanScore,
        ).value

        if (rightVal > bestVal) {
          bestVal = rightVal
          bestMove = "right"
        }

        alpha = Math.max(alpha, bestVal)
      }

      return { value: bestVal, position: bestMove }
    } else {
      // Human's turn
      let bestVal = Number.POSITIVE_INFINITY
      let bestMove: "left" | "right" | undefined = undefined

      // Try taking from left end
      const leftVal = minimax(arr.slice(1), depth + 1, true, alpha, beta, aiScore, humanScore + arr[0]).value

      if (leftVal < bestVal) {
        bestVal = leftVal
        bestMove = "left"
      }

      beta = Math.min(beta, bestVal)

      // Try taking from right end
      if (alpha < beta) {
        // Alpha-beta pruning
        const rightVal = minimax(
          arr.slice(0, arr.length - 1),
          depth + 1,
          true,
          alpha,
          beta,
          aiScore,
          humanScore + arr[arr.length - 1],
        ).value

        if (rightVal < bestVal) {
          bestVal = rightVal
          bestMove = "right"
        }

        beta = Math.min(beta, bestVal)
      }

      return { value: bestVal, position: bestMove }
    }
  }

  // AI makes a move
  const aiMove = async () => {
    if (gameOver || currentPlayer !== "ai" || currentSequence.length === 0) return

    setThinking(true)

    // Add a small delay to simulate "thinking"
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = minimax(
      currentSequence,
      0,
      true,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      aiScore,
      humanScore,
    )

    if (result.position === "left") {
      const value = currentSequence[0]
      setAiScore((prev) => prev + value)
      setCurrentSequence((prev) => prev.slice(1))
      setLastMove({ player: "ai", value, position: "left" })
      setGameHistory((prev) => [...prev, { player: "ai", value, position: "left" }])
    } else {
      const value = currentSequence[currentSequence.length - 1]
      setAiScore((prev) => prev + value)
      setCurrentSequence((prev) => prev.slice(0, prev.length - 1))
      setLastMove({ player: "ai", value, position: "right" })
      setGameHistory((prev) => [...prev, { player: "ai", value, position: "right" }])
    }

    setCurrentPlayer("human")
    setThinking(false)
  }

  // Human makes a move
  const humanMove = (position: "left" | "right") => {
    if (gameOver || currentPlayer !== "human" || currentSequence.length === 0) return

    if (position === "left") {
      const value = currentSequence[0]
      setHumanScore((prev) => prev + value)
      setCurrentSequence((prev) => prev.slice(1))
      setLastMove({ player: "human", value, position: "left" })
      setGameHistory((prev) => [...prev, { player: "human", value, position: "left" }])
    } else {
      const value = currentSequence[currentSequence.length - 1]
      setHumanScore((prev) => prev + value)
      setCurrentSequence((prev) => prev.slice(0, prev.length - 1))
      setLastMove({ player: "human", value, position: "right" })
      setGameHistory((prev) => [...prev, { player: "human", value, position: "right" }])
    }

    setCurrentPlayer("ai")
  }

  // Check if game is over
  useEffect(() => {
    if (currentSequence.length === 0 && !gameOver) {
      setGameOver(true)
      if (humanScore > aiScore) {
        setWinner("human")
      } else if (aiScore > humanScore) {
        setWinner("ai")
      } else {
        setWinner("tie")
      }
    }
  }, [currentSequence, humanScore, aiScore, gameOver])

  // AI's turn
  useEffect(() => {
    if (currentPlayer === "ai" && !gameOver) {
      aiMove()
    }
  }, [currentPlayer, gameOver])

  // Auto-scroll game history to bottom when updated
  useEffect(() => {
    const historyElement = document.getElementById("game-history")
    if (historyElement) {
      historyElement.scrollTop = historyElement.scrollHeight
    }
  }, [gameHistory])

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-lg shadow-blue-900/20">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-300">Play Against AI</CardTitle>
        <CardDescription className="text-gray-400">Test your skills against the minimax algorithm</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-800/50 p-2 rounded-full">
              <Brain className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-medium text-blue-300 mb-1">How to Play</h3>
              <p className="text-gray-300 text-sm">
                Take turns removing numbers from either end of the sequence. The player with the highest total at the
                end wins. Can you beat the AI using the minimax algorithm?
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="play-sequence" className="text-gray-300">
              Enter sequence (comma separated)
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="play-sequence"
                value={inputSequence}
                onChange={(e) => setInputSequence(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button
                onClick={handleSequenceChange}
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Set
              </Button>
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex-1">
            <Label className="text-gray-300">Who goes first?</Label>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="human-first"
                  checked={humanFirst}
                  onCheckedChange={(checked) => {
                    setHumanFirst(checked)
                    resetGame(sequence, checked)
                  }}
                />
                <Label htmlFor="human-first" className="text-gray-300">
                  {humanFirst ? "You go first" : "AI goes first"}
                </Label>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resetGame()}
                className="ml-auto bg-gray-700 border-gray-600 hover:bg-gray-600"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Game
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-400" />
                <h3 className="text-xl font-semibold text-blue-400">You</h3>
              </div>
              <div className="text-3xl font-bold text-white">{humanScore}</div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-cyan-400" />
                <h3 className="text-xl font-semibold text-cyan-400">AI</h3>
              </div>
              <div className="text-3xl font-bold text-white">{aiScore}</div>
            </div>

            <div className="mb-6">
              <div className="text-gray-400 mb-2">Current Player</div>
              <div className="flex items-center gap-2">
                {currentPlayer === "human" ? (
                  <>
                    <User className="h-5 w-5 text-blue-400" />
                    <span className="text-lg font-medium text-blue-400">Your Turn</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 text-cyan-400" />
                    <span className="text-lg font-medium text-cyan-400">
                      {thinking ? "AI is thinking..." : "AI's Turn"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {gameOver && (
              <Alert
                className={cn(
                  "mb-4",
                  winner === "human"
                    ? "bg-green-900/20 border-green-800"
                    : winner === "ai"
                      ? "bg-red-900/20 border-red-800"
                      : "bg-yellow-900/20 border-yellow-800",
                )}
              >
                <AlertDescription className="text-lg font-medium">
                  {winner === "human" ? "You Win! 🎉" : winner === "ai" ? "AI Wins! 🤖" : "It's a Tie! 🤝"}
                </AlertDescription>
              </Alert>
            )}

            {lastMove && (
              <div className="text-gray-300 mb-4">
                Last move: <span className="font-medium">{lastMove.player === "human" ? "You" : "AI"}</span> took{" "}
                <span className="font-bold text-white">{lastMove.value}</span> from the{" "}
                <span className="font-medium">{lastMove.position}</span>
              </div>
            )}

            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => humanMove("left")}
                disabled={currentPlayer !== "human" || gameOver || thinking}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                size="lg"
              >
                Take Left
              </Button>
              <Button
                onClick={() => humanMove("right")}
                disabled={currentPlayer !== "human" || gameOver || thinking}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                size="lg"
              >
                Take Right
              </Button>
            </div>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 shadow-md flex flex-col h-[400px]">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Current Sequence</h3>

            <div className="flex justify-center mb-6 min-h-[60px]">
              <AnimatePresence mode="popLayout">
                {currentSequence.map((num, i) => (
                  <motion.div
                    key={`${i}-${num}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-700 text-white font-bold m-1 shadow-md"
                  >
                    {num}
                  </motion.div>
                ))}
                {currentSequence.length === 0 && <div className="text-gray-400">No numbers left</div>}
              </AnimatePresence>
            </div>

            <h3 className="text-xl font-semibold text-gray-300 mb-4">Game History</h3>
            <div id="game-history" className="flex-1 overflow-y-auto pr-2 space-y-2">
              {gameHistory.length === 0 ? (
                <div className="text-gray-400 text-center">No moves yet</div>
              ) : (
                gameHistory.map((move, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-3 rounded-md flex justify-between items-center",
                      move.player === "human"
                        ? "bg-blue-900/20 border border-blue-800"
                        : "bg-blue-900/20 border border-cyan-800",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {move.player === "human" ? (
                        <User className="h-4 w-4 text-blue-400" />
                      ) : (
                        <Brain className="h-4 w-4 text-cyan-400" />
                      )}
                      <span className="text-gray-300">
                        {move.player === "human" ? "You" : "AI"} took {move.value}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      from {move.position}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
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
