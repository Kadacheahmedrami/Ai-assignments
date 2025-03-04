import { Graph,Node ,Edge} from "../../types/graph";

export interface neighborsProps {
    graph:Graph;
    node : Node
    }
    
    
    export interface getSmalestProps {
        node :Node,
    frontier : Node[],
    hmap : []
    }
    
    export interface idnameprops {
    name :string
    nodes : Node[]
    }
    
    export interface hProps{
        node1: Node;
        node2: Node
    }
    
    export interface nameidprops {
      id :number
      nodes : Node[]
      }
    
    export interface jariPropos
    {
      nodeid : number
      edges : Edge[]
    }
    export interface heuristicMapProps{
        Graph : Graph;
        endNode : Node;
    }
    
    export interface hmapProp{
        node:Node;
        h : number
    }
    
    
    export interface insertProp{
        hmap : hmapProp[];
        graph : Graph;
        currentNode : Node ;
        currentCost:number
    }
    
    
    export interface costProp{
    
        current:Node;
        next:Node;
        graph:Graph;
        currentCost:number
    }
    
    export interface substractProp{
        neighbors :  Node[];
        alreadyvisted : Node[];
        
    }



export interface neighborsProps {
    graph:Graph;
    node : Node
    currentCost: number
   }


export interface moveProps {
 
    frontier:Node[];

   }
