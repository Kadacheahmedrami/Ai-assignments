import React from 'react';
import Image from 'next/image';
import RouteFinderContainer from '@/components/tp-comps/RouteFinderContainer';
import { getEdges, getNodes } from "@/app/utils/getData";
import { Node, Edge } from '@/app/types/graph';

export const dynamic = "force-dynamic";

export default function MainPage() {
  const nodes: Node[] = getNodes().nodes;
  const edges: Edge[] = getEdges().edges;
  
  console.log("wtf");

  return (
    <>
      <div className="w-full lg:w-[86.1%] h-[92.1%] overflow-hidden absolute bg-black">
        <Image 
          src="/wall.jpg" 
          alt="Background" 
          fill 
          style={{ objectFit: "fill" }} 
          quality={100}
        />
           <RouteFinderContainer nodes={nodes} edges={edges} />
      </div>  
   
    </>
  );
}
