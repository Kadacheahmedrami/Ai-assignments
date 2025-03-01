import React from 'react';
import Image from 'next/image';
import RouteFinderContainer from '@/components/RouteFinderContainer';
import { getEdges, getNodes } from "@/app/utils/getData";
import { Node, Edge } from '@/app/types/graph';

export const dynamic = "force-dynamic";

export default function MainPage() {
  const nodes: Node[] = getNodes().nodes;
  const edges: Edge[] = getEdges().edges;
  
  console.log("wtf");

  return (
    <>
      <div className="w-full md:w-[86.5%] h-[94vh] absolute bg-black">
        <Image 
          src="/wall.jpg" 
          alt="Background" 
          fill 
          style={{ objectFit: "cover" }} 
          quality={100}
        />
      </div>
      <RouteFinderContainer nodes={nodes} edges={edges} />
    </>
  );
}
