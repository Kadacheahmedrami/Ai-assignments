import type { QueueNode, ExpansionNode } from "@/app/types/search-types";

  type Node = { x: number; z: number ,heuristic : number }
  // mannhatan distance mn cs 50  course 
  const heuristic = (x: number, z: number , goalPos: { x: number; z: number; }) => {
    return Math.abs(x - goalPos.x) + Math.abs(z - goalPos.z);
  };


export function calculateGreedySearchExpansionPath(
  grid: number[][],
  startPos: { x: number; z: number }
): ExpansionNode[] {

  // heighe o lwidthe bach mana5rjouch ln lmaze
  const height = grid.length;
  const width = grid[0].length;

  // njibou position ta3 reultas
  let goalPos = { x: 0, z: 0 };
  for (let z = 0; z < height; z++) {
    for (let x = 0; x < width; x++) {
      if (grid[z][x] === 3) {
        goalPos = { x, z };
      }
    }
  } 

  const expNodes = Array.from({ length: height }, () => Array(width).fill(false))
  const result : ExpansionNode[] = []
  let nodeCounter = 0
  let found = false
  const nodelist: Node[] = [{
    x: startPos.x, z: startPos.z,
    heuristic: heuristic(startPos.x , startPos.z , goalPos)
  }]


  let  counter =1 
  // counter to detect errors 
  while (nodelist.length > 0 && !found  && counter <1000 )  {
   
    nodelist.sort((a, b) => (a.heuristic ?? 0) - (b.heuristic ?? 0));

    const current = nodelist.shift()!;
    
    const { x, z } = current
    // to avoid quiting the maze or enrering in a loop 
    if (x < 0 || x >= width || z < 0 || z >= height || grid[z][x] === 1 || expNodes[z][x]) {
      continue
    }
    
        // mark bli rahi tvistat mn9ball
        expNodes[z][x] = true

    result.push({ x, z, distance: nodeCounter++ })
    // kiin tossl lal resultas markiha bli we found the solotion bach ta5rouj mn la boucle

    
    if (grid[z][x] === 3) {
      found = true
      break
    }



      // if its a wall dont apend it in the stack
      if (grid[z + 1][x] !== 1) nodelist.push({ x: x, z: z + 1 ,heuristic: heuristic(x,z+1,goalPos)});
      if (grid[z][x + 1] !== 1) nodelist.push({ x: x + 1, z: z, heuristic: heuristic(x+1,z,goalPos)}); 
      if (grid[z - 1][x] !== 1) nodelist.push({ x: x, z: z - 1 ,heuristic: heuristic(x,z-1,goalPos)});
      if (grid[z][x - 1] !== 1) nodelist.push({ x: x - 1, z: z ,heuristic: heuristic(x-1,z,goalPos)});

      counter++
  }
 

  return result;





}
