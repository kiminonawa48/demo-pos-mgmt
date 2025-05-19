import { Card, Col, Form, Row } from "antd";
import MerchantForm from "../components/MerchantForm";
import { useState } from "react";
import TerminalSettingContainer from "../../terminal";
import POSMachineSettingContainer from "../../pos_machine";

interface InputDataType {
  id?: number;
  merchant_name: string;
  status: boolean; // Changed to boolean for Switch component
}

const MerchantDetailContainer = () => {
  const [form] = Form.useForm<InputDataType>();

  const [loading, setLoading] = useState(false);

  const onFinish = (values: InputDataType) => {
    setLoading(true);

    console.log("values", values);

    setTimeout(() => {
      setLoading(false);
      form.resetFields();
    }, 1000);
  };

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="Merchant Management"
            style={{
              height: "100%",
            }}
          >
            <MerchantForm onFinish={onFinish} form={form} loading={loading} />
          </Card>
        </Col>
        {/*  */}
        <Col className="gutter-row" span={12} lg={12} md={12} sm={24} xs={24}>
          <TerminalSettingContainer />
        </Col>
        {/*  */}
        <Col className="gutter-row" span={12} lg={12} md={12} sm={24} xs={24}>
          <POSMachineSettingContainer />
        </Col>
      </Row>
    </>
  );
};

export default MerchantDetailContainer;
