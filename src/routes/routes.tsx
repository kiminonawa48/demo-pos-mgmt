// import { lazy } from "react";

import DashboardContainer from "@/containers/dashboard";
import RoleAndPermissionManagementContainer from "@/containers/role-permission";
import RoleAndPermissionUpdateContainer from "@/containers/role-permission/update";
import MerchantSettingContainer from "@/containers/settings/merchant";
import POSMachineSettingContainer from "@/containers/settings/pos_machine";
import TerminalSettingContainer from "@/containers/settings/terminal";
import UserManagementContainer from "@/containers/users";

// const Login = lazy(() => import("@/containers/Login"));

export interface IRoutesList {
  path: string;
  component: React.ReactNode;
  route_type: "private_route" | "public_route";
  useLayout?: boolean; // Whether to use MainLayout
  title?: string; // For page title
  breadcumb?: string; // For breadcrumb
}

const routes: IRoutesList[] = [
  {
    route_type: "public_route",
    path: "/loading",
    component: <>loading</>,
  },
  {
    route_type: "public_route",
    path: "/",
    component: <DashboardContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/dashboard",
    component: <DashboardContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/merchants/merchant",
    component: <MerchantSettingContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/merchants/pos-machine",
    component: <POSMachineSettingContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/merchants/terminal",
    component: <TerminalSettingContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/users",
    component: <UserManagementContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/role-permission",
    component: <RoleAndPermissionManagementContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/role-permission/create",
    component: <RoleAndPermissionUpdateContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/role-permission/:id/update",
    component: <RoleAndPermissionUpdateContainer />,
  },
];

export default routes;
