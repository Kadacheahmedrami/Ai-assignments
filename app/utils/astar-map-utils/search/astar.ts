import { QueueNode, ExpansionNode } from "@/app/types/search-types";

export function calculateAStarExpansionPath(
  grid: number[][], 
  startPos: { x: number; z: number }
): ExpansionNode[] {
  
  // heighe o lwidthe bach mana5rjouch ln lmaze
  const height = grid.length;
  const width = grid[0].length;

  // njibou position ta3 reultas
  let goalPos = { x: -1, z: -1 };
  for (let z = 0; z < height; z++) {
    for (let x = 0; x < width; x++) {
      if (grid[z][x] === 3) {
        goalPos = { x, z };
        break; // Exit once found
      }
    }
    if (goalPos.x !== -1) break; // Exit once found
  }

  // If goal not found, return empty
  if (goalPos.x === -1) {
    return [];
  }

  // Helper function for unique position keys
  const getPositionKey = (x: number, z: number): string => `${x},${z}`;
  
  const visited = new Map<string, boolean>();
  const result: ExpansionNode[] = [];
  let nodeCounter = 0;

  // intializer la file de priorité pour A* search
  const priorityQueue: QueueNode[] = [];
  
  // fonction heuristique (distance de Manhattan)
  const heuristic = (x: number, z: number) => Math.abs(x - goalPos.x) + Math.abs(z - goalPos.z);
  
  // Define directions (up, right, down, left)
  const directions = [
    { dx: 0, dz: -1 }, // Up
    { dx: 1, dz: 0 },  // Right
    { dx: 0, dz: 1 },  // Down
    { dx: -1, dz: 0 }  // Left
  ];
  
  // initial node
  priorityQueue.push({
    x: startPos.x,
    z: startPos.z,
    distance: 0,
    parent: null,
    heuristic: heuristic(startPos.x, startPos.z),
    f: 0 + heuristic(startPos.x, startPos.z)
  });
  
  // Safety limit
  const MAX_ITERATIONS = height * width * 2;
  let counter = 0; // counter to detect errors
  
  while (priorityQueue.length > 0 && counter < MAX_ITERATIONS) {
    
    // trier la file par f (f = g + h)
    priorityQueue.sort((a, b) => (a.f ?? 0) - (b.f ?? 0));
    
    // pop bss7 ta3 file 
    const current = priorityQueue.shift()!;
    const { x, z, distance } = current;
    const posKey = getPositionKey(x, z);
    
    // éviter de sortir du maze ou revisiter des cases
    if (x < 0 || x >= width || z < 0 || z >= height || grid[z][x] === 1 || visited.has(posKey)) {
      counter++;
      continue;
    }
    
    // mark bli rahi tvistat mn9ball
    visited.set(posKey, true);
    
    // ajoutiha fresulta
    result.push({ x, z, distance: nodeCounter++ });
    
    // kiin tossl lal resultas markiha bli we found the solotion bach ta5rouj mn la boucle
    if (grid[z][x] === 3) {
      break;
    }
    
    // calculer le coût pour les voisins
    const newDistance = distance + 1;
    
    // Check all four directions
    for (const { dx, dz } of directions) {
      const newX = x + dx;
      const newZ = z + dz;
      
      // if its a wall dont apend it in the queue
      if (newX < 0 || newX >= width || newZ < 0 || newZ >= height || 
          grid[newZ][newX] === 1 || visited.has(getPositionKey(newX, newZ))) {
        continue;
      }
      
      priorityQueue.push({
        x: newX,
        z: newZ,
        distance: newDistance,
        parent: current,
        heuristic: heuristic(newX, newZ),
        f: newDistance + heuristic(newX, newZ)
      });
    }
    
    counter++;
  }

  return result;
}