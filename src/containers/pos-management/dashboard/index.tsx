import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import MapSummary from "./components/MapSummary";
import { ILocationMarker } from "@/core/domain/dashboard";
import InfoSummary from "./components/InfoSummary";
import TransactionChart from "./components/TransactionChart";
import RankingTransaction from "./components/RankingTransaction";

const DashboardContainer = () => {
  const [locations, setLocations] = useState<ILocationMarker[]>([]);

  useEffect(() => {
    return () => {
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
    };
  }, []);

  const statisticsData = [
    { type: "merchant", label: "Merchant", value: 230 },
    { type: "terminal", label: "Terminal", value: 8549 },
    { type: "pos", label: "POS", value: 1423 },
    { type: "total_transaction", label: "Total Transaction", value: 9745 },
  ];

  return (
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
          <MapSummary locations={locations} />
        </Col>

        <Col className="gutter-row" span={16} lg={16} md={16} sm={24} xs={24}>
          <TransactionChart />
        </Col>

        <Col className="gutter-row" span={8} lg={8} md={8} sm={24} xs={24}>
          <RankingTransaction />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContainer;
