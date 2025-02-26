  export interface Node {
    id: string;
    lat: number;
    lon: number;
  }
  
  export interface Edge {
    start: string;
    destination: string;
  }



  interface Graph {
    nodes: Node[];
    edges: Edge[];
  }
  