import { useState } from "react";
import { Form } from "antd";
import RoleAndPermissionForm from "./components/RoleAndPermissionForm";

interface InputDataType {
  key: string;
  merchant_name: string;
  username: string;
  name: string;
  status: boolean; // Changed to boolean for Switch component
}

const RoleAndPermissionUpdateContainer = () => {
  const [form] = Form.useForm<InputDataType>();

  const [loading, setLoading] = useState(false);

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
      <RoleAndPermissionForm
        onFinish={onFinish}
        form={form}
        loading={loading}
      />
    </>
  );
};

export default RoleAndPermissionUpdateContainer;
