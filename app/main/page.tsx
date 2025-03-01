import React from 'react';
import RouteFinderContainer from '@/components/RouteFinderContainer';
import { getEdges, getNodes } from "@/app/utils/getData";
import { Node, Edge } from '@/app/types/graph';

export const dynamic = "force-dynamic";

export default function MainPage() {
  const nodes: Node[] = getNodes().nodes;
  const edges: Edge[] = getEdges().edges;
  
  console.log("wtf")

  return (
    <>
   
    <RouteFinderContainer nodes={nodes} edges={edges} />
    </>
  )

  ;
}