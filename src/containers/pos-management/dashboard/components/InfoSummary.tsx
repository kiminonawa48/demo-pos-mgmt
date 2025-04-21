import { ISummaryInfo } from "@/core/domain/dashboard";
import { Card, Col, Row, Statistic, Space } from "antd";
import {
  ShoppingCartOutlined,
  TagOutlined,
  DollarOutlined,
  ShopOutlined,
  ShakeOutlined,
} from "@ant-design/icons";

const iconMap = {
  merchant: <ShopOutlined style={{ fontSize: "24px", color: "#1677ff" }} />,
  terminal: (
    <ShoppingCartOutlined style={{ fontSize: "24px", color: "#ff4d4f" }} />
  ),
  pos: <ShakeOutlined style={{ fontSize: "24px", color: "#13c2c2" }} />,
  total_transaction: (
    <DollarOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
  ),
};

const bgColorMap = {
  merchant: "#e6f4ff",
  terminal: "#fff1f0",
  pos: "#e6fffb",
  total_transaction: "#f6ffed",
};

const InfoSummary = ({ data }: { data: ISummaryInfo[] }) => {
  return (
    <Card
      title="Statistics"
      variant="borderless"
      extra={<span style={{ color: "#8c8c8c" }}>Updated 1 day ago</span>}
    >
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col
            className="gutter-row"
            key={index}
            span={6}
            lg={6}
            md={12}
            sm={12}
            xs={24}
          >
            <Space>
              <div
                style={{
                  backgroundColor: bgColorMap[item.type] || "#f0f0f0",
                  padding: "18px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {iconMap[item.type] || (
                  <TagOutlined style={{ fontSize: "24px", color: "#8c8c8c" }} />
                )}
              </div>
              <Statistic
                title={item.label}
                value={item.value}
                valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
              />
            </Space>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default InfoSummary;
