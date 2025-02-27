
import MapComponent from "@/componenets/map";
import {getEdges, getNodes } from "@/app/utils/getData"
import {GetNodeByName,GetNodeById ,heuristicMap,getJari, insertcost, neighbors} from "@/app/utils/tools"
import {Agent} from '@/app/utils/class'


export const dynamic = "force-dynamic";




export default async function Home() {


  const nodes =  getNodes().nodes
  const edges  =  getEdges().edges



  let agent = new Agent({graph:{nodes,edges},node: GetNodeById({id:1001,nodes})!})
  


  let neighbors = agent.neighbors()
  let usednodes = [agent.node]

  const hmap = heuristicMap({Graph : {nodes,edges} , endNode : GetNodeById({id:1001,nodes})! })

  // function you give it array o nodes and it return the array of nodes and it insert an 

  const frontier = insertcost({nodes :neighbors,hmap})
  console.log(agent.node)
  agent.move({frontier: neighbors ,used: usednodes })
  console.log(agent.node)


  // console.log(heuristicMap({Graph : {nodes,edges} , endNode : GetNodeById({id:1001,nodes})! }))

  // console.log(neighbors({graph: {nodes,edges} , node:GetNodeById({id: 1001,nodes})!}) )

  return (
    <>
      <MapComponent nodes={nodes} edges={edges} />
    </>
  );
}
