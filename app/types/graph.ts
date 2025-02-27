export interface Node {
  id: number;      
  name: string;
  lat: number;
  lon: number;
  nodeType: string;
  isSettlement: boolean;
  population: number;
  parent : Node   // parent that generated this node to do back tracking look it up at cs50 
  cost :number
}

  
export interface Edge {
  start: number;
  destination: number;
}


export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

  