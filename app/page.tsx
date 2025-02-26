import fs from "fs";
import path from "path";
import MapComponent from "@/componenets/map";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function Home() {
  // Read JSON from the public folder using the filesystem
  const nodespath = path.join(process.cwd(), "public", "nodes.json");
  const edgespath = path.join(process.cwd(), "public", "edges.json");
  const nodesData = fs.readFileSync(nodespath, "utf8");
  const edgesData = fs.readFileSync(edgespath, "utf8");

  const nodes = JSON.parse(nodesData);
  const edges = JSON.parse(edgesData);

  return (
    <>
      <MapComponent nodes={nodes.nodes} edges={edges.edges} />
    </>
  );
}
