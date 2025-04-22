import { useState } from "react";
import UserList from "./components/UserList";
import { Card, Drawer, Form } from "antd";
import UserForm from "./components/UserForm";

interface InputDataType {
  key: string;
  merchant_name: string;
  username: string;
  name: string;
  status: boolean; // Changed to boolean for Switch component
}

const UserManagementContainer = () => {
  const [form] = Form.useForm<InputDataType>();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

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

    // Add a key if it's a new record
    if (!values.key) {
      values.key = Date.now().toString();
    }

    setTimeout(() => {
      setLoading(false);
      form.resetFields();
    }, 1000);
  };

  return (
    <>
      <Drawer
        title="User Management"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
      >
        <UserForm
          onFinish={onFinish}
          merchantOptions={merchantOptions}
          form={form}
          loading={loading}
        />
      </Drawer>

      <Card title="User Management" bodyStyle={{ padding: 0, margin: 0 }}>
        <UserList showDrawer={showDrawer} />
      </Card>
    </>
  );
};

export default UserManagementContainer;
