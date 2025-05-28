"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import ConnectFour from "@/lib/connect-four"
import GameBoard from "@/components/game-board"
import GamePiece from "@/components/game-piece"
import ColumnHighlight from "@/components/column-highlight"

export default function ConnectFourGame() {
  const [game] = useState(() => new ConnectFour())
  const [gameState, setGameState] = useState(game.getGameStatus())
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)
  const [cameraPosition, setCameraPosition] = useState([0, 5, 10])

  // Handle player move
  const handleColumnClick = async (col: number) => {
    if (gameState.gameOver || gameState.currentPlayer !== game.PLAYER || !gameState.validMoves.includes(col)) {
      return
    }

    // Find the row where the piece will land
    let row
    for (row = game.ROWS - 1; row >= 0; row--) {
      if (game.board[row][col] === game.EMPTY) {
        break
      }
    }

    // Make the move immediately without animation
    game.makeMove(col, game.PLAYER)

    // Update game state
    setGameState(game.getGameStatus())

    // If game is not over, let AI make a move
    if (!game.gameOver) {
      game.switchTurn()
      setGameState(game.getGameStatus())

      // Add a small delay before AI move
      await new Promise((resolve) => setTimeout(resolve, 300))

      const aiCol = game.makeAIMove()
      if (aiCol !== null) {
        game.switchTurn()
        setGameState(game.getGameStatus())
      }
    }
  }

  // Reset the game
  const resetGame = () => {
    game.resetGame()
    setGameState(game.getGameStatus())
    setHoveredColumn(null)
  }

  // Change camera angle
  const changeCameraAngle = () => {
    // Cycle through different camera positions
    if (cameraPosition[0] === 0 && cameraPosition[2] === 10) {
      setCameraPosition([10, 5, 0]) // Side view
    } else if (cameraPosition[0] === 10 && cameraPosition[2] === 0) {
      setCameraPosition([0, 10, 0.1]) // Top view
    } else {
      setCameraPosition([0, 5, 10]) // Front view
    }
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
      <Canvas camera={{ position: cameraPosition, fov: 50 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
        <color attach="background" args={["#1e1b4b"]} />

        {/* Simplified lighting setup */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#a78bfa" />

        {/* Environment for reflections - using a lighter preset */}
        <Environment preset="city" />

        {/* Pass the board state to GameBoard */}
        <GameBoard board={gameState.board} emptyValue={game.EMPTY} />

        {/* Render all placed pieces */}
        {gameState.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (cell !== game.EMPTY) {
              return (
                <GamePiece
                  key={`piece-${rowIndex}-${colIndex}`}
                  position={[colIndex - 3, 5 - rowIndex, 0]}
                  player={cell}
                />
              )
            }
            return null
          }),
        )}

        {/* Column highlight for hover effect */}
        {hoveredColumn !== null && !gameState.gameOver && (
          <ColumnHighlight column={hoveredColumn} valid={gameState.validMoves.includes(hoveredColumn)} />
        )}

        {/* Column hitboxes for interaction */}
        {Array.from({ length: 7 }).map((_, colIndex) => (
          <mesh
            key={`hitbox-${colIndex}`}
            position={[colIndex - 3, 3, 0.6]}
            scale={[0.9, 6, 0.1]}
            onPointerOver={() => setHoveredColumn(colIndex)}
            onPointerOut={() => setHoveredColumn(null)}
            onClick={() => handleColumnClick(colIndex)}
            visible={false}
          >
            <boxGeometry />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        ))}

        {/* Game status text */}
        {gameState.gameOver && (
          <Text
            position={[0, 8, 0]}
            fontSize={1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            {gameState.winner === game.PLAYER ? "You Win!" : gameState.winner === game.AI ? "AI Wins!" : "Draw!"}
          </Text>
        )}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          target={[0, 3, 0]}
        />
      </Canvas>

      {/* UI Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
        <Button
          onClick={resetGame}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          Reset Game
        </Button>
        <Button
          onClick={changeCameraAngle}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          Change View
        </Button>
      </div>

      {/* Turn indicator */}
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg">
          {gameState.gameOver ? (
            <span className="font-bold">Game Over</span>
          ) : (
            <span className="font-bold">
              {gameState.currentPlayer === game.PLAYER ? "Your Turn (Red)" : "AI's Turn (Yellow)"}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
