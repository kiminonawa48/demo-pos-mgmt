import React from "react";
import { IAuthContext } from "./type";

const defaultAuthContext = {
  currentUser: null,
  login: (username: string, password: string) => {
    console.log(username, password);
  },
  logout: () => {},
  userInfo: {},
  tokenAuthLogin: "token",
};
const AuthContext = React.createContext<IAuthContext>(defaultAuthContext);

export default AuthContext;
