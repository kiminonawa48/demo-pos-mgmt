import { Form, Select, Switch, Button, Space, Input } from "antd";

const POSForm = ({
  form,
  onFinish,
  merchantOptions,
  loading,
  terminalOptions,
}: {
  form: any;
  onFinish: (value: any) => void;
  merchantOptions: any[];
  loading: boolean;
  terminalOptions: any[];
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
          name="terminal_name"
          label="Terminal Name"
          rules={[{ required: true, message: "Please select a terminal" }]}
        >
          <Select
            placeholder="Select terminal"
            options={terminalOptions}
            showSearch
            filterOption={(input, option) =>
              String(option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          name="merchant_no"
          label="Merchant No"
          rules={[
            { required: true, message: "Please enter a Merchant No" },
            { min: 4, message: "Merchant No must be at least 4 characters" },
          ]}
        >
          <Input placeholder="Enter Merchant No" />
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

export default POSForm;
