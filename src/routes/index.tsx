import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProvideAuth } from "@/routes/auth/ProvideAuth";
import PrivateRoute from "./auth/PrivateRoute";
import RoutesList, { IRoutesList } from "./routes";
import RouteWrapper from "./RouteWrapper";
import HomepageContainer from "@/containers/home";
import LoginConatiner from "@/containers/auth/login";

const RoutesComponent = () => {
  return (
    <ProvideAuth>
      <Router>
        <Routes>
          {RoutesList.map((r: IRoutesList) => {
            const wrappedComponent = (
              <RouteWrapper
                useLayout={r.useLayout !== false}
                title={r.title || "Page"}
                breadcumb={r.breadcumb || ""}
              >
                {r.component ?? <></>}
              </RouteWrapper>
            );

            if (r.route_type === "private_route") {
              return (
                <Route
                  key={r.path}
                  path={r.path}
                  element={
                    <PrivateRoute key={r.path}>{wrappedComponent}</PrivateRoute>
                  }
                />
              );
            } else {
              return (
                <Route key={r.path} path={r.path} element={wrappedComponent} />
              );
            }
          })}

          {/* without layout */}
          <Route path={"/"} element={<HomepageContainer />} />
          <Route path={"/login"} element={<LoginConatiner />} />
        </Routes>
      </Router>
    </ProvideAuth>
  );
};

export default RoutesComponent;
