import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoutesComponent from "./routes/index.tsx";
import "./App.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // algorithm: theme.darkAlgorithm,
          // Seed Token
          colorPrimary: "#1980C7",
          // borderRadius: 2,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RoutesComponent />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
