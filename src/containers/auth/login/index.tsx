import { Form, Input, Button, Checkbox, Row, Col, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "@/routes/auth/useAuth";

const { Title, Link } = Typography;

const LoginConatiner = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [form] = Form.useForm(); // <-- Add form instance

  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);

    try {
      const response: any = await login(values.username, values.password); // <-- Add await

      console.log('response', response);
      if (response?.status === "00") {
        navigate("/");
      } else {
        form.setFields([
          {
            name: "username",
            errors: [response.message || "Login failed"],
          },
          {
            name: "password",
            errors: [response.message || "Login failed"],
          },
        ]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <Row gutter={0} className="login-row">
        <Col xs={0} sm={0} md={14} lg={14} xl={14} className="left-side">
          <div className="stats-container">
            <div className="character-container">
              <div className="character-placeholder">
                <img
                  src="/assets/images/ldb_logo.png"
                  alt="Character placeholder"
                  className="character-image"
                />
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={10} lg={10} xl={10} className="right-side">
          <div className="login-form-container">
            <div className="login-header">
              <Title level={2}>Lao Development Bank</Title>
            </div>

            <Form
              form={form}
              name="login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your username"
                  value={inputValue.username}
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      username: e.target.value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="••••••"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={inputValue.password}
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Item>

              <div className="form-options">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link href="#" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  disabled={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginConatiner;
