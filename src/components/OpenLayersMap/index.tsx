// OpenLayersMap.tsx
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon, Circle, Fill, Stroke } from "ol/style";
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
  const mapElement = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationMarker | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Create a base map on first render
  useEffect(() => {
    if (!mapRef.current) {
      setDebugInfo("Map container ref is null");
      return;
    }

    try {
      mapElement.current = mapRef.current;
      setDebugInfo("Map container found, initializing...");

      const osmSource = new OSM({
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        crossOrigin: "anonymous",
        attributions: [],
      });

      const xyzSource = new XYZ({
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        crossOrigin: "anonymous",
        attributions: [],
      });

      const tileLayer = new TileLayer({
        source: osmSource,
        visible: true,
      });

      const backupTileLayer = new TileLayer({
        source: xyzSource,
        visible: false,
      });

      const initialCenter =
        locations.length > 0 ? [locations[0].long, locations[0].lat] : [0, 0];

      const initialMap = new Map({
        target: mapElement.current,
        layers: [tileLayer, backupTileLayer],
        view: new View({
          center: fromLonLat(initialCenter),
          zoom: initialZoom,
          constrainResolution: true,
        }),
        controls: [],
      });

      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 10,
      });
      initialMap.addLayer(vectorLayer);

      if (popupRef.current) {
        const popup = new Overlay({
          element: popupRef.current,
          positioning: "bottom-center",
          stopEvent: false,
          offset: [0, -10],
        });
        initialMap.addOverlay(popup);
      }

      initialMap.on("click", (evt) => {
        const feature = initialMap.forEachFeatureAtPixel(evt.pixel, (f) => f);
        const popup = initialMap.getOverlays().getArray()[0];

        if (feature) {
          const locationData = feature.get("locationData") as LocationMarker;
          if (locationData) {
            const coordinates = (
              feature.getGeometry() as Point
            ).getCoordinates();
            popup.setPosition(coordinates);
            setSelectedLocation(locationData);
          }
        } else {
          popup.setPosition(undefined);
          setSelectedLocation(null);
        }
      });

      initialMap.on("pointermove", (e) => {
        const hit = initialMap.hasFeatureAtPixel(e.pixel);
        if (initialMap.getViewport()) {
          initialMap.getViewport().style.cursor = hit ? "pointer" : "";
        }
      });

      tileLayer.getSource()?.on("tileloaderror", () => {
        setDebugInfo("Primary tile source failed, trying backup");
        tileLayer.setVisible(false);
        backupTileLayer.setVisible(true);
      });

      setMap(initialMap);
      setDebugInfo("Map initialized successfully");

      if (locations.length > 0) {
        updateMapMarkers(initialMap, locations, centerOn);
      }

      setTimeout(() => {
        initialMap.updateSize();
      }, 200);

      return () => {
        setDebugInfo("Cleaning up map");
        if (initialMap) {
          initialMap.setTarget("");
        }
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error initializing map:", error);
      setMapError(`Map initialization failed: ${errorMessage}`);
      setDebugInfo(`Error: ${errorMessage}`);
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    try {
      updateMapMarkers(map, locations, centerOn);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error updating markers:", error);
      setMapError(`Failed to update markers: ${errorMessage}`);
    }
  }, [locations, centerOn]);

  useEffect(() => {
    if (!map) return;

    const handleResize = () => {
      map.updateSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  const updateMapMarkers = (
    mapInstance: Map,
    locs: LocationMarker[],
    centerIdx: number
  ) => {
    const vectorLayer = mapInstance
      .getLayers()
      .getArray()[2] as VectorLayer<VectorSource>;
    const vectorSource = vectorLayer.getSource() as VectorSource;

    vectorSource.clear();

    if (locs.length === 0) {
      setDebugInfo("No locations to display on map");
      return;
    }

    setDebugInfo(`Updating ${locs.length} locations on map`);

    const features = locs.map((location, index) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([location.long, location.lat])),
        locationData: location,
        id: index,
      });

      try {
        feature.setStyle(
          new Style({
            image: new Icon({
              src: "/assets/images/ldb_logo.png",
              scale: 0.07,
              anchor: [0.5, 1],
              crossOrigin: "anonymous",
            }),
          })
        );
      } catch (e) {
        console.log('e', e);
        feature.setStyle(
          new Style({
            image: new Circle({
              radius: 8,
              fill: new Fill({ color: "#1980C7" }),
              stroke: new Stroke({ color: "white", width: 2 }),
            }),
          })
        );
      }

      return feature;
    });

    vectorSource.addFeatures(features);

    if (locs.length > 0) {
      const center = locs[centerIdx] || locs[0];

      mapInstance.getView().animate({
        center: fromLonLat([center.long, center.lat]),
        duration: 500,
        zoom: initialZoom,
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-blue-50 p-2 w-full text-xs mb-2">
        Status: {debugInfo}
      </div>

      <div className="relative w-full">
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-20 p-4 text-red-600">
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
          data-testid="map-container"
        />

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
