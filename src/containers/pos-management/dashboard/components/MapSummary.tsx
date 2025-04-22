import OpenLayersMap from "@/components/OpenLayersMap";
import { Card } from "antd";
import { ILocationMarker } from "@/core/domain/dashboard";

const MapSummary = ({ locations }: { locations: ILocationMarker[] }) => {
  return (
    <Card title="Teminal" variant="borderless">
      <OpenLayersMap locations={locations} initialZoom={13} centerOn={0} />
    </Card>
  );
};

export default MapSummary;
