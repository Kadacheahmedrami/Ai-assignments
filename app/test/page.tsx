
import {getEdges, getNodes } from "@/app/utils/getData"
import {aStar} from '@/app/utils/astar'
import path from "path";
export const dynamic = "force-dynamic";




export default async function Home() {


  const nodes =  getNodes().nodes
  const edges  =  getEdges().edges


  const result = aStar({graph:{nodes,edges},start:"Algiers",goal:"Tamanrasset"})
    result?.path.map((p)=>{
       console.log( p)
    })
    console.log(result?.cost)
  return (
    <>
  
    </>
  );
}
