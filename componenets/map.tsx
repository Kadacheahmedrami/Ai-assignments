"use client"
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection, Feature, Point, LineString } from "geojson";
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
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.042048, 36.752887],
      zoom: 6,
    });

    map.on("load", () => {
      // --- Nodes ---
      const nodeFeatures: Feature<Point>[] = nodes.map((node) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [node.lon, node.lat],
        },
        properties: {
          id: node.id,
          name: node.name,
          nodeType: node.nodeType,
          population: node.population,
        },
      }));

      const nodesGeojson: FeatureCollection<Point> = {
        type: "FeatureCollection",
        features: nodeFeatures,
      };

      map.addSource("nodes", {
        type: "geojson",
        data: nodesGeojson,
      });

      // Node circles
      map.addLayer({
        id: "nodes-layer",
        type: "circle",
        source: "nodes",
        paint: {
          "circle-radius": 6,
          "circle-color": "#FF5733",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#FFFFFF",
        },
      });

      // Node labels
      map.addLayer({
        id: "node-labels",
        type: "symbol",
        source: "nodes",
        layout: {
          "text-field": [
            "concat",
            "Name: ", ["get", "name"], "\n",
            "Type: ", ["get", "nodeType"], "\n",
            "ID: ", ["get", "id"], "\n",
            "Population: ", ["get", "population"]
          ],
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 12,
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#000000",
        },
      });

      // --- Edges as roads ---
      // Function to fetch a route following roads using the Mapbox Directions API
      const fetchRoute = async (start: Node, dest: Node): Promise<LineString | null> => {
        const query = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lon},${start.lat};${dest.lon},${dest.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
        try {
          const response = await fetch(query);
          const data = await response.json();
          if (data.routes && data.routes.length > 0) {
            return data.routes[0].geometry;
          }
          return null;
        } catch (error) {
          console.error("Error fetching route:", error);
          return null;
        }
      };

      // Load edge features that follow roads
      const loadEdges = async () => {
        const edgeFeatures = await Promise.all(
          edges.map(async (edge) => {
            // Match nodes by id (both stored as numbers)
            const startNode = nodes.find((node) => node.id === edge.start);
            const destNode = nodes.find((node) => node.id === edge.destination);
            if (startNode && destNode) {
              const routeGeometry = await fetchRoute(startNode, destNode);
              if (routeGeometry) {
                return {
                    type: "Feature",
                    geometry: routeGeometry,
                    properties: {
                        start: edge.start,
                        destination: edge.destination,
                    },
                } as unknown as Feature<LineString, { start: number; destination: number }>;
              }
            }
            return null;
          })
        );

        // Filter out any null features
        const validEdgeFeatures = edgeFeatures.filter(
          (feature): feature is Feature<LineString, { start: number; destination: number }> =>
            feature !== null
        );

        if (validEdgeFeatures.length > 0) {
          const edgesGeojson: FeatureCollection<LineString, { start: number; destination: number }> = {
            type: "FeatureCollection",
            features: validEdgeFeatures,
          };

          map.addSource("edges", {
            type: "geojson",
            data: edgesGeojson,
          });

          map.addLayer({
            id: "edges-layer",
            type: "line",
            source: "edges",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#888",
              "line-width": 4,
            },
          });
        }
      };

      loadEdges();
    });

    return () => map.remove();
  }, [nodes, edges]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;
