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
  const [selectedLocation, setSelectedLocation] =
    useState<LocationMarker | null>(null);

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current || !popupRef.current || locations.length === 0) return;

    // Create markers for all locations
    const features = locations.map((location, index) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([location.long, location.lat])),
        locationData: location,
        id: index,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: "/assets/images/ldb_logo.png",
            scale: 0.07,
            anchor: [0.5, 1],
          }),
          // image: new Circle({
          //   radius: 8,
          //   fill: new Fill({ color: "#1980C7" }),
          //   stroke: new Stroke({ color: "white", width: 2 }),
          //   scale: 1.5,
          // }),
          // text: new Text({
          //   text: (index + 1).toString(),
          //   fill: new Fill({ color: "#fff" }),
          //   font: "bold 12px Arial",
          //   offsetY: 1,
          // }),
        })
      );

      return feature;
    });

    const vectorSource = new VectorSource({
      features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Create popup overlay
    const popup = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -10],
    });

    // Create map
    const initialCenter = locations[centerOn] || locations[0];
    const initialMap = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      overlays: [popup],
      view: new View({
        center: fromLonLat([initialCenter.long, initialCenter.lat]),
        zoom: initialZoom,
      }),
    });

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
          popup.setPosition(coordinates);
          setSelectedLocation(locationData);
        }
      } else {
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

    // Clean up on unmount
    return () => {
      if (initialMap) {
        initialMap.setTarget("");
      }
    };
  }, [locations]);

  // Update markers when locations change
  useEffect(() => {
    if (!map) return;

    const vectorLayer = map
      .getLayers()
      .getArray()[1] as VectorLayer<VectorSource>;
    const vectorSource = vectorLayer.getSource() as VectorSource;

    // Clear existing features
    vectorSource.clear();

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
            src: "/assets/images/ldb_logo.png",
            scale: 0.07,
            anchor: [0.5, 1],
          }),
        })
      );

      return feature;
    });

    vectorSource.addFeatures(features);

    // Center the map if we have at least one location
    if (locations.length > 0) {
      const center = locations[0];
      map.getView().animate({
        center: fromLonLat([center.long, center.lat]),
        duration: 1000,
      });
    }
  }, [map, locations]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full">
        <div
          ref={mapRef}
          className="w-full border border-gray-300 rounded-lg shadow-md"
          style={{
            width: "100%",
            height: "400px",
            position: "relative", // Ensure proper stacking context
            overflow: "hidden", // Prevent any overflow issues
            display: "block", // Force block display
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
