
import {Graph,Node} from '@/app/types/graph'
import {Agent} from '@/app/utils/class'
import {GetNodeByName,GetNodeById,heuristicMap,subtractNodesArray, insertcost} from "@/app/utils/tools"


export interface aStarProps{
  graph: Graph;
  start: string;
   goal: string
}




export const aStar = ({graph , start , goal }:aStarProps) => {
  let nodes =   graph.nodes
  let edges =   graph.edges
  const st = GetNodeByName({name : start , nodes})
  const go = GetNodeByName({name :goal, nodes})
  let path: Node[] = []





  if(!st || !go)
  {
    alert("one of the names is wrong")
    return { path: [], cost: Infinity }; 
  }
  else
  {



    let agent = new Agent({graph,node: st})
    let alreadyvisted = [agent.node] 
    const hmap = heuristicMap({Graph : {nodes,edges} , endNode : go })
    let frontier = [agent.node]


   

    // let neighbors = agent.neighbors()
  
 
   

    let x = 0
    // use the x to write a non crushable code
    while(true && x< 10000)
    {
    
      if(frontier.length === 0)
      {
    
        alert("no path found")
        console.log("no path found")
        return { path: [], cost: Infinity }; 
       x
      }
      else
      {

        if(agent.node.id === go.id)
        { 
          

          while (agent.node)
          {
            // console.log(agent.node.name)
            path[path.length]= agent.node
            agent.node = agent.node.parent
           
          }
        
          console.log("we found the path")
       
          

          path.reverse()

      
          return { path, cost: Infinity };

        }

        
      
        const neighbors = agent.neighbors()
        const notvisited = subtractNodesArray({alreadyvisted,neighbors}

        ) 

        frontier = frontier.concat(notvisited)

       

        insertcost({graph,hmap,currentNode:agent.node})

        alreadyvisted = alreadyvisted.concat([agent.node])
        
        // console.log('visted',alreadyvisted)
       // console.log(x,') frontier : ',frontier)



       // added pour eviter la boucle 
        frontier = subtractNodesArray({neighbors: frontier,alreadyvisted})
        

        // console.log('step ',x, '= ',agent.node.name)
        agent.move({frontier})
        


     

      }

      x=x+1

    }

  





  } 
};
