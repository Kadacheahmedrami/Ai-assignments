export interface Node {
  id: number;           // Changed to a number to match the sample data
  name: string;
  lat: number;
  lon: number;
  nodeType: string;
  isSettlement: boolean;
  population: number;
}

  
export interface Edge {
  start: number;
  destination: number;
}



  interface Graph {
    nodes: Node[];
    edges: Edge[];
  }
  