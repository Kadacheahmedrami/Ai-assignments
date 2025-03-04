// @/app/types/maze.ts
export type MazeGrid = number[][];

export interface MazeProps {
  grid: MazeGrid;
  cellSize?: number;
}