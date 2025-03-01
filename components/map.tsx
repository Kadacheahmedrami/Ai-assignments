"use client";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection, Feature, Point, LineString, GeoJsonProperties } from "geojson";
import { Node, Edge } from "@/app/types/graph";

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MapProps {
  nodes: Node[];
  edges: Edge[];
  path?: Node[]; // A* path
}

const MapComponent: React.FC<MapProps> = ({ nodes, edges, path }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [-90, 30],
      zoom: 0.5,
      projection: "globe"
    });

    // Fetch a route between two nodes using Mapbox Directions API
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

    map.on("load", () => {
      // Smooth zoom animation from far out to Algeria over 3 seconds
      map.easeTo({
        center: [3.042048, 30.752887],
        zoom: 5,
        duration: 3000,
      });

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

      map.addSource("nodes", { type: "geojson", data: nodesGeojson });
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
          "text-color": "#FFFFFF",
        },
      });

      // --- Edges as roads ---
      const loadEdges = async () => {
        const edgeFeatures = await Promise.all(
          edges.map(async (edge) => {
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
                } as Feature<LineString, { start: number; destination: number }>;
              }
            }
            return null;
          })
        );

        const validEdgeFeatures = edgeFeatures.filter(
          (feature): feature is Feature<LineString, { start: number; destination: number }> =>
            feature !== null
        );

        if (validEdgeFeatures.length > 0) {
          const edgesGeojson: FeatureCollection<LineString, { start: number; destination: number }> = {
            type: "FeatureCollection",
            features: validEdgeFeatures,
          };

          map.addSource("edges", { type: "geojson", data: edgesGeojson });
          map.addLayer({
            id: "edges-layer",
            type: "line",
            source: "edges",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#888", "line-width": 4 },
          });
        }
      };

      loadEdges();

      // --- A* Path Animation ---
      if (path && path.length > 0) {
        // Helper: Fetch and combine coordinates for the entire path
        const getPathCoordinates = async (): Promise<number[][]> => {
          let allCoordinates: number[][] = [];
          for (let i = 0; i < path.length - 1; i++) {
            const startNode = path[i];
            const destNode = path[i + 1];
            const routeGeom = await fetchRoute(startNode, destNode);
            if (routeGeom) {
              // Avoid duplicating coordinates where segments connect
              allCoordinates = allCoordinates.concat(
                i === 0 ? routeGeom.coordinates : routeGeom.coordinates.slice(1)
              );
            }
          }
          return allCoordinates;
        };

        (async () => {
          const coordinates = await getPathCoordinates();
          if (!coordinates.length) return;

          // Create initial A* path source with the first coordinate
          const initialGeojson: FeatureCollection<LineString, GeoJsonProperties> = {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [coordinates[0]],
              },
              properties: {},
            }],
          };

          map.addSource("astarPath", { type: "geojson", data: initialGeojson });
          map.addLayer({
            id: "astarPathLayer",
            type: "line",
            source: "astarPath",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "#00FF00",
              "line-width": 4,
              "line-opacity": 0.8,
            },
          });

          // Enhanced, time-based animation using an easing function
          const duration = 3000; // duration in milliseconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            let progress = (currentTime - startTime) / duration;
            progress = Math.min(progress, 1);

            // Ease-in-out function for smoother animation
            const easeInOutQuad = (t: number) =>
              t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const easedProgress = easeInOutQuad(progress);

            const numPoints = Math.floor(easedProgress * coordinates.length) || 1;
            const animatedCoordinates = coordinates.slice(0, numPoints);

            const animatedGeojson: FeatureCollection<LineString, GeoJsonProperties> = {
              type: "FeatureCollection",
              features: [{
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: animatedCoordinates,
                },
                properties: {},
              }],
            };

            (map.getSource("astarPath") as mapboxgl.GeoJSONSource).setData(animatedGeojson);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        })();
      }
    });

    return () => map.remove();
  }, [nodes, edges, path]);

  return (
    <>
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{
          width: "100%",
          height: "100vh",
          animation: "fadeInZoom 3s ease-out",
          borderRadius: "10px",
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
          overflow: "hidden",
        }}
      />
   
    </>
  );
};

export default MapComponent;
