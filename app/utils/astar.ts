

import {Edge,Node, Graph} from '@/app/types/graph'

import {getEdges, getNodes} from "@/app/utils/getData"



interface idnameprops {
city :string
nodes : Node[]
}

interface location {
  lang :number
  lot : number
  }



export const GetIdByName = ({city , nodes}:idnameprops) => {

  const foundNode = nodes.find((node) => {
    return node.name === city;
  });
  
  return foundNode ? foundNode.id : undefined;
}



export const h = (location1:location , location2:location) =>
  {
    const x = Math.abs(location1.lang - location2.lang )
  
    const y = Math.abs(location1.lot - location2.lot)
  
    console.log("y=",y)
    console.log(x)
    const dist = Math.sqrt((x*x)+(y*y))
    return dist
  }





export const aStar = (graph: Graph, start: string, goal: string) => {
 





  return { path: [], cost: Infinity }; 
};
