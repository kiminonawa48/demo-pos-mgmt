import {
  ClusterOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ISideBarMenu } from "./domain";
import { routeNamePosMgmt } from "@/routes/pos-mgmt-route/route-name";

const SideBarMenuPosMgmt: ISideBarMenu[] = [
  {
    path_name: routeNamePosMgmt.dashboard,
    title_name: "menu_dashboard",
    icon_name: <PieChartOutlined />,
    sub_menu: false,
    children: [],
    role: "",
  },
  {
    path_name: routeNamePosMgmt.head_setting_merchant,
    title_name: "menu_merchants_info",
    icon_name: <ClusterOutlined />,
    role: "",
    sub_menu: true,
    children: [
      {
        sub_path_name: routeNamePosMgmt.setting_merchant,
        permissions: [""],
        sub_title_name: "menu_merchant",
      },
      {
        sub_path_name: routeNamePosMgmt.setting_pos_terminal,
        permissions: [""],
        sub_title_name: "menu_terminal",
      },
      {
        sub_path_name: routeNamePosMgmt.setting_pos_machine,
        permissions: [""],
        sub_title_name: "menu_pos",
      },
    ],
  },
  {
    path_name: routeNamePosMgmt.users,
    title_name: "menu_users",
    icon_name: <UserOutlined />,
    sub_menu: false,
    children: [],
    role: "",
  },
  {
    path_name: routeNamePosMgmt.role_permission,
    title_name: "menu_role_permission",
    icon_name: <SafetyCertificateOutlined />,
    sub_menu: false,
    children: [],
    role: "",
  },
];

export default SideBarMenuPosMgmt;
