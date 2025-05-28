import type { QueueNode, ExpansionNode } from "@/app/types/search-types";

export function calculateBfsExpansionPath(grid: number[][], startPos: { x: number; z: number }): ExpansionNode[] {
  

    // heighe o lwidthe bach mana5rjouch ln lmaze
  const height = grid.length
  const width = grid[0].length


  const expNodes = Array.from({ length: height }, () => Array(width).fill(false))
  const result : ExpansionNode[] = []
  let nodeCounter = 0
  let found = false
  const queue: QueueNode[] = []

  // intializer la file d'attente
  queue.push({ x: startPos.x, z: startPos.z, distance: 0, parent: null })
  
  let counter = 1
    // counter to detect errors 
  while (queue.length > 0 && !found && counter < 1000) {

    
    // pop bss7 ta3 file 
    const agent = queue.shift()!
    const {x,z} = agent
    if (x < 0 || x >= width || z < 0 || z >= height || grid[z][x] === 1 || expNodes[z][x]) {
      continue
    }

    // mark bli rahi tvistat mn9ball
    expNodes[z][x] = true

    // ajoutiha fresulta
    result.push({ x, z, distance: nodeCounter++ })

    // kiin tossl lal resultas markiha bli we found the solotion bach ta5rouj mn la boucle
    if (grid[z][x] === 3) {
      found = true
      break
    }

    // if its a wall dont apend it in the stack

    if (grid[z + 1][x] !== 1) queue.push({ x: x, z: z + 1,distance: 0,parent: agent});
    if (grid[z][x + 1] !== 1) queue.push({x: x + 1, z: z,distance: 0,parent: agent}); 
    if (grid[z - 1][x] !== 1) queue.push({x: x, z: z - 1,distance: 0,parent: agent});
    if (grid[z][x - 1] !== 1) queue.push({x: x - 1, z: z,distance: 0,parent: agent}); 
    
    counter++
  }

  return result;
}