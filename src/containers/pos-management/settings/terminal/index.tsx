import { useState } from "react";
import TerminalList from "./components/TerminalList";
import { Button, Card, Drawer, Form } from "antd";
import TerminalForm from "./components/TerminallForm";
import { SaveOutlined } from "@ant-design/icons";
interface InputDataType {
  id: number;
  merchant_id: number;
  terminal_nmae: string;
  status: string;
}

const TerminalSettingContainer = () => {
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

  const merchantOptions = [
    { value: "merchant_1", label: "Merchant One" },
    { value: "merchant_2", label: "Merchant Two" },
    { value: "merchant_3", label: "Merchant Three" },
    { value: "merchant_4", label: "Merchant Four" },
  ];

  const onFinish = (values: InputDataType) => {
    setLoading(true);

    // Simulate API call
    console.log("Form values:", values);

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
            ? "Create Terminal"
            : mode === "Update"
            ? "Update Terminal"
            : "Terminal Info"
        }
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
      >
        <TerminalForm
          onFinish={onFinish}
          merchantOptions={merchantOptions}
          form={form}
          loading={loading}
        />
      </Drawer>

      <Card
        title="Terminal Management"
        bodyStyle={{ padding: 0, margin: 0 }}
        extra={
          <Button
            variant="outlined"
            type="primary"
            onClick={() => {
              setMode("CREATE");
              showDrawer();
            }}
            icon={<SaveOutlined />}
          >
            Create
          </Button>
        }
      >
        <TerminalList showDrawer={showDrawer} />
      </Card>
    </>
  );
};

export default TerminalSettingContainer;
