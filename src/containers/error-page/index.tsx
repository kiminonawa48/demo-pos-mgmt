import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

// 401 Unauthorized Error Page
export const Error401 = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="401"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
      }
    />
  );
};

// 403 Forbidden Error Page
export const Error403 = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you don't have access to this page."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

// 404 Not Found Error Page
export const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

// 500 Server Error Page
export const Error500 = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong with the server."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

// Generic Error Page
export const ErrorPage = ({ code = "404", message = "Page not found" }) => {
  const navigate = useNavigate();

  const getStatus = () => {
    switch (code) {
      case "403":
        return "403";
      case "500":
        return "500";
      default:
        return "404";
    }
  };

  return (
    <Result
      status={getStatus()}
      title={code}
      subTitle={message}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};
