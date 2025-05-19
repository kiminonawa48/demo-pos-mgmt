// import HomepageContainer from "@/containers/home";
import DashboardContainer from "@/containers/pos-management/dashboard";
import RoleAndPermissionManagementContainer from "@/containers/pos-management/role-permission";
import RoleAndPermissionUpdateContainer from "@/containers/pos-management/role-permission/update";
import MerchantDetailContainer from "@/containers/pos-management/settings/merchant/merchant-detail";
import MerchantSettingContainer from "@/containers/pos-management/settings/merchant/merchant-main";
import POSMachineSettingContainer from "@/containers/pos-management/settings/pos_machine";
import TerminalSettingContainer from "@/containers/pos-management/settings/terminal";
import UserManagementContainer from "@/containers/pos-management/users";
import { routeNamePosMgmt } from "./route-name";
import { posMgmtBreadcrumbs } from "./pos-mgmt-breadcrumbs";

export interface IRoutesList {
  path: string;
  component: React.ReactNode;
  route_type: "private_route" | "public_route";
  useLayout?: boolean;
  title?: string;
  breadcumbs?: any[];
}

const posMgmtRoutes: IRoutesList[] = [
  {
    route_type: "public_route",
    path: "/loading",
    component: <>loading</>,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.dashboard,
    component: <DashboardContainer />,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.setting_merchant,
    component: <MerchantSettingContainer />,
    breadcumbs: posMgmtBreadcrumbs.setting_merchant,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.setting_merchant_detail,
    component: <MerchantDetailContainer />,
    breadcumbs: posMgmtBreadcrumbs.setting_merchant_detail,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.setting_pos_terminal,
    component: <TerminalSettingContainer />,
    breadcumbs: posMgmtBreadcrumbs.setting_pos_terminal,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.setting_pos_machine,
    component: <POSMachineSettingContainer />,
    breadcumbs: posMgmtBreadcrumbs.setting_pos_machine,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.users,
    component: <UserManagementContainer />,
    breadcumbs: posMgmtBreadcrumbs.users,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.role_permission,
    component: <RoleAndPermissionManagementContainer />,
    breadcumbs: posMgmtBreadcrumbs.role_permission,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.role_permission_create,
    component: <RoleAndPermissionUpdateContainer />,
    breadcumbs: posMgmtBreadcrumbs.role_permission_create,
  },
  {
    route_type: "private_route",
    path: routeNamePosMgmt.role_permission_update,
    component: <RoleAndPermissionUpdateContainer />,
    breadcumbs: posMgmtBreadcrumbs.role_permission_update,
  },
];

export default posMgmtRoutes;
