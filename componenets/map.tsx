"use client"
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection, Feature, LineString } from "geojson";
import { Node, Edge } from "@/app/types/graph";

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MapProps {
  nodes: Node[];
  edges: Edge[];
}

const MapComponent: React.FC<MapProps> = ({ nodes, edges }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.042048, 36.752887], // Centered on Algiers by default [lon, lat]
      zoom: 6,
    });

    map.on("load", () => {
      // Convert edge data to GeoJSON features
      const features: Feature<LineString>[] = edges
        .map((edge) => {
          const startNode = nodes.find((node) => node.id === edge.start);
          const destNode = nodes.find((node) => node.id === edge.destination);
          if (startNode && destNode) {
            return {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [startNode.lon, startNode.lat],
                  [destNode.lon, destNode.lat],
                ],
              },
              properties: {
                start: edge.start,
                destination: edge.destination,
              },
            } as Feature<LineString>; // Explicitly define the feature type
          }
          return null;
        })
        .filter((feature): feature is Feature<LineString> => feature !== null);

      // Explicitly type geojsonData
      const geojsonData: FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: features,
      };

      // Add a new source from our GeoJSON data and set the 'routes' layer to use this source.
      map.addSource("routes", {
        type: "geojson",
        data: geojsonData, // ✅ Now correctly typed
      });

      map.addLayer({
        id: "routes-layer",
        type: "line",
        source: "routes",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 4,
        },
      });
    });

    // Clean up on unmount
    return () => map.remove();
  }, [nodes, edges]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />;
};

export default MapComponent;
