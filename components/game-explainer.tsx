"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp } from "lucide-react"

export function GameExplainer({ expanded = false }: { expanded?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-blue-300">How the Number Game Works</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <CardDescription className="text-gray-400">Learn the rules and strategy behind the number game</CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <Tabs defaultValue="rules">
            <TabsList className="grid w-full grid-cols-3 bg-gray-700/50">
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="minimax">Minimax Algorithm</TabsTrigger>
            </TabsList>
            <TabsContent value="rules" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-cyan-400">Rules of the Number Game</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>A sequence of n random natural numbers is given (e.g., [1, 2, 7, 5])</li>
                  <li>Two players take turns alternately</li>
                  <li>On each turn, a player may remove a number from either the left or right end of the sequence</li>
                  <li>Each player accumulates the sum of the numbers they remove</li>
                  <li>The game ends when all numbers have been removed</li>
                  <li>The player with the highest total sum at the end wins</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="strategy" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-cyan-400">Optimal Strategy</h3>
                <p className="text-gray-300">
                  The optimal strategy for this game is not as simple as "always take the largest number." You need to
                  consider the future consequences of your moves.
                </p>
                <p className="text-gray-300">
                  For example, taking a large number now might expose an even larger number for your opponent.
                </p>
                <p className="text-gray-300">
                  A general pattern: If the sum of odd-indexed elements is greater than the sum of even-indexed
                  elements, the first player has an advantage. If the sum of even-indexed elements is greater, the
                  second player has an advantage.
                </p>
                <p className="text-gray-300">
                  However, this pattern doesn't always hold because you can only take from the ends of the sequence.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="minimax" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-cyan-400">The Minimax Algorithm</h3>
                <p className="text-gray-300">
                  Minimax is a decision-making algorithm used for finding the optimal move in a two-player game.
                </p>
                <p className="text-gray-300">
                  The algorithm works by simulating all possible game states and choosing the move that maximizes the
                  minimum gain.
                </p>
                <p className="text-gray-300">For the number game, the algorithm:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Recursively explores all possible moves</li>
                  <li>Assumes the opponent will play optimally</li>
                  <li>Assigns a value to each game state (positive if Player 1 wins, negative if Player 2 wins)</li>
                  <li>Chooses the move that leads to the best outcome for the current player</li>
                </ul>
                <p className="text-gray-300">
                  Alpha-beta pruning is an optimization that reduces the number of nodes evaluated by the minimax
                  algorithm.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 pt-4 border-t border-blue-800/50 text-center">
            <p className="text-xs text-blue-300">
              Developed by <span className="font-semibold">Kadache Ahmed Rami</span> | Group 4 | AI Assignment | ESTIN
              School
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
