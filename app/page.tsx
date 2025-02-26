
import MapComponent from "@/componenets/map";
import {getEdges, getNodes } from "@/app/utils/getData"
import {GetNodeByName,GetNodeById ,h,getJari} from "@/app/utils/tools"

export const dynamic = "force-dynamic";




export default async function Home() {


  const nodes = getNodes().nodes
  const edges  = getEdges().edges
  
  console.log(getJari({nodeid : 1001,edges}))
  

  return (
    <>
      <MapComponent nodes={nodes} edges={edges} />
    </>
  );
}
