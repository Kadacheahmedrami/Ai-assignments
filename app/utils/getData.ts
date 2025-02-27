import fs from "fs";
import path from "path";



 




export const getNodes = () =>
{
    const nodespath = path.join(process.cwd(), "public", "nodes.json");
    const nodesData = fs.readFileSync(nodespath, "utf8");
    const nodes = JSON.parse(nodesData);
    return nodes
}


export const getEdges = () =>
    {    
        const edgespath = path.join(process.cwd(), "public", "edges.json");
        const edgesData = fs.readFileSync(edgespath, "utf8");
        const edges = JSON.parse(edgesData);
        return edges
    }
