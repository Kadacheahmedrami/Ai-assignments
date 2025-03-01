
import {Graph,Node} from '@/app/types/graph'
import {Agent} from '@/app/utils/class'
import {GetNodeByName,GetNodeById,heuristicMap,subtractNodesArray, insertcost} from "@/app/utils/tools"


export interface aStarProps{
  graph: Graph;
  start: string;
   goal: string
}
export const aStar = ({graph , start , goal }:aStarProps) => {

  const nodes =   graph.nodes
  const edges =   graph.edges
  const st = GetNodeByName({name : start , nodes})
  const go = GetNodeByName({name :goal, nodes})
  const path: Node[] = []

  if(!st || !go)
  {
    alert("one of the names is wrong")
    return { path: [], cost: Infinity }; 
  }
  else
  {
    const agent = new Agent({graph,node: st,currentCost:0})
    let alreadyvisted = [agent.node] 
    const hmap = heuristicMap({Graph : {nodes,edges} , endNode : go })
    let frontier = [agent.node]
    let x = 0

    // use the x to write a non crushable code
    // i learned this from this video that talk how nasa write uncrashable code
    while(true && x< 10000)
    {
      if(frontier.length === 0)
      {
        alert("no path found")
        console.log("no path found")
        return { path: [], cost: Infinity }; 
      }
      else
      {
        if(agent.node.id === go.id)
        { 
          const cost = agent.currentCost
          while (agent.node)
          {
            // console.log(agent.node.name)
            path[path.length]= agent.node
            agent.node = GetNodeById({id:agent.node.parentid,nodes})!
           
          }
        
          console.log("it wooorks :)")
       

          path.reverse()

        
          return { path, cost};

        }

        const neighbors = agent.neighbors()
        const notvisited = subtractNodesArray({neighbors,alreadyvisted})
        notvisited.map((node)=>{
          node.parentid = agent.node.id
        })
        frontier = frontier.concat(notvisited)
        neighbors.map((node)=>{
          insertcost({graph,hmap,currentNode:node,currentCost:agent.currentCost})
        })
        
        alreadyvisted = alreadyvisted.concat([agent.node])
       // added pour eviter la boucle 
        frontier = subtractNodesArray({neighbors: frontier,alreadyvisted})
        // console.log('step ',x, '= ',agent.node.name
        frontier = agent.move({frontier});

      }
      x=x+1
    }
  } 
};
