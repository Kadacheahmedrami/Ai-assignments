import type { ExpansionNode } from "@/app/types/search-types";
type Node = { x: number; z: number }
export function calculateDfsExpansionPath(
  grid: number[][],
  startPos: { x: number; z: number }
): ExpansionNode[] {
  // intitialization


    // heighe o lwidthe bach mana5rjouch ln lmaze
  const height = grid.length
  const width = grid[0].length


  const expNodes = Array.from({ length: height }, () => Array(width).fill(false))
  const result : ExpansionNode[] = []
  let nodeCounter = 0
  let found = false
  const stack: Node[] = [{ x: startPos.x, z: startPos.z }]
  // tanque stack n'est pas vide et la resultas is not found 


  let  counter =1 
    // counter to detect errors 
  while (stack.length > 0 && !found && counter < 1000){
    const { x, z } = stack.pop()!
    // to avoid quiting the maze or enrering in a loop 
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

    if (grid[z + 1][x] !== 1) stack.push({ x: x, z: z + 1 });
    if (grid[z][x + 1] !== 1) stack.push({ x: x + 1, z: z }); 
    if (grid[z - 1][x] !== 1) stack.push({ x: x, z: z - 1 });
    if (grid[z][x - 1] !== 1) stack.push({ x: x - 1, z: z }); 

    counter++
  }

  if (stack.length === 0) return [];
  return result
}