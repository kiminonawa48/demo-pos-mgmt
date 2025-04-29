import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProvideAuth } from "@/routes/auth/ProvideAuth";
import PrivateRoute from "./auth/PrivateRoute";
import RoutesList, { IRoutesList } from "./routes";
import RouteWrapper from "./RouteWrapper";
import HomepageContainer from "@/containers/home";
import LoginConatiner from "@/containers/auth/login";
import { Error401, Error403, Error404, Error500 } from "@/containers/error-page";

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
          <Route path={"/"} element={<PrivateRoute><HomepageContainer /></PrivateRoute>} />
          <Route path={"/login"} element={<LoginConatiner />} />

          {/* Error pages */}
          <Route path="/401" element={<Error401 />} />
          <Route path="/403" element={<Error403 />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/500" element={<Error500 />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </ProvideAuth>
  );
};

export default RoutesComponent;
