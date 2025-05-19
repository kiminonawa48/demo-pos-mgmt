import { useState } from "react";
import UserList from "../components/MerchantList";
import { Button, Card, Drawer, Form } from "antd";
import MerchantForm from "../components/MerchantForm";
import { SaveOutlined } from "@ant-design/icons";
interface InputDataType {
  id?: number;
  merchant_name: string;
  status: boolean; // Changed to boolean for Switch component
}

const MerchantSettingContainer = () => {
  const [form] = Form.useForm<InputDataType>();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
  };

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
      <Drawer
        title={
          mode === "CREATE"
            ? "Create Merchant"
            : mode === "Update"
            ? "Update Merchant"
            : "Merchant Info"
        }
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
      >
        <MerchantForm onFinish={onFinish} form={form} loading={loading} />
      </Drawer>

      <Card
        title="Merchant Management"
        bodyStyle={{ padding: 0, margin: 0 }}
        extra={
          <Button
            onClick={() => {
              setMode("CREATE");
              showDrawer();
            }}
            variant="outlined"
            type="primary"
            icon={<SaveOutlined />}
          >
            Create
          </Button>
        }
      >
        <UserList showDrawer={showDrawer} />
      </Card>
    </>
  );
};

export default MerchantSettingContainer;
