
import {aStar} from "@/app/utils/tp01Utils/astar"
import {getEdges,getNodes} from "@/app/utils/tp01Utils/getData"


export default function Home() {
    const nodes = getNodes().nodes
    const edges = getEdges().edges

    const result = aStar({graph : {nodes,edges} , start:"Batna" , goal:"Mostaganem"})
    console.log(result)
  return (

  <></>
  
  )
}

