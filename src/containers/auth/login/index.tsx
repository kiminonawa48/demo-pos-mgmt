import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./css/index.css";
import { useNavigate } from "react-router-dom";

const { Title, Link } = Typography;

const LoginConatiner = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("values", values);
    navigate("/");
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
              name="login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                // rules={[
                //   { required: true, message: "Please input your email!" },
                //   { type: "email", message: "Please enter a valid email!" },
                // ]}
              >
                <Input
                  size="large"
                  placeholder="admin@ldb.com"
                  defaultValue="admin@ldb.com"
                  value={"admin@ldb.com"}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                // rules={[
                //   { required: true, message: "Please input your password!" },
                // ]}
              >
                <Input.Password
                  size="large"
                  placeholder="••••••"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  defaultValue="1234"
                  value={"1234"}
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
                <Button type="primary" htmlType="submit" size="large" block>
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
