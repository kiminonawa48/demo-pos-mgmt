import { Form, Input, Button, Space } from "antd";

const MerchantForm = ({
  form,
  onFinish,
  loading,
}: {
  form: any;
  onFinish: (value: any) => void;
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
          name="Merchant name"
          label="merchant name"
          rules={[
            { required: true, message: "Please enter a Merchant name" },
            { min: 4, message: "Merchant name must be at least 4 characters" },
          ]}
        >
          <Input placeholder="Enter merchant name" />
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

export default MerchantForm;
