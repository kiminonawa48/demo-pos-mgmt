import {
  ClusterOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ISideBarMenu } from "./domain";

const SideBarMenuPosMgmt: ISideBarMenu[] = [
  {
    path_name: "/admin/pos-mgmt/dashboard",
    title_name: "menu_dashboard",
    icon_name: <PieChartOutlined />,
    sub_menu: false,
    children: [],
    role: "",
  },
  {
    path_name: "/admin/pos-mgmt/merchants",
    title_name: "menu_merchants_info",
    icon_name: <ClusterOutlined />,
    role: "",
    sub_menu: true,
    children: [
      {
        sub_path_name: "/admin/pos-mgmt/merchants/merchant",
        permissions: [""],
        sub_title_name: "menu_merchant",
      },
      {
        sub_path_name: "/admin/pos-mgmt/merchants/terminal",
        permissions: [""],
        sub_title_name: "menu_terminal",
      },
      {
        sub_path_name: "/admin/pos-mgmt/merchants/pos-machine",
        permissions: [""],
        sub_title_name: "menu_pos",
      },
    ],
  },
  {
    path_name: "/admin/pos-mgmt/users",
    title_name: "menu_users",
    icon_name: <UserOutlined />,
    sub_menu: false,
    children: [],
    role: "",
  },
  {
    path_name: "/admin/pos-mgmt/role-permission",
    title_name: "menu_role_permission",
    icon_name: <SafetyCertificateOutlined />,
    sub_menu: false,
    children: [],
    role: "",
  },
];

export default SideBarMenuPosMgmt;
