// import HomepageContainer from "@/containers/home";
import DashboardContainer from "@/containers/pos-management/dashboard";
import RoleAndPermissionManagementContainer from "@/containers/pos-management/role-permission";
import RoleAndPermissionUpdateContainer from "@/containers/pos-management/role-permission/update";
import MerchantSettingContainer from "@/containers/pos-management/settings/merchant";
import POSMachineSettingContainer from "@/containers/pos-management/settings/pos_machine";
import TerminalSettingContainer from "@/containers/pos-management/settings/terminal";
import UserManagementContainer from "@/containers/pos-management/users";

export interface IRoutesList {
  path: string;
  component: React.ReactNode;
  route_type: "private_route" | "public_route";
  useLayout?: boolean;
  title?: string;
  breadcumb?: string;
}

const posMgmtRoutes: IRoutesList[] = [
  {
    route_type: "public_route",
    path: "/loading",
    component: <>loading</>,
  },
  {
    route_type: "public_route",
    path: "/admin/pos-mgmt/dashboard",
    component: <DashboardContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/pos-mgmt/merchants/merchant",
    component: <MerchantSettingContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/pos-mgmt/merchants/pos-machine",
    component: <POSMachineSettingContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/pos-mgmt/merchants/terminal",
    component: <TerminalSettingContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/pos-mgmt/users",
    component: <UserManagementContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/pos-mgmt/role-permission",
    component: <RoleAndPermissionManagementContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/pos-mgmt/role-permission/create",
    component: <RoleAndPermissionUpdateContainer />,
  },
  {
    route_type: "public_route",
    path: "/admin/pos-mgmt/role-permission/:id/update",
    component: <RoleAndPermissionUpdateContainer />,
  },
];

export default posMgmtRoutes;
