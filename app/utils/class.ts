import {Node,Edge,Graph} from '@/app/types/graph'
import {neighbors } from '@/app/utils/tools'



interface neighborsProps {
    graph:Graph;
    node : Node
   }




interface moveProps {
 
    frontier:Node[];
    used : Node[]
   }



export class Agent {
    constructor ({graph, node}:neighborsProps)
    {
        this.graph = graph;
        this.node  = node;
        
    }


    node : Node  ;
    graph : Graph ;
  
    neighbors = () =>{
        return neighbors({graph :this.graph,node :this.node})
    }


    move = ({frontier,used}:moveProps) =>
    {
    
        
    let selectedNode = <Node>{}
    let min = Infinity
     

    frontier.map((node)=>{
    if(min > node.cost )
    {
        min =  node.cost
        selectedNode = node
    }
    })

  
    selectedNode.parent = this.node
    
    this.node = selectedNode
    frontier = frontier.filter(node => node !== this.node)
    
    }


}