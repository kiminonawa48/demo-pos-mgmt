import { Divider, Layout, Menu, Space, Typography } from "antd";

import { useLocation, useNavigate } from "react-router";
import SideBarMenuPosMgmt from "./SidebarMenu/PosMgmt";
import { ISideBarMenu } from "./SidebarMenu/domain";

const { Sider } = Layout;

const { Text } = Typography;

export interface ISidebar {
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  userInfo: any;
  portalTheme: number;
}

const Sidebar = ({
  collapse,
  setCollapse,
  userInfo,
  portalTheme,
}: ISidebar) => {
  const navigate = useNavigate();
  const location = useLocation();

  const p = window.location.pathname;
  const key_open_sidebar = p.substring(0, p.lastIndexOf("/"));

  const user_role = [userInfo?.is_admin === 1 ? "admin" : null];

  const user_permissions: string[] = [];

  return (
    <Sider
      theme={portalTheme === 1 ? "dark" : "light"}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        setCollapse(broken);
      }}
      width={250}
      id="layout-sidebar"
      trigger={null}
      collapsible
      collapsed={collapse}
      // className="site-layout-background"
    >
      <Space
        direction="vertical"
        align="center"
        style={{
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <img
            src="/assets/images/ldb_logo.png"
            className="logo-image"
            alt="logo"
            style={{ height: 50 }}
          />
        </div>
        <div>
          <Text strong style={{ fontSize: 14 }}>
            Lao Development Bank
          </Text>
        </div>
      </Space>

      <Divider />

      <Menu
        theme={portalTheme === 1 ? "dark" : "light"}
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[key_open_sidebar]}
        items={(SideBarMenuPosMgmt || []).map((sb: ISideBarMenu) => {
          // if (sb.role.join(',') === user_role.join(',') || sb.role.join(',') === "") {
          if (user_role.find((str) => str === sb.role) || sb.role === "") {
            if (sb.sub_menu === true) {
              return {
                label: sb.title_name,
                key: sb.path_name,
                icon: sb.icon_name,
                children: sb.children.map((sub) => {
                  // if (sub.permissions.join(',') === user_permissions.join(',') || sub.permissions.join(',') === "") {
                  if (
                    user_permissions.find(
                      (str) => str === sub.permissions.join(",")
                    ) ||
                    sub.permissions.join(",") === ""
                  ) {
                    return {
                      label: sub.sub_title_name,
                      key: sub.sub_path_name,
                      onClick: () => {
                        navigate(sub.sub_path_name);
                      },
                    };
                  } else {
                    return null;
                  }
                }),
              };
            } else {
              return {
                label: (
                  <>
                    {sb.icon_name}
                    <span>{sb.title_name}</span>
                  </>
                ),
                key: sb.path_name,
                onClick: () => navigate(sb.path_name),
              };
            }
          } else {
            return null;
          }
        })}
      />
    </Sider>
  );
};

export default Sidebar;
