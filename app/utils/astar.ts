

import {Edge,Node, Graph} from '@/app/types/graph'

import {GetNodeByName,GetNodeById} from "@/app/utils/tools"







export const aStar = (graph: Graph, start: string, goal: string) => {
  const nodes =   graph.nodes
  const st = GetNodeByName({name : start , nodes})
  const go = GetNodeByName({name :goal, nodes})
  let path =[]


  if(!st || !go)
  {
    return { path: [], cost: Infinity }; 
  }
  
  


  return { path: [], cost: Infinity }; 
};
