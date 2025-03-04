"use client"
import React, { useState } from 'react';
import MapComponent from "@/components/tp-comps/map";
import RouteSearch from '@/components/tp-comps/RouteSearch';
import { Node, Edge } from '@/app/types/graph';

interface RouteResult {
  path: Node[];
  exploredEdges: Edge[];
}

interface RouteFinderContainerProps {
  nodes: Node[];
  edges: Edge[];
}

const RouteFinderContainer: React.FC<RouteFinderContainerProps> = ({ nodes, edges }) => {
  const [routeResult, setRouteResult] = useState<RouteResult>({ path: [], exploredEdges: [] });
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handlePathFound = (result: RouteResult) => {
    setRouteResult(result);
 
    setHasSearched(true);
  };

  return (
    <div className="w-full h-full ">
      <div className="flex p-6 max-w-xl mx-auto flex-col absolute z-10">
        <RouteSearch nodes={nodes} edges={edges} onPathFound={handlePathFound} />
        {hasSearched && (
          <div className="text-white mt-2">
            {routeResult.path.length > 0 ? (
              <div>
                <p className="mb-2 font-bold text-[20px]">
                  {routeResult.path.map(node => node.name).join(' → ')}
                </p>
                <p>
                  <span className="font-medium">Total cities:</span> {routeResult.path.length}
                </p>
              </div>
            ) : (
              <p className="text-orange-600">No path could be found between these cities.</p>
            )}
          </div>
        )}
      </div>
      <div className="h-[93.5vh] bg-white shadow-lg overflow-hidden">
        <MapComponent 
          nodes={nodes} 
          edges={edges} 
          path={routeResult.path} 
          exploredEdges={routeResult.exploredEdges} 
        />
      </div>
    </div>
  );
};

export default RouteFinderContainer;
