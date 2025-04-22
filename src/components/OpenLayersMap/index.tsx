// OpenLayersMap.tsx
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import Overlay from "ol/Overlay";

// Define types
export interface LocationMarker {
  lat: number;
  long: number;
  merchant_name: string;
  machine_name: string;
}

interface OpenLayersMapProps {
  locations: LocationMarker[];
  initialZoom?: number;
  centerOn?: number;
}

const OpenLayersMap: React.FC<OpenLayersMapProps> = ({
  locations = [],
  initialZoom = 12,
  centerOn = 0,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationMarker | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Create a base map regardless of locations
  useEffect(() => {
    if (!mapRef.current) return;
    
    try {
      console.log("Initializing map...");
      
      // Create a basic map even without locations
      const initialMap = new Map({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([0, 0]), // Default center
          zoom: initialZoom,
        }),
      });

      // Create vector source and layer for markers
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      initialMap.addLayer(vectorLayer);
      
      // Add popup overlay if it exists
      if (popupRef.current) {
        const popup = new Overlay({
          element: popupRef.current,
          positioning: "bottom-center",
          stopEvent: false,
          offset: [0, -10],
        });
        initialMap.addOverlay(popup);
      }
      
      // Add click handler for features
      initialMap.on("click", (evt) => {
        const feature = initialMap.forEachFeatureAtPixel(
          evt.pixel,
          (feature) => feature
        );

        if (feature) {
          const locationData = feature.get("locationData") as LocationMarker;
          if (locationData) {
            const coordinates = (feature.getGeometry() as Point).getCoordinates();
            const popup = initialMap.getOverlays().getArray()[0];
            popup.setPosition(coordinates);
            setSelectedLocation(locationData);
          }
        } else {
          const popup = initialMap.getOverlays().getArray()[0];
          popup.setPosition(undefined);
          setSelectedLocation(null);
        }
      });

      // Change cursor on hover
      initialMap.on("pointermove", (e) => {
        const hit = initialMap.hasFeatureAtPixel(e.pixel);
        initialMap.getViewport().style.cursor = hit ? "pointer" : "";
      });

      setMap(initialMap);
      console.log("Map initialized successfully");
      
      // Clean up on unmount
      return () => {
        console.log("Cleaning up map");
        initialMap.setTarget("");
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(`Map initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [initialZoom]); // Only depends on initialZoom, not locations

  // Update markers when locations or map changes
  useEffect(() => {
    if (!map) return;
    
    try {
      console.log("Updating map with locations:", locations);
      
      // Get vector layer
      const vectorLayer = map.getLayers().getArray()[1] as VectorLayer<VectorSource>;
      const vectorSource = vectorLayer.getSource() as VectorSource;

      // Clear existing features
      vectorSource.clear();

      // Skip if no locations
      if (locations.length === 0) {
        console.log("No locations to display");
        return;
      }

      // Use a relative path based on base URL
      const iconPath = new URL('/assets/images/ldb_logo.png', window.location.origin).href;
      console.log("Using icon path:", iconPath);
      
      // Add new features
      const features = locations.map((location, index) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([location.long, location.lat])),
          locationData: location,
          id: index,
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              src: iconPath,
              scale: 0.07,
              anchor: [0.5, 1],
              // Add crossOrigin if needed
              crossOrigin: 'anonymous'
            }),
          })
        );

        return feature;
      });

      vectorSource.addFeatures(features);

      // Center the map on the first location (or specified centerOn index)
      const center = locations[centerOn] || locations[0];
      map.getView().animate({
        center: fromLonLat([center.long, center.lat]),
        duration: 1000,
      });
      
      console.log("Map updated with markers");
    } catch (error) {
      console.error("Error updating map markers:", error);
      setMapError(`Failed to update map markers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [map, locations, centerOn]);

  // Force map resize when container might change size
  useEffect(() => {
    if (!map) return;
    
    const resizeObserver = new ResizeObserver(() => {
      map.updateSize();
    });
    
    if (mapRef.current) {
      resizeObserver.observe(mapRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full">
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10 p-4 text-red-600">
            {mapError}
          </div>
        )}
        {!map && !mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            Loading map...
          </div>
        )}
        <div
          ref={mapRef}
          className="w-full border border-gray-300 rounded-lg shadow-md"
          style={{
            width: "100%",
            height: "400px",
            position: "relative",
            overflow: "hidden",
            display: "block",
          }}
        />

        {/* Popup overlay */}
        <div
          ref={popupRef}
          className="absolute"
          style={{
            background: "white",
            color: "black",
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            pointerEvents: "none",
            transition: "opacity 0.3s",
            opacity: selectedLocation ? 1 : 0,
            visibility: selectedLocation ? "visible" : "hidden",
            display: selectedLocation ? "block" : "none",
            zIndex: 1000,
          }}
        >
          {selectedLocation && (
            <>
              <h3 className="font-bold text-lg mb-1">
                {selectedLocation.merchant_name}
              </h3>
              <p className="mb-1">Machine: {selectedLocation.machine_name}</p>
              <p className="text-xs text-gray-600">
                Position: [{selectedLocation.lat.toFixed(6)},{" "}
                {selectedLocation.long.toFixed(6)}]
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenLayersMap;