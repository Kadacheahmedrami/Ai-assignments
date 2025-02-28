import MapComponent from "@/componenets/map";
import { getEdges, getNodes } from "@/app/utils/getData";
import { aStar } from "@/app/utils/astar";
import {Node} from '@/app/types/graph'

export const dynamic = "force-dynamic";

export default async function Home() {
  const nodes = getNodes().nodes;
  const edges = getEdges().edges;

  // Run A* search from "Algiers" to "Batna"
  const result = aStar({ graph: { nodes, edges }, start: "Algiers", goal: "Biskra" });
  const path = result?.path; // This is your array of nodes
  console.log(path)
  return (
    <>

      <MapComponent nodes={nodes} edges={edges} path={path} />
    </>
  );
}
