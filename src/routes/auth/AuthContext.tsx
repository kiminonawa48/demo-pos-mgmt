import React from "react";
import { IAuthContext } from "./type";

const defaultAuthContext = {
  currentUser: null,
  login: (email: string, password: string) => {
    console.log(email, password);
  },
  logout: () => {},
  userInfo: {},
  tokenAuthLogin: "token",
};
const AuthContext = React.createContext<IAuthContext>(defaultAuthContext);

export default AuthContext;
