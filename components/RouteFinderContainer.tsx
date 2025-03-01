"use client"
import React, { useState } from 'react';
import MapComponent from "@/components/map";
import RouteSearch from '@/components/RouteSearch';
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
    <div className="w-full h-full">
     
      <div className='flex flex-row absolute  z-10  '>
      <RouteSearch 
        nodes={nodes} 
        edges={edges} 
        onPathFound={handlePathFound} 
      />
      
      {hasSearched && (
        <div className="">
          <h2 className="text-xl font-semibold  mb-2">Route Information</h2>
          {path.length > 0 ? (
            <div>
              <p className="mb-2">
                <span className="font-medium">Path found:</span> {path.map(node => node.name).join(' → ')}
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
      
      
      <div className="h-[93.5vh] bg-white rounded-lg shadow-lg overflow-hidden">
        <MapComponent nodes={nodes} edges={edges} path={path} />
      </div>
    </div>
  );
};

export default RouteFinderContainer;