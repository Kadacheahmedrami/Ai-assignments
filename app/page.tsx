
import MapComponent from "@/componenets/map";
import {getEdges, getNodes } from "@/app/utils/getData"
import {GetNodeByName,GetNodeById ,heuristicMap,getJari, insertcost, neighbors} from "@/app/utils/tools"
import {Agent} from '@/app/utils/class'
import {aStar} from  '@/app/utils/astar'

export const dynamic = "force-dynamic";




export default async function Home() {


  const nodes =  getNodes().nodes
  const edges  =  getEdges().edges


  // aStar({graph:{nodes,edges},start:"Algiers",goal:"Oran"})




  // function you give it array o nodes and it return the array of nodes and it insert an 

  // const frontier = insertcost({graph :{nodes :neighbors, edges} , hmap , currentNode :agent.node})
  // console.log(agent.node)
  // console.log(agent.node)
  // agent.move({frontier: neighbors ,used: usednodes })
  // console.log(agent.node)
  // console.log(agent.node)


  // console.log(heuristicMap({Graph : {nodes,edges} , endNode : GetNodeById({id:1001,nodes})! }))

  // console.log(neighbors({graph: {nodes,edges} , node:GetNodeById({id: 1001,nodes})!}) )
 
  return (
    <>
      <MapComponent nodes={nodes} edges={edges} />
    </>
  );
}
