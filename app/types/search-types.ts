// Common types used across search algorithms
export interface QueueNode {
  x: number;
  z: number;
  distance: number;
  parent: QueueNode | null;
  cost?: number;       // For uniform cost search
  heuristic?: number;  // For A* search and Greedy Best-First Search
  f?: number;          // For A* search (f = g + h)
}

export interface ExpansionNode {
  x: number;
  z: number;
  distance: number;
}


export type SearchAlgorithm = "bfs" | "dfs" | "ucs" | "astar" | "greedy";
