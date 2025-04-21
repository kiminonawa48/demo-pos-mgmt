import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import RoutesComponent from "./routes/index.tsx";
import "./App.css";
import './i18n/i18n';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1980C7",
        },
      }}
    >
      <RoutesComponent />
    </ConfigProvider>
  </StrictMode>
);
