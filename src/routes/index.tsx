import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProvideAuth } from "@/routes/auth/ProvideAuth";
import PrivateRoute from "./auth/PrivateRoute";
import RoutesList, { IRoutesList } from "./routes";
import RouteWrapper from "./RouteWrapper";

const RoutesComponent = () => {
  return (
    <ProvideAuth>
      <Router>
        <Routes>
          {RoutesList.map((r: IRoutesList) => {
            // Wrap component with RouteWrapper
            const wrappedComponent = (
              <RouteWrapper
                useLayout={r.useLayout !== false} // Default to true if not specified
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
        </Routes>
      </Router>
    </ProvideAuth>
  );
};

export default RoutesComponent;
