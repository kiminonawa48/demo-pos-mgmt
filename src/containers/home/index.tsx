import { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Space,
  Divider,
  Typography,
  Image,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./index.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const FolderOption = ({ type, title, imageSrc, isSelected, onSelect }) => {
  return (
    <Col xs={24} sm={8}>
      <Card
        className={`folder-card ${isSelected ? "selected" : ""}`}
        onClick={() => onSelect(type)}
        hoverable
      >
        <div className="folder-image-container">
          <Image
            src={imageSrc}
            alt={title}
            preview={false}
            className="folder-image"
          />
        </div>
        <Typography.Text strong className="folder-title">
          {title}
        </Typography.Text>
      </Card>
    </Col>
  );
};

const HomepageContainer = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState("/");

  const folderOptions = [
    {
      path: "/admin/pos-mgmt/dashboard",
      title: "POS Management",
      image: "/assets/images/ldb_logo.png",
    },
    {
      path: "/ldb-mgmt",
      title: "LDB Transaction",
      image: "/assets/images/ldb_logo.png",
    },
    {
      path: "/ldb-payment",
      title: "LDB Monitoring",
      image: "/assets/images/ldb_logo.png",
    },
  ];

  const handleContinue = () => {
    navigate(selectedApp);
  };

  return (
    <div className="ant-layout-content folder-selection-container">
      <Card className="folder-selection-card">
        <Title level={4} className="card-title">
          Select App
        </Title>

        <Row gutter={[24, 24]}>
          {folderOptions.map((folder) => (
            <FolderOption
              key={folder.path}
              type={folder.path}
              title={folder.title}
              imageSrc={folder.image}
              isSelected={selectedApp === folder.path}
              onSelect={() => {
                setSelectedApp(folder.path);
              }}
            />
          ))}
        </Row>

        <Divider />

        <div className="action-buttons">
          <Space className="center-buttons">
            <Button
              type="primary"
              onClick={handleContinue}
              icon={<ArrowRightOutlined />}
            >
              Continue
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default HomepageContainer;
