import type { NextPage } from "next"

import {
  Code,
  GitBranch,
  Map,
  Navigation,
  Search,
  Cpu,
  Database,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

const CodeDocumentation: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center md:text-left md:max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Maze Search Algorithms
              </span>
              <span className="block text-white mt-1">Interactive Maze Exploration</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Detailed documentation of our multi-algorithm maze solver. Explore how BFS, DFS, Uniform Cost Search,
              A* Search, and Greedy Best-First Search are implemented to navigate grid-based mazes and visualize their exploration process in real time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#algorithm"
                className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center"
              >
                View Maze Algorithm
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#data-structures"
                className="px-8 py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors shadow-lg flex items-center justify-center"
              >
                Explore Code Structure
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Project Overview */}
        <section id="overview" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Project Overview</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg leading-relaxed">
              This project demonstrates a versatile implementation of maze search algorithms. The maze is modeled as a 2D grid,
              where each cell represents an open path, wall, start, or goal. Multiple search strategies—Breadth-First Search (BFS),
              Depth-First Search (DFS), Uniform Cost Search (UCS), A* Search, and Greedy Best-First Search—are implemented to explore the maze
              and find the optimal path. The system is built in TypeScript with a focus on modularity and clear interface design.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Maze Representation</h3>
                <p className="text-gray-300">
                  The maze is defined as a grid where 0 indicates open paths, 1 represents walls, 2 marks the start, and 3 is the goal.
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Multiple Search Strategies</h3>
                <p className="text-gray-300">
                  Explore how different search methods—BFS, DFS, UCS, A*, and Greedy—navigate the maze to find the optimal route.
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">TypeScript Implementation</h3>
                <p className="text-gray-300">
                  Built with modular, strongly typed code to ensure clarity, extensibility, and ease of integration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Structures */}
        <section id="data-structures" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Data Structures</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg mb-8">
              The maze search implementation uses key data structures to represent the grid and support the various search algorithms:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-400" />
                  Maze Grid
                </h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm">
                  {`// Example maze grid representation
const maze = [
  [2, 0, 1, 0, 3],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  // 0 = open path, 1 = wall, 2 = start, 3 = goal
];`}
                </pre>
                <div className="mt-4 text-gray-300">
                  <p>Defines the maze structure used by the search algorithms.</p>
                </div>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <GitBranch className="h-5 w-5 mr-2 text-blue-400" />
                  Search Nodes
                </h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm">
                  {`export interface Node {
  x: number;
  z: number;
  distance: number;
  parent: Node | null;
  cost?: number;
  heuristic?: number;
  f?: number;
}`}
                </pre>
                <div className="mt-4 text-gray-300">
                  <p>Nodes store positional and cost information used across all search methods.</p>
                </div>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Navigation className="h-5 w-5 mr-2 text-blue-400" />
                  Search Interfaces
                </h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm">
                  {`export interface QueueNode extends Node {
  parent: QueueNode | null;
  cost?: number;
  heuristic?: number;
  f?: number;
}

export interface ExpansionNode {
  x: number;
  z: number;
  distance: number;
}`}
                </pre>
                <div className="mt-4 text-gray-300">
                  <p>Defines common interfaces shared by the maze search algorithm implementations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Class */}
        <section id="agent" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Agent Class</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg mb-8">
              The Agent class is responsible for traversing the maze using the chosen search algorithm. It maintains the current position,
              tracks the accumulated cost, and selects the next node to explore based on the algorithm’s strategy.
            </p>
            <pre className="bg-slate-900 p-6 rounded-lg overflow-x-auto text-gray-300 text-sm mb-8">
              {`export class Agent {
  currentCost: number;
  node: Node;
  grid: number[][];

  neighbors = () => {
    // Retrieves valid adjacent nodes in the maze grid
    return getNeighbors(this.grid, this.node);
  }

  move = ({ frontier }: { frontier: Node[] }): Node[] => {
    let selectedNode = {} as Node;
    let minCost = Infinity;
    frontier.forEach((node) => {
      if (node.cost !== undefined && node.cost < minCost) {
        minCost = node.cost;
        selectedNode = node;
      }
    });

    if (!selectedNode) return frontier;

    // Update agent state
    this.node = selectedNode;
    this.currentCost = minCost;

    return frontier.filter((node) => node !== this.node);
  }

  constructor({ grid, node, currentCost }: { grid: number[][]; node: Node; currentCost: number }) {
    this.grid = grid;
    this.node = node;
    this.currentCost = currentCost;
  }
}`}
            </pre>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-blue-400" />
                  Key Responsibilities
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">State Tracking:</span> Maintains current position and cost.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Neighbor Discovery:</span> Identifies valid adjacent nodes.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Movement Logic:</span> Selects the next node based on search strategy.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Frontier Management:</span> Updates the set of nodes to be explored.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-400" />
                  Implementation Details
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>The <code className="bg-slate-800 px-1 rounded">neighbors()</code> method retrieves adjacent nodes.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>The <code className="bg-slate-800 px-1 rounded">move()</code> method selects the node with the lowest cost.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Utilizes a priority-based approach for efficient exploration.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Tracks visited nodes to prevent cycles and infinite loops.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Utility Functions */}
        <section id="utilities" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Utility Functions</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg mb-8">
              Utility functions support maze traversal by providing node lookup, cost calculations, heuristic evaluations, and neighbor discovery.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Node Lookup</h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm mb-4">
                  {`// Get a node by name
export const GetNodeByName = ({ name, nodes }: { name: string; nodes: Node[] }) => {
  return nodes.find((node) => node.name === name);
};

// Get a node by ID
export const GetNodeById = ({ id, nodes }: { id: number; nodes: Node[] }) => {
  return nodes.find((node) => node.id === id);
`}
                </pre>
                <p className="text-gray-300 text-sm">
                  Provides quick access to nodes within the maze based on their name or ID.
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Heuristic Functions</h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm mb-4">
                  {`// Calculate Manhattan distance as a heuristic for grid-based maze
export const h = ({ x1, z1, x2, z2 }: { x1: number; z1: number; x2: number; z2: number }) => {
  return Math.abs(x1 - x2) + Math.abs(z1 - z2);
`}
                </pre>
                <p className="text-gray-300 text-sm">
                  An admissible heuristic to guide the search in a grid maze.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Maze Search Algorithm Implementation */}
        <section id="algorithm" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Maze Search Algorithm Implementation</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg mb-8">
              This core implementation integrates multiple search strategies. Based on the selected algorithm—BFS, DFS, UCS, A*, or Greedy Best-First Search—the maze is explored until the goal (cell value 3) is reached. The expansion path is recorded for visualization and later path reconstruction.
            </p>
            <pre className="bg-slate-900 p-6 rounded-lg overflow-x-auto text-gray-300 text-sm mb-8">
              {`export interface MazeSearchProps {
  grid: number[][];
  startPos: { x: number; z: number };
  algorithm: "bfs" | "dfs" | "ucs" | "astar" | "greedy";
}

export const mazeSearch = ({ grid, startPos, algorithm }: MazeSearchProps) => {
  const visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));
  let frontier = [{ x: startPos.x, z: startPos.z, distance: 0, parent: null }];
  const expansionPath = [];
  let counter = 0;
  
  while (frontier.length > 0 && counter < 10000) {
    let current;
    if (algorithm === "bfs") {
      current = frontier.shift();
    } else if (algorithm === "dfs") {
      current = frontier.pop();
    } else {
      frontier.sort((a, b) => (a.f ?? a.distance) - (b.f ?? b.distance));
      current = frontier.shift();
    }
    
    if (!current) break;
    const { x, z, distance } = current;
    
    if (x < 0 || x >= grid[0].length || z < 0 || z >= grid.length || grid[z][x] === 1 || visited[z][x]) {
      continue;
    }
    
    visited[z][x] = true;
    expansionPath.push({ x, z, distance });
    
    if (grid[z][x] === 3) break;
    
    const newDistance = distance + 1;
    if (z + 1 < grid.length && grid[z + 1][x] !== 1) frontier.push({ x, z: z + 1, distance: newDistance, parent: current });
    if (x + 1 < grid[0].length && grid[z][x + 1] !== 1) frontier.push({ x: x + 1, z, distance: newDistance, parent: current });
    if (z - 1 >= 0 && grid[z - 1][x] !== 1) frontier.push({ x, z: z - 1, distance: newDistance, parent: current });
    if (x - 1 >= 0 && grid[z][x - 1] !== 1) frontier.push({ x: x - 1, z, distance: newDistance, parent: current });
    
    counter++;
  }
  
  return expansionPath;
};`}
            </pre>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-3">Algorithm Flow</h3>
                <ol className="space-y-3 text-gray-300 list-decimal list-inside">
                  <li className="pl-2"><span className="font-semibold">Initialization:</span> Set up the maze grid, start position, and data structures.</li>
                  <li className="pl-2"><span className="font-semibold">Algorithm Selection:</span> Choose the search strategy (BFS, DFS, UCS, A*, or Greedy).</li>
                  <li className="pl-2"><span className="font-semibold">Expansion:</span> Iteratively explore adjacent nodes while marking visited cells.</li>
                  <li className="pl-2"><span className="font-semibold">Goal Check:</span> Stop when the goal cell (value 3) is reached.</li>
                  <li className="pl-2"><span className="font-semibold">Path Reconstruction:</span> Trace back from the goal using parent pointers.</li>
                </ol>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-3">Key Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Multiple Strategies:</span> Supports BFS, DFS, UCS, A*, and Greedy Search.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Safety Mechanism:</span> Implements a counter to avoid infinite loops.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Modular Design:</span> Easy to switch between search algorithms.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Visual Feedback:</span> Records expansion path for subsequent animation.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 p-6 bg-slate-700/50 rounded-xl border border-slate-600">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-white">Implementation Notes</h3>
              </div>
              <p className="text-gray-300">
                The maze search framework is designed to be flexible and modular. It supports various search strategies,
                tracks visited nodes to prevent cycles, and uses a simple cost model for grid navigation. Safety mechanisms such as a loop counter ensure robustness.
              </p>
            </div>
          </div>
        </section>

        {/* Visualization and Example */}
        <section id="visualization" className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Visualization & Example</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Maze Visualization</h3>
              <div className="aspect-square relative rounded-lg overflow-hidden bg-slate-900 mb-4">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-cover bg-center opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400 text-center px-8">Interactive maze visualization would appear here</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Visual demonstration of the maze exploration process. Colors indicate the order in which nodes are expanded.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Usage Example</h3>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm mb-4">
                {`// Example usage of the maze search algorithm
import { mazeSearch } from '@/app/utils/mazeSearch';

const grid = [
  [2, 0, 1, 0, 3],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  // 2 = start, 3 = goal, 1 = wall, 0 = open path
];

const expansionPath = mazeSearch({
  grid,
  startPos: { x: 0, z: 0 },
  algorithm: "astar" // Options: "bfs", "dfs", "ucs", "astar", "greedy"
});

console.log("Expansion Path:", expansionPath);
`}
              </pre>
              <p className="text-gray-300 text-sm">
                This example demonstrates calling the maze search function with a sample grid and selected algorithm. The returned expansion path is used for animating the maze exploration.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Conclusion</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              The maze search algorithms implementation offers a robust and flexible framework for exploring grid-based mazes.
              By supporting multiple search strategies and providing clear visual feedback, the project serves as a powerful tool for understanding
              the strengths and differences of various pathfinding approaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center"
              >
                View Source Code
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#"
                className="px-8 py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors shadow-lg flex items-center justify-center"
              >
                Try Interactive Demo
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-blue-400 font-bold text-xl">Maze Search Algorithms</span>
              <p className="text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CodeDocumentation
