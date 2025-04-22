import { useState } from "react";
import TerminalList from "./components/POSList";
import { Button, Card, Drawer, Form } from "antd";
import POSForm from "./components/POSForm";
import { SaveOutlined } from "@ant-design/icons";

interface InputDataType {
  id: number;
  merchant_id: number;
  terminal_nmae: string;
  status: string;
}

const POSMachineSettingContainer = () => {
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

  const terminalOptions = [
    { value: "terminal_1", label: "Terminal One" },
    { value: "terminal_2", label: "Terminal Two" },
    { value: "terminal_3", label: "Terminal Three" },
    { value: "terminal_4", label: "Terminal Four" },
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
            ? "Create POS"
            : mode === "Update"
            ? "Update POS"
            : "POS Info"
        }
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
      >
        <POSForm
          onFinish={onFinish}
          merchantOptions={merchantOptions}
          terminalOptions={terminalOptions}
          form={form}
          loading={loading}
        />
      </Drawer>

      <Card
        title="POS Management"
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

export default POSMachineSettingContainer;
