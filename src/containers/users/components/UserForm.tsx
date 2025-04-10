import { Form, Input, Select, Switch, Button, Space } from "antd";

const UserForm = ({
  form,
  onFinish,
  merchantOptions,
  loading,
}: {
  form: any;
  onFinish: (value: any) => void;
  merchantOptions: any;
  loading: boolean;
}) => {
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{ status: true }}
      >
        <Form.Item
          name="merchant_name"
          label="Merchant Name"
          rules={[{ required: true, message: "Please select a merchant" }]}
        >
          <Select
            placeholder="Select merchant"
            options={merchantOptions}
            showSearch
            filterOption={(input, option) =>
              String(option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: "Please enter a username" },
            { min: 4, message: "Username must be at least 4 characters" },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button onClick={() => form.resetFields()} disabled={loading}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserForm;
