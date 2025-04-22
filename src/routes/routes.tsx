import posMgmtRoutes from "./pos-mgmt-route/routes";

export interface IRoutesList {
  path: string;
  component: React.ReactNode;
  route_type: "private_route" | "public_route";
  useLayout?: boolean;
  title?: string;
  breadcumb?: string;
}

const routes: IRoutesList[] = [
  {
    route_type: "public_route",
    path: "/loading",
    component: <>loading</>,
  },
  ...posMgmtRoutes,
];

export default routes;
