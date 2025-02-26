// pages/api/astar.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Node = {
  id: string;
  lat: number;
  lon: number;
};

type Edge = {
  from: string;
  to: string;
  distance: number;
};

type Graph = {
  nodes: Node[];
  edges: Edge[];
};

// Function to fetch graph data from a third-party API.
const fetchGraphData = async (): Promise<Graph> => {
  // Replace with your actual API endpoint.
  const response = await fetch('https://api.example.com/graph?region=algeria');
  if (!response.ok) {
    throw new Error('Failed to fetch graph data from third-party API');
  }
  return await response.json();
};

// Haversine formula to estimate straight-line distance between two coordinates.
const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getNodeById = (graph: Graph, id: string): Node | undefined =>
  graph.nodes.find((node) => node.id === id);

const buildAdjacencyList = (graph: Graph) => {
  const adjList: { [key: string]: { neighbor: string; distance: number }[] } =
    {};
  graph.nodes.forEach((node) => {
    adjList[node.id] = [];
  });
  graph.edges.forEach((edge) => {
    // Assuming directed edges; if undirected, add both directions.
    adjList[edge.from].push({ neighbor: edge.to, distance: edge.distance });
  });
  return adjList;
};

// A* algorithm implementation.
const aStar = (graph: Graph, start: string, goal: string) => {
  const adjList = buildAdjacencyList(graph);
  const openSet: Set<string> = new Set();
  openSet.add(start);

  const cameFrom: { [key: string]: string | null } = {};
  const gScore: { [key: string]: number } = {};
  const fScore: { [key: string]: number } = {};

  graph.nodes.forEach((node) => {
    gScore[node.id] = Infinity;
    fScore[node.id] = Infinity;
    cameFrom[node.id] = null;
  });

  gScore[start] = 0;
  const startNode = getNodeById(graph, start);
  const goalNode = getNodeById(graph, goal);
  if (!startNode || !goalNode) {
    throw new Error('Invalid start or goal node');
  }
  fScore[start] = haversineDistance(startNode.lat, startNode.lon, goalNode.lat, goalNode.lon);

  while (openSet.size > 0) {
    // Choose the node in openSet with the lowest fScore.
    let current = Array.from(openSet).reduce((prev, curr) =>
      fScore[curr] < fScore[prev] ? curr : prev
    );

    if (current === goal) {
      // Reconstruct the path.
      const path: string[] = [];
      let temp: string | null = current;
      while (temp) {
        path.unshift(temp);
        temp = cameFrom[temp];
      }
      return { path, cost: gScore[goal] };
    }

    openSet.delete(current);

    for (const neighborObj of adjList[current]) {
      const tentativeGScore = gScore[current] + neighborObj.distance;
      if (tentativeGScore < gScore[neighborObj.neighbor]) {
        cameFrom[neighborObj.neighbor] = current;
        gScore[neighborObj.neighbor] = tentativeGScore;
        const neighborNode = getNodeById(graph, neighborObj.neighbor);
        if (neighborNode) {
          fScore[neighborObj.neighbor] =
            tentativeGScore +
            haversineDistance(neighborNode.lat, neighborNode.lon, goalNode.lat, goalNode.lon);
        }
        openSet.add(neighborObj.neighbor);
      }
    }
  }
  return { path: [], cost: Infinity }; // No valid path found.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start, goal } = req.query;
  if (typeof start !== 'string' || typeof goal !== 'string') {
    res.status(400).json({ error: 'Please provide both start and goal as query parameters' });
    return;
  }

  try {
    const graph = await fetchGraphData();
    const result = aStar(graph, start, goal);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
