import { Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import MapSummary from "./components/MapSummary";
import { ILocationMarker } from "@/core/domain/dashboard";
import InfoSummary from "./components/InfoSummary";
import TransactionChart from "./components/TransactionChart";
import RankingTransaction from "./components/RankingTransaction";
import { api } from "@/utils/fetchHelper";

const DashboardContainer = () => {
  const [locations, setLocations] = useState<ILocationMarker[]>([]);
  const [data, setData] = useState<any>(null);
  console.log('data', data);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("/todos", false, {}, setLoading);
      setData(response);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Set the locations data when the component mounts
    setLocations([
      {
        lat: 17.967461,
        long: 102.5994161,
        merchant_name: "Coffee Shop Downtown",
        machine_name: "ATM-001",
      },
      {
        lat: 17.96281,
        long: 102.601998,
        merchant_name: "Central Mall",
        machine_name: "ATM-002",
      },
      {
        lat: 17.970123,
        long: 102.605678,
        merchant_name: "University Campus",
        machine_name: "ATM-003",
      },
    ]);
  }, []);

  // For debugging
  useEffect(() => {
    console.log("Locations updated:", locations);
  }, [locations]);

  const statisticsData = [
    { type: "merchant", label: "Merchant", value: 230 },
    { type: "terminal", label: "Terminal", value: 8549 },
    { type: "pos", label: "POS", value: 1423 },
    { type: "total_transaction", label: "Total Transaction", value: 9745 },
  ];

  return (
    <Spin spinning={loading}>
      <div
        style={{
          padding: "24px",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col className="gutter-row" span={24} lg={24} md={24} sm={24} xs={24}>
            <InfoSummary data={statisticsData} />
          </Col>

          <Col className="gutter-row" span={24} lg={24} md={24} sm={24} xs={24}>
            {locations.length > 0 && <MapSummary locations={locations} />}
          </Col>

          <Col className="gutter-row" span={16} lg={16} md={16} sm={24} xs={24}>
            <TransactionChart />
          </Col>

          <Col className="gutter-row" span={8} lg={8} md={8} sm={24} xs={24}>
            <RankingTransaction />
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default DashboardContainer;
