

import {Edge,Node, Graph} from '@/app/types/graph'

import {getEdges, getNodes} from "@/app/utils/getData"



interface idnameprops {

city :string
nodes : Node[]


}


export const GetIdByName = ({city , nodes}:idnameprops) => {

  const foundNode = nodes.find((node) => {
    return node.name === city;
  });
  
  return foundNode ? foundNode.id : undefined;
}






export const aStar = (graph: Graph, start: string, goal: string) => {
 





  return { path: [], cost: Infinity }; 
};
