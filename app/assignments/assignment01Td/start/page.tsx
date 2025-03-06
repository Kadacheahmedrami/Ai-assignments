"use client"
import { useState } from "react";
import MazeRenderer from "@/components/td-comps/MazeRenderer";
import type { MazeGrid } from "@/app/types/maze";

// Example maze layout:
// 0: Empty space, 1: Wall, 2: Start point, 3: End point
const exampleMaze: MazeGrid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 3, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export default function Home() {
  // Track the maze grid, current mode, and a key to force remounting MazeRenderer.
  const [maze, setMaze] = useState<MazeGrid>(exampleMaze);
  const [mode, setMode] = useState<"default" | "random">("default");
  const [mazeKey, setMazeKey] = useState<number>(0);

  // Generates a random maze with the same dimensions as the exampleMaze.
  // - The borders remain walls (1)
  // - Inner cells are randomly empty (0) or walls (1)
  // - The start (2) and end (3) points are fixed.
  const generateRandomMaze = (): MazeGrid => {
    const rows = exampleMaze.length;
    const cols = exampleMaze[0].length;
    const grid: MazeGrid = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
          grid[i][j] = 1;
        } else {
          grid[i][j] = Math.random() < 0.3 ? 1 : 0;
        }
      }
    }
    grid[1][1] = 2; // Start point
    grid[rows - 2][cols - 2] = 3; // End point
    return grid;
  };

  // Switch to the default maze.
  const handleDefaultMaze = () => {
    setMode("default");
    setMaze(exampleMaze);
    setMazeKey(prev => prev + 1); // Remount MazeRenderer to reset its state
  };

  // Switch to a randomly generated maze.
  const handleRandomMaze = () => {
    setMode("random");
    setMaze(generateRandomMaze());
    setMazeKey(prev => prev + 1);
  };


  return (
    <div className="w-full lg:w-[86.1%] h-[92.1%] overflow-hidden absolute bg-black">
      {/* Overlaid controls (positioned as desired) */}
      <div className="absolute top-4 left-4 z-10 flex space-x-4">
        <button
          onClick={handleDefaultMaze}
          className={`px-4 py-2 rounded ${mode === "default" ? "bg-blue-500" : "bg-gray-500"}`}
        >
          Default Maze
        </button>
        <button
          onClick={handleRandomMaze}
          className={`px-4 py-2 rounded ${mode === "random" ? "bg-blue-500" : "bg-gray-500"}`}
        >
          Random Maze
        </button>

      </div>
      
   
      <MazeRenderer key={mazeKey} grid={maze} cellSize={1.2} />
    </div>
  );
}
