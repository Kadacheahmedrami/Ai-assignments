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



class agent {
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

 
    // slect a node from the frontier
    const selectedNode = <Node>{}

    this.node = selectedNode
    frontier = frontier.filter(node => node !== this.node)
    
    }


}