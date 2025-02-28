

import {Edge,Node, Graph} from '@/app/types/graph'
import next from 'next';
import { getDistance } from 'geolib';



interface neighborsProps {
graph:Graph;
node : Node
}


interface getSmalestProps {
    node :Node,
frontier : Node[],
hmap : []
}

interface idnameprops {
name :string
nodes : Node[]
}

interface hProps{
    node1: Node;
    node2: Node
}

interface nameidprops {
  id :number
  nodes : Node[]
  }

interface jariPropos
{
  nodeid : number
  edges : Edge[]
}
interface heuristicMapProps{
    Graph : Graph;
    endNode : Node;
}

interface hmapProp{
    node:Node;
    h : number
}


interface insertProp{
    hmap : hmapProp[];
    graph : Graph;
    currentNode : Node ;
}


interface costProp{

    current:Node;
    next:Node;
    graph:Graph
}

interface substractProp{
    neighbors :  Node[];
    alreadyvisted : Node[];
}



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
    


  
    // converter to the metre 
    // la7iha ida data ta3k ta5dam bl km
    return distance*1000
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
export const getCost  = ( {current,next,graph}:costProp)=>
    {
     const cost = graph.edges.find((edge)=>{
        if(edge.start === current.id &&  edge.destination === next.id)
        {
            return edge.distance
        }
    })
      return cost ? cost.distance : 0
    }


// calculate the cost for each nod in array and inser it in that node 

export const insertcost = ({graph,hmap,currentNode } : insertProp ) =>
{
    let nodesWithCost
    
    let nodes = graph.nodes

    

    


    hmap.find((tuple)=>{
        
        

         nodesWithCost = nodes.map((node)=>{
            if (tuple.node.id === node.id)
            {
                return node.cost= tuple.h + getCost({current:currentNode , next:node , graph} )
            }
           
        })

       
    })
    return nodesWithCost
    

}


export const subtractNodesArray   =  ({ neighbors, alreadyvisted }: substractProp) : Node[]   => 
{

    return neighbors.filter(node => !alreadyvisted.some(visited => node.id === visited.id));
}

