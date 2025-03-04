import MazeRenderer from "@/components/td-comps/MazeRenderer"
import type { MazeGrid } from "@/app/types/maze"

// Example maze layout:
// 0: Empty space
// 1: Wall
// 2: Start point
// 3: End point
const exampleMaze: MazeGrid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 3 , 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0 , 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0 , 1],
  [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0 , 1],
  [1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0 , 1],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1 , 1],
  [1, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0 , 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0 , 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 1],

]

export default function Home() {
  return (
    <MazeRenderer grid={exampleMaze} cellSize={1.2} />
  
  )
}

