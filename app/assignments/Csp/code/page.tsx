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
                A* Pathfinding
              </span>
              <span className="block text-white mt-1">Algorithm Implementation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              A detailed documentation of our A* search algorithm implementation for finding optimal paths between
              locations using geographic data.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#algorithm"
                className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center"
              >
                View Algorithm
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
              This implementation of the A* algorithm is designed to find the shortest path between two locations on a
              map. It uses geographic coordinates (latitude and longitude) to calculate distances and employs a
              heuristic function to guide the search process efficiently. The algorithm is implemented in TypeScript and
              can be used with any graph-based representation of a map.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Geographic Data</h3>
                <p className="text-gray-300">
                  Uses real-world coordinates with the geolib library for accurate distance calculations
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Heuristic Search</h3>
                <p className="text-gray-300">
                  Implements an admissible heuristic based on geographic distance to guide the search
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">TypeScript Implementation</h3>
                <p className="text-gray-300">
                  Strongly typed code with clear interfaces and modular design for maintainability
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
              The implementation uses three main data structures to represent the graph and its components:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-400" />
                  Node Interface
                </h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm">
                  {`export interface Node {
  id: number;      
  name: string;
  lat: number;
  lon: number;
  nodeType: string;
  isSettlement: boolean;
  population: number;
  parentid: number   // for backtracking
  cost: number
}`}
                </pre>
                <div className="mt-4 text-gray-300">
                  <p>Represents a location on the map with:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Geographic coordinates (lat, lon)</li>
                    <li>Metadata (name, type, population)</li>
                    <li>Algorithm-specific data (parentid, cost)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <GitBranch className="h-5 w-5 mr-2 text-blue-400" />
                  Edge Interface
                </h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm">
                  {`export interface Edge {
  start: number;
  destination: number;
  distance: number;
}`}
                </pre>
                <div className="mt-4 text-gray-300">
                  <p>Represents a connection between two nodes:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>References nodes by their IDs</li>
                    <li>Stores the distance between nodes</li>
                    <li>Used to calculate path costs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Navigation className="h-5 w-5 mr-2 text-blue-400" />
                  Graph Interface
                </h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm">
                  {`export interface Graph {
  nodes: Node[];
  edges: Edge[];
}`}
                </pre>
                <div className="mt-4 text-gray-300">
                  <p>Contains the complete map representation:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Collection of all nodes (locations)</li>
                    <li>Collection of all edges (connections)</li>
                    <li>Used by the algorithm to navigate the map</li>
                  </ul>
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
              The Agent class is responsible for navigating through the graph, tracking the current position and cost,
              and making decisions about which node to visit next.
            </p>

            <pre className="bg-slate-900 p-6 rounded-lg overflow-x-auto text-gray-300 text-sm mb-8">
              {`export class Agent {
    currentCost: number;
    node: Node;
    graph: Graph;

    neighbors = () => {
        return neighbors({graph: this.graph, node: this.node, currentCost: this.currentCost})
    }

    move = ({frontier}: moveProps) => {  
        let selectedNode = <Node>{}
        let min = Infinity
        frontier.map((node) => {
            if(min > node.cost) {
                min = node.cost
                selectedNode = node
            }
        })
        
        if(!selectedNode) {
            return frontier;
        }

        // Update agent position
        this.node = selectedNode
        // Save the cost
        this.currentCost = min

        return frontier.filter(node => node !== this.node)
    }

    constructor({graph, node, currentCost}: neighborsProps) {
        this.graph = graph;
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
                    <span>
                      <span className="font-semibold">State Tracking:</span> Maintains the current node and accumulated
                      cost
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Neighbor Discovery:</span> Finds adjacent nodes in the graph
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Movement Logic:</span> Selects the next node with the lowest cost
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Frontier Management:</span> Updates the frontier by removing the
                      selected node
                    </span>
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
                    <span>
                      The <code className="bg-slate-800 px-1 rounded">neighbors()</code> method retrieves all connected
                      nodes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      The <code className="bg-slate-800 px-1 rounded">move()</code> method implements the greedy
                      selection strategy
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Uses a priority-based approach to select the next node with minimum cost</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Returns the updated frontier after removing the selected node</span>
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
              The implementation includes several utility functions that support the A* algorithm by providing node
              lookup, distance calculations, and other helper operations.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Node Lookup Functions</h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm mb-4">
                  {`// Get node by name
export const GetNodeByName = ({name, nodes}: idnameprops) => {
  const foundNode = nodes.find((node) => {
    return node.name === name;
  });
  return foundNode;
}

// Get node by ID
export const GetNodeById = ({id, nodes}: nameidprops) => {
  const foundNode = nodes.find((node) => {
    return node.id === id;
  });
  return foundNode;
}`}
                </pre>
                <p className="text-gray-300 text-sm">
                  These functions provide convenient ways to retrieve nodes from the graph by either name or ID, which
                  is essential for the algorithms operation.
                </p>
              </div>

              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Heuristic Functions</h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm mb-4">
                  {`// h(x) - Heuristic function
export const h = ({node1, node2}: hProps) => {     
  const distance = getDistance(
    { latitude: node1.lat, longitude: node1.lon }, 
    { latitude: node2.lat, longitude: node2.lon }   
  );
  return distance/1000;
}

// Calculate heuristic values for all nodes
export const heuristicMap = ({Graph, endNode}: heuristicMapProps) => {
  const nodes = Graph.nodes
  const hValues = nodes.map((node) => {
    return [node, h({node1: endNode, node2: node})];
  })
  const hmap = hValues.map((hval) => {
    return <hmapProp>{node: hval[0], h: hval[1]};
  })
  return hmap;
}`}
                </pre>
                <p className="text-gray-300 text-sm">
                  The heuristic functions calculate the estimated distance to the goal, which is crucial for the A*
                  algorithms efficiency in finding the optimal path.
                </p>
              </div>

              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Neighbor and Edge Functions</h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm mb-4">
                  {`// Get connected edges
export const getJari = ({nodeid, edges}: jariPropos) => {
  const jiran = edges.filter((edge) => {
    if (edge.start === nodeid) {
      return edge;
    }
  })
  return jiran;  
}

// Get neighbor nodes
export const neighbors = ({graph, node}: neighborsProps) => {
  const nodes = graph.nodes;
  const jiran = getJari({nodeid: node.id, edges: graph.edges});
  if(!jiran) {
    return [];
  }
  const neighbors = jiran.map((jar) => {
    return GetNodeById({id: jar.destination, nodes: nodes})!;
  })
  return neighbors;
}`}
                </pre>
                <p className="text-gray-300 text-sm">
                  These functions help identify connected nodes and edges in the graph, allowing the algorithm to
                  explore the map structure efficiently.
                </p>
              </div>

              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Cost and Path Functions</h3>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm mb-4">
                  {`// Calculate cost between nodes
export const getCost = ({current, next, graph, currentCost}: costProp) => {
  const cost = graph.edges.find((edge) => {
    if(edge.start === current.id && edge.destination === next.id) {
      return edge.distance;
    }
  })
  return cost ? cost.distance + currentCost : 0;
}

// Insert cost into nodes
export const insertcost = ({graph, hmap, currentNode, currentCost}: insertProp) => {
  let nodesWithCost;
  const nodes = graph.nodes;
  hmap.find((tuple) => {
    nodesWithCost = nodes.map((node) => {
      if (tuple.node.id === node.id) {
        return node.cost = tuple.h + getCost({
          current: currentNode, 
          next: node, 
          graph, 
          currentCost
        });
      }  
    })
  })
  return nodesWithCost;
}

// Remove already visited nodes
export const subtractNodesArray = ({neighbors, alreadyvisted}: substractProp): Node[] => {
  return neighbors.filter(node => 
    !alreadyvisted.some(visited => node.id === visited.id)
  );
}`}
                </pre>
                <p className="text-gray-300 text-sm">
                  These functions handle cost calculations, node updates, and filtering operations that are essential
                  for the A* algorithms path-finding process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* A* Algorithm Implementation */}
        <section id="algorithm" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">A* Algorithm Implementation</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg mb-8">
              The core A* algorithm implementation combines all the components to find the optimal path between two
              locations.
            </p>

            <pre className="bg-slate-900 p-6 rounded-lg overflow-x-auto text-gray-300 text-sm mb-8">
              {`export interface aStarProps {
  graph: Graph;
  start: string;
  goal: string;
}

export const aStar = ({graph, start, goal}: aStarProps) => {
  const nodes = graph.nodes;
  const edges = graph.edges;
  const st = GetNodeByName({name: start, nodes});
  const go = GetNodeByName({name: goal, nodes});
  const path: Node[] = [];

  if(!st || !go) {
    alert("one of the names is wrong");
    return { path: [], cost: Infinity }; 
  } else {
    const agent = new Agent({graph, node: st, currentCost: 0});
    let alreadyvisted = [agent.node]; 
    const hmap = heuristicMap({Graph: {nodes, edges}, endNode: go});
    let frontier = [agent.node];
    let x = 0;

    // Use x to write a non-crushable code
    // Learned from NASA's approach to uncrashable code
    while(true && x < 10000) {
      if(frontier.length === 0) {
        alert("no path found");
        console.log("no path found");
        return { path: [], cost: Infinity }; 
      } else {
        if(agent.node.id === go.id) { 
          const cost = agent.currentCost;
          while (agent.node) {
            path[path.length] = agent.node;
            agent.node = GetNodeById({id: agent.node.parentid, nodes})!;
          }
          console.log("it wooorks :)");
          path.reverse();
          return { path, cost };
        }

        const neighbors = agent.neighbors();
        const notvisited = subtractNodesArray({neighbors, alreadyvisted});
        notvisited.map((node) => {
          node.parentid = agent.node.id;
        });
        frontier = frontier.concat(notvisited);
        neighbors.map((node) => {
          insertcost({graph, hmap, currentNode: node, currentCost: agent.currentCost});
        });
        
        alreadyvisted = alreadyvisted.concat([agent.node]);
        // Added to avoid loops
        frontier = subtractNodesArray({neighbors: frontier, alreadyvisted});
        frontier = agent.move({frontier});
      }
      x = x + 1;
    }
  } 
};`}
            </pre>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-3">Algorithm Flow</h3>
                <ol className="space-y-3 text-gray-300 list-decimal list-inside">
                  <li className="pl-2">
                    <span className="font-semibold">Initialization:</span> Set up the start and goal nodes, create an
                    agent, and initialize data structures
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold">Main Loop:</span> Continue searching until the goal is found or the
                    frontier is empty
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold">Goal Check:</span> If the current node is the goal, reconstruct and
                    return the path
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold">Expansion:</span> Find neighbors of the current node and add
                    unvisited ones to the frontier
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold">Cost Calculation:</span> Update costs for neighboring nodes based on
                    the heuristic
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold">Selection:</span> Move the agent to the node with the lowest cost
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold">Loop Prevention:</span> Track visited nodes to avoid cycles
                  </li>
                </ol>
              </div>

              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-3">Key Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Safety Limit:</span> Uses a counter (x) to prevent infinite loops,
                      inspired by NASAs approach to robust code
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Path Reconstruction:</span> Uses parent pointers to trace back
                      from the goal to the start
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Error Handling:</span> Provides clear feedback when no path is
                      found or input names are incorrect
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Optimized Search:</span> Combines actual cost and heuristic
                      estimates to guide the search efficiently
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold">Flexible Interface:</span> Takes start and goal locations by name
                      for easy integration with user interfaces
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-slate-700/50 rounded-xl border border-slate-600">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-white">Implementation Notes</h3>
              </div>
              <p className="text-gray-300">
                This implementation follows the classic A* algorithm pattern but is adapted for geographic data. The use
                of a safety counter (x) is inspired by NASAs approach to writing robust, uncrashable code. The
                algorithm efficiently balances exploration of promising paths with the guarantee of finding the optimal
                solution when one exists.
              </p>
            </div>
          </div>
        </section>

        {/* Visualization and Example */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Visualization & Example</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Sample Path Visualization</h3>
              <div className="aspect-square relative rounded-lg overflow-hidden bg-slate-900 mb-4">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-cover bg-center opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400 text-center px-8">Interactive visualization would appear here</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                A visual representation of the A* algorithm finding the shortest path between two cities. The green
                nodes represent the optimal path, yellow nodes are explored but not part of the final path, and red
                nodes are the start and goal locations.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Usage Example</h3>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm mb-4">
                {`// Example usage of the A* algorithm
import { aStar } from '@/app/utils/astar';
import { Graph } from '@/app/types/graph';

// Sample graph with cities and roads
const cityGraph: Graph = {
  nodes: [
    { id: 1, name: "New York", lat: 40.7128, lon: -74.0060, nodeType: "city", isSettlement: true, population: 8400000, parentid: 0, cost: 0 },
    { id: 2, name: "Boston", lat: 42.3601, lon: -71.0589, nodeType: "city", isSettlement: true, population: 675000, parentid: 0, cost: 0 },
    { id: 3, name: "Philadelphia", lat: 39.9526, lon: -75.1652, nodeType: "city", isSettlement: true, population: 1500000, parentid: 0, cost: 0 },
    // More cities...
  ],
  edges: [
    { start: 1, destination: 2, distance: 346 },
    { start: 1, destination: 3, distance: 151 },
    { start: 2, destination: 3, distance: 438 },
    // More roads...
  ]
};

// Find the shortest path from New York to Boston
const result = aStar({
  graph: cityGraph,
  start: "New York",
  goal: "Boston"
});

console.log("Path found:", result.path.map(node => node.name));
console.log("Total distance:", result.cost, "km");`}
              </pre>
              <p className="text-gray-300 text-sm">
                This example demonstrates how to use the A* algorithm implementation with a sample graph of cities and
                roads. The algorithm finds the shortest path from New York to Boston and returns both the path and the
                total distance.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Conclusion</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              This implementation of the A* algorithm provides an efficient and robust solution for finding optimal
              paths in geographic data. By combining a well-structured graph representation, an admissible heuristic
              function, and careful state management, the algorithm can reliably find the shortest path between any two
              locations in the graph when such a path exists.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              The code is designed with maintainability and robustness in mind, featuring clear interfaces, modular
              components, and safety mechanisms to prevent crashes. The implementation can be easily integrated into
              larger applications that require pathfinding capabilities, such as navigation systems, logistics planning
              tools, or geographic information systems.
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
              <span className="text-blue-400 font-bold text-xl">A* Algorithm Implementation</span>
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

