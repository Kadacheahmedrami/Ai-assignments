
import {aStar} from "@/app/utils/3d-maze-utils/astar"
import {getEdges,getNodes} from "@/app/utils/3d-maze-utils/getData"



export default function Home() {
    const nodes = getNodes().nodes
    const edges = getEdges().edges

    
    const result = aStar({graph : {nodes,edges} , start:"Oran" , goal:"Adrar"})
    console.log(result)
  return (

  <></>
  
  )
}

