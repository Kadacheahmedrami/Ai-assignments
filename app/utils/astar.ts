

import {Edge,Node, Graph} from '@/app/types/graph'

import {GetNodeByName,GetNodeById} from "@/app/utils/tools"
import {Agent} from '@/app/utils/class'






export const aStar = (graph: Graph, start: string, goal: string) => {
  let nodes =   graph.nodes
  const st = GetNodeByName({name : start , nodes})
  const go = GetNodeByName({name :goal, nodes})
  let path =[]


  if(!st || !go)
  {
    return { path: [], cost: Infinity }; 
  }
  

  let frontier: Node[] = []
  let vistedNodes = []
  frontier.push(st)
  let agent = new Agent({graph,node:st})

  while(true)
  {
    if(frontier.length === 0)
    {
      alert("no path found")
      return []
    }

    const neighbors = agent.neighbors()
  }

  
  


   
};
