import React from "react";
// import useAuth from "./useAuth";

export interface IPrivateRoute {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
//   const { currentUser } = useAuth();

  const mockUser = localStorage.getItem("authenticationToken");

  if (mockUser) {
    // if (currentUser.username) {
    return <>{children}</>;
  } else {
    window.location.href = "/login";

    return <></>;
  }
};

export default PrivateRoute;
