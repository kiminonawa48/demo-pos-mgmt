import { ConfigProvider, Layout, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import ContentLayout from "./content";
import HeaderNav from "./header";
import Sidebar from "./sidebar";

import useAuth from "@/routes/auth/useAuth";

import "./styles/index.css";

const { Footer } = Layout;
// const { Title } = Typography;

export interface IMainLayout {
  children: React.ReactNode;
  title: string;
  breadcumb: string;
}

const MainLayout = ({
  title,
  breadcumb,
  children,
}: IMainLayout) => {
  const { userInfo } = useAuth();

  const [portalTheme, setPortalTheme] = useState<number>(
    parseInt(localStorage.getItem("ldb_portal_theme") || "0") ?? 0
  );

  useEffect(() => {
    if (!portalTheme) {
      localStorage.setItem("ldb_portal_theme", "0");
    } else {
      localStorage.setItem("ldb_portal_theme", `${portalTheme}`);
    }
  }, [portalTheme]);

  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title} | LDB</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="shortcut icon"
            href="/favicon.png"
            type="image/x-icon"
          ></link>
        </Helmet>
      </HelmetProvider>
      <ConfigProvider
        theme={{
          algorithm: [
            portalTheme === 1 ? theme.darkAlgorithm : theme.defaultAlgorithm,
          ],
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar
            collapse={collapse}
            setCollapse={setCollapse}
            userInfo={userInfo}
            portalTheme={portalTheme}
          />

          <Layout>
            <HeaderNav
              collapse={collapse}
              setCollapse={setCollapse}
              portalTheme={portalTheme}
              setPortalTheme={setPortalTheme}
            />

            <ContentLayout
              breadcumb={breadcumb}
            >
              {children}
            </ContentLayout>

            <Footer style={{ textAlign: "center" }}>
              Copyright © {new Date().getFullYear()} LDB. All rights reserved.
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default MainLayout;
