"use client"
import React, { useState } from 'react';
import MapComponent from "@/components/tp-comps/map";
import RouteSearch from '@/components/tp-comps/RouteSearch';
import { Node, Edge } from '@/app/types/graph';

interface RouteFinderContainerProps {
  nodes: Node[];
  edges: Edge[];
}

const RouteFinderContainer: React.FC<RouteFinderContainerProps> = ({ nodes, edges }) => {
  const [path, setPath] = useState<Node[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handlePathFound = (foundPath: Node[]) => {
    setPath(foundPath);
    setHasSearched(true);
  };

  return (
    <div className="w-full h-full ">
      <div className="flex p-6 max-w-xl mx-auto flex-col absolute z-10">
        <RouteSearch nodes={nodes} edges={edges} onPathFound={handlePathFound} />
        {hasSearched && (
          <div className="text-white mt-2">
            {path.length > 0 ? (
              <div>
                <p className="mb-2 font-bold text-[20px]">
                  {path.map(node => node.name).join(' → ')}
                </p>
                <p>
                  <span className="font-medium">Total cities:</span> {path.length}
                </p>
              </div>
            ) : (
              <p className="text-orange-600">No path could be found between these cities.</p>
            )}
          </div>
        )}
      </div>
      <div className="h-[93.5vh] bg-white  shadow-lg overflow-hidden">
        <MapComponent nodes={nodes} edges={edges} path={path} />
      </div>
    </div>
  );
};

export default RouteFinderContainer;
