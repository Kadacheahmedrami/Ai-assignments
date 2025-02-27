

import {Edge,Node, Graph} from '@/app/types/graph'

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
    nodes : Node[]
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
    const location1 = { lon : node1.lon ,lat :node1.lat}
    const location2 = { lon : node2.lon ,lat :node2.lat}
    const x = Math.abs(location1.lon - location2.lon )
  
    const y = Math.abs(location1.lat - location2.lat)
  
    const dist = Math.sqrt((x*x)+(y*y))
    return dist
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



// calculate the cost for each nod in array and inser it in that node 

export const insertcost = ({nodes,hmap} : insertProp ) =>
{
    let nodesWithCost
    hmap.find((tuple)=>{
        
        

         nodesWithCost = nodes.map((node)=>{
            if (tuple.node.id = node.id)
            {
                return node.cost= tuple.h
            }
           
        })

       
    })
    return nodesWithCost
    

}