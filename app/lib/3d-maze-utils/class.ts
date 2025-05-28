import {Node,Graph} from '@/app/types/graph'
import {neighbors } from '@/app/lib/3d-maze-utils/tools'
import {neighborsProps,moveProps} from '@/app/lib/3d-maze-utils/interfaces'


export class Agent {

    currentCost : number ;
    node : Node  ;
    graph : Graph ;

    neighbors = () =>{
        return neighbors({graph :this.graph,node :this.node,currentCost: this.currentCost})
    }

    move = ({frontier}:moveProps) =>
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
    
    if(!selectedNode)
    {
        return frontier;
    }

    // agent t7araak lnode jdiid aka updatinah
    this.node = selectedNode
    // sauvgarder the cost
    this.currentCost = min

    return frontier.filter(node => node !== this.node)
    }



    constructor ({graph, node,currentCost}:neighborsProps)
    {
        this.graph = graph;
        this.node  = node;
        this.currentCost = currentCost;
        
    }


}