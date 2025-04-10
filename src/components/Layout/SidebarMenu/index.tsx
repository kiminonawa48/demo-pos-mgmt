import {
  ClusterOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

export interface ISideBarMenu {
  path_name: string;
  title_name: string;
  icon_name: React.ReactNode | string;
  sub_menu: boolean;
  children: ISubSidebarMenu[];
  role: string;
}

export interface ISubSidebarMenu {
  sub_path_name: string;
  permissions: string[];
  sub_title_name: string;
}

const SideBarMenu: ISideBarMenu[] = [
  {
    path_name: "/admin/dashboard",
    title_name: "Dashboard",
    icon_name: <PieChartOutlined />,
    sub_menu: false,
    children: [],
    role: "",
  },
  {
    path_name: "/admin/merchants",
    title_name: "Merchants Infomation",
    icon_name: <ClusterOutlined />,
    role: "",
    sub_menu: true,
    children: [
      {
        sub_path_name: "/admin/merchants/merchant",
        permissions: [""],
        sub_title_name: "Merchant",
      },
      {
        sub_path_name: "/admin/merchants/terminal",
        permissions: [""],
        sub_title_name: "Terminal",
      },
      {
        sub_path_name: "/admin/merchants/pos-machine",
        permissions: [""],
        sub_title_name: "POS",
      },
    ],
  },
  {
    path_name: "/admin/users",
    title_name: "Users",
    icon_name: <UserOutlined />,
    sub_menu: false,
    children: [],
    role: "",
  },
];

export default SideBarMenu;
