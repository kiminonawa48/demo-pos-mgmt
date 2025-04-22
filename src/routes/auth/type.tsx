export interface IProvideAuth {
  children: React.ReactNode;
}

export interface IAuthContext {
  currentUser: any | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  userInfo: any;
  tokenAuthLogin: string;
  refreshToken?: () => void;
}
