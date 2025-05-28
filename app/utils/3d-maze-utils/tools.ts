

import {Node} from '@/app/types/graph'
import { getDistance } from 'geolib';
import {idnameprops,nameidprops,hProps,heuristicMapProps,hmapProp,jariPropos,neighborsProps,costProp,insertProp,substractProp} from '@/app/utils/3d-maze-utils/interfaces'

// tjiib node bl name
export const GetNodeByName = ({name , nodes}:idnameprops) => {

  const foundNode = nodes.find((node) => {
    return node.name === name;
  });
  
  return foundNode 
}


// tjiib node bl id
export const GetNodeById = ({id , nodes}:nameidprops) => {

  const foundNode = nodes.find((node) => {
    return node.id === id;
  });
  
  return foundNode;
}



// h(x)
export const h= ({node1 , node2}:hProps) =>
  {     
    const distance = getDistance(
        { latitude: node1.lat, longitude: node1.lon }, 
        { latitude: node2.lat , longitude: node2.lon }   
    );
 
    return distance/1000
  }



// ta7ssab h(x) of all the nodes depending on the endnode
export const heuristicMap = ({Graph , endNode}:heuristicMapProps) =>{


const nodes = Graph.nodes

    const hValues =  nodes.map((node)=>{
        return  [node , h({node1:endNode,node2 : node})]
    })

    const hmap = hValues.map((hval)=>{
        return <hmapProp>{node :hval[0],h :hval[1]}
    })

    return hmap

}


// tjiib edges
export const getJari = ({nodeid ,edges } : jariPropos) =>
{
  const jiran =  edges.filter((edge)=>{
    if (edge.start === nodeid)
    {
    return edge
    }
  })

  return jiran  
}


// tjiib neghbior nodes 
export const neighbors = ({ graph, node }: neighborsProps) =>
{

    const nodes = graph.nodes
    const jiran = getJari({nodeid: node.id,edges:graph.edges})
    if(! jiran)
    {
        return []
    }

    const neighbors = jiran.map((jar)=>{
        return GetNodeById({id :  jar.destination, nodes: nodes})!
    })

    
    return neighbors

}

// tjiib lcost mn node lnode aka g(x)
export const getCost  = ( {current,next,graph,currentCost}:costProp)=>
    {
     const cost = graph.edges.find((edge)=>{
        if(edge.start === current.id &&  edge.destination === next.id)
        {
            return edge.distance
        }
    })
      return cost ? cost.distance + currentCost : 0
    }


// calculate the cost for each nod in array and inser it in that node 

export const insertcost = ({graph,hmap,currentNode,currentCost } : insertProp ) =>
{
  
    let nodesWithCost
    const nodes = graph.nodes
    hmap.find((tuple)=>{
         nodesWithCost = nodes.map((node)=>{
            if (tuple.node.id === node.id)
            {
                return node.cost= tuple.h + getCost({current:currentNode , next:node , graph,currentCost} )
            }  
        })
    })
    return nodesWithCost

}


export const subtractNodesArray   =  ({ neighbors, alreadyvisted }: substractProp) : Node[]   => 
{

    return neighbors.filter(node => !alreadyvisted.some(visited => node.id === visited.id));
}

