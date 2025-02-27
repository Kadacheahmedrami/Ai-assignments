
import MapComponent from "@/componenets/map";
import {getEdges, getNodes } from "@/app/utils/getData"
import {GetIdByName} from "@/app/utils/astar"
// Force dynamic rendering
export const dynamic = "force-dynamic";




export default async function Home() {
  // Read JSON from the public folder using the filesystem


  const nodes = getNodes().nodes
  const edges  = getEdges().edges
  

  

  return (
    <>
      <MapComponent nodes={nodes} edges={edges} />
    </>
  );
}
