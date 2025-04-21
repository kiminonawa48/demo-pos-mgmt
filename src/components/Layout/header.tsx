import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Layout, Row, Space, theme } from "antd";
import React from "react";

import {
  PoweroffOutlined,
  UserOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom'

// import { useHistory } from 'react-router';

const { Header } = Layout;

export interface IHeaderNav {
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  portalTheme: number;
  setPortalTheme: (theme_name: number) => void;
}

const HeaderNav = ({
  collapse,
  setCollapse,
  portalTheme,
  setPortalTheme,
}: IHeaderNav) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (collapse) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  };

  return (
    <>
      <Header
        className="site-layout-sub-header-background"
        style={{
          paddingLeft: 15,
          paddingRight: 25,
          background: colorBgContainer,
        }}
      >
        <Row>
          <Col flex="100px">
            {React.createElement(
              collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: handleToggle,
                // style: { color: '#001529' },
              }
            )}
          </Col>

          <Col flex="auto"></Col>

          <Space align="center" style={{ marginRight: 10 }}>
            <Button
              shape="circle"
              icon={<SyncOutlined />}
              size="middle"
              onClick={() => {
                if (portalTheme === 0) {
                  setPortalTheme(1);
                } else {
                  setPortalTheme(0);
                }
              }}
            />
          </Space>
          {/*  */}
          <Space align="center" style={{ marginRight: 10 }}>
            <Button
              shape="circle"
              icon={<FolderOpenOutlined />}
              size="middle"
              onClick={() => {
                navigate("/");
              }}
            />
          </Space>
          {/*  */}
          <Space align="center">
            <Dropdown
              arrow={true}
              trigger={["click"]}
              menu={{
                items: [
                  {
                    label: (
                      <a href="/login" rel="noopener noreferrer">
                        Logout
                      </a>
                    ),
                    key: "5",
                    icon: <PoweroffOutlined />,
                  },
                ],
              }}
            >
              <a
                className="ant-dropdown-link"
                href="#"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  e.preventDefault()
                }
              >
                <Button shape="circle" icon={<UserOutlined />} size="middle" />
              </a>
            </Dropdown>
          </Space>
        </Row>
      </Header>
    </>
  );
};

export default HeaderNav;
