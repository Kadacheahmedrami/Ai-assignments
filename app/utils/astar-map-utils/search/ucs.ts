import type { QueueNode, ExpansionNode } from "@/app/types/search-types";

export function calculateUniformCostExpansionPath(
  grid: number[][],
  startPos: { x: number; z: number }
): ExpansionNode[] {

  // heighe o lwidthe bach mana5rjouch ln lmaze
  const height = grid.length;
  const width = grid[0].length;

  const expNodes = Array.from({ length: height }, () => Array(width).fill(false));
  const result: ExpansionNode[] = [];
  let nodeCounter = 0;
  let found = false;

  // intializer la file de priorité (priority queue)
  // on utilise un tableau et on le trie par coût (distance)
  const priorityQueue: QueueNode[] = [];
  
  // initial node with cost 0
  priorityQueue.push({ x: startPos.x, z: startPos.z, distance: 0, parent: null });
  
  let counter = 1; // counter to detect errors 
  while (priorityQueue.length > 0 && !found && counter < 1000) {
    
    // trier la file par coût (distance) croissant
    priorityQueue.sort((a, b) => a.distance - b.distance);
    
    // pop bss7 ta3 file de priorité
    const current = priorityQueue.shift()!;
    const { x, z, distance } = current;
    
    // éviter de sortir du maze ou revisiter des cases
    if (x < 0 || x >= width || z < 0 || z >= height || grid[z][x] === 1 || expNodes[z][x]) {
      counter++;
      continue;
    }
    
    // mark bli rahi tvistat mn9ball
    expNodes[z][x] = true;
    
    // ajoutiha fresulta avec le compteur
    result.push({ x, z, distance: nodeCounter++ });
    
    // kiin tossl lal resultas markiha bli we found the solotion bach ta5rouj mn la boucle
    if (grid[z][x] === 3) {
      found = true;
      break;
    }
    
    // calculer le coût pour les voisins
    const newDistance = distance + 1;
    // if its a wall dont apend it in the queue
    if (z + 1 < height && grid[z + 1][x] !== 1) 
      priorityQueue.push({ x: x, z: z + 1, distance: newDistance, parent: current });
    if (x + 1 < width && grid[z][x + 1] !== 1) 
      priorityQueue.push({ x: x + 1, z: z, distance: newDistance, parent: current });
    if (z - 1 >= 0 && grid[z - 1][x] !== 1) 
      priorityQueue.push({ x: x, z: z - 1, distance: newDistance, parent: current });
    if (x - 1 >= 0 && grid[z][x - 1] !== 1) 
      priorityQueue.push({ x: x - 1, z: z, distance: newDistance, parent: current });
    
    counter++;
  }

  return result;
}
