import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import LoadingPageContainer from "@/components/Common/Loading";
import { IAuthContext, IProvideAuth } from "./type";
import { api } from "@/utils/fetchHelper";

interface LoginResponse {
  success: boolean;
  status: string;
  message: string;
}


export const ProvideAuth = ({ children }: IProvideAuth) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authenticationToken")
  );

  // Login with email and password
  const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<{
        status: string;
        message: string;
        dataResponse: {
          authenticationToken: string;
          refreshToken: string;
        }
      }>("/auth-service/login", { username, password });

      const { data } = response;

      if (data.status === "00" && data.message === "SUCCESS") {
        localStorage.setItem("authenticationToken", data.dataResponse.authenticationToken);
        localStorage.setItem("refreshToken", data.dataResponse.refreshToken);

        setAuthToken(data.dataResponse.authenticationToken);

        try {
          // const userProfile = await fetchUserProfile(data.dataResponse.authenticationToken);
          setCurrentUser({ username });
          setUserInfo({username});
        } catch (profileError: any) {

          const errorStatus = profileError.response?.data?.status || "05";
          const errorMessage = profileError.response?.data?.message || profileError.message || "Network error occurred";
          
          return {
            success: false,
            status: errorStatus,
            message: errorMessage
          };
        }
  
        // Return success
        return {
          success: true,
          status: "00",
          message: "Login successful"
        };
      } else {
        return {
          success: false,
          status: data.status || "unknown",
          message: data.message || "Login failed"
        };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      await logout();

      const errorStatus = error.response?.data?.status || "05";
      const errorMessage = error.response?.data?.message || error.message || "Network error occurred";
      
      return {
        success: false,
        status: errorStatus,
        message: errorMessage
      };
    }
  };

  // Fetch user profile with token
  // const fetchUserProfile = async (token: string) => {
  //   try {
  //     // Using our custom API utility with the token in the headers
  //     const customOptions = {
  //       headers: { Authorization: `Bearer ${token}` }
  //     };
      
      
  //     const response = await api.get("/user/profile", false, customOptions);

  //     console.log('fetchUserProfile', response);

  //     const { data } = response;

  //     if (data.status === "00" && data.message === "SUCCESS") {
  //       return data.data;
  //     } else {
  //       throw new Error("Failed to fetch profile");
  //     }
  //   } catch (error) {
  //     console.error("Profile fetch error:", error);
  //     return null;
  //   }
  // };

  // Refresh the token
  const refreshToken = async (currentToken: string) => {
    try {
      const response = await api.post(
        "/refresh-token",
        {},  // Empty body
        true, // Requires auth
        {
          headers: { Authorization: `Bearer ${currentToken}` }
        }
      );

      const { data } = response;

      if (response.status === 200 && data.dataResponse?.authenticationToken) {
        localStorage.setItem("authenticationToken", data.dataResponse.authenticationToken);
        setAuthToken(data.dataResponse.authenticationToken);
        return data.dataResponse.authenticationToken;
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      await logout();
      return null;
    }
  };

  // Verify token validity and refresh if needed
  const verifyAndRefreshToken = async (token: string) => {
    try {
      // Check if token is valid by trying to access a protected endpoint
      const response = await api.post(
        "/verify-token",
        {},  // Empty body
        true, // Requires auth
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { data } = response;

      if (response.status === 200) {
        // If token is valid but about to expire, refresh it
        if (data.needsRefresh) {
          return await refreshToken(token);
        }
        return token;
      } else if (response.status === 401) {
        // Token is invalid or expired, try to refresh
        return await refreshToken(token);
      }

      // If we get here, token verification failed
      throw new Error("Token verification failed");
    } catch (error) {
      console.error("Token verification error:", error);
      return null;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (authToken) {
        // Optional: Call logout endpoint if your API has one
        await api.post("/logout", {}, true).catch(() => {
          // Silent catch - if logout API fails, we still want to clear local state
        });
      }

      // Clear local storage and state
      localStorage.removeItem("authenticationToken");
      localStorage.removeItem("refreshToken");
      setAuthToken(null);
      setCurrentUser(null);
      setUserInfo({});
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  // Rest of your code remains the same...
  
  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     if (authToken) {
  //       try {
  //         // Verify and refresh token if needed
  //         const validToken = await verifyAndRefreshToken(authToken);

  //         if (validToken) {

  //           const profile = await fetchUserProfile(validToken);

  //           if (profile) {
  //             setCurrentUser({ email: profile.email }); // Adjust depending on your user object structure
  //             setUserInfo(profile);
  //           } else {
  //             // If profile fetch fails, logout
  //             await logout();
  //           }
  //         } else {
  //           // If token verification fails, logout
  //           await logout();
  //         }
  //       } catch (error) {
  //         console.error("Authentication initialization error:", error);
  //         await logout();
  //       }
  //     }

  //     // Finish loading regardless of outcome
  //     unLoading();
  //   };

  //   initializeAuth();

  //   // Optional: Set up token refresh interval
  //   const refreshInterval = setInterval(async () => {
  //     if (authToken) {
  //       await verifyAndRefreshToken(authToken);
  //     }
  //   }, 15 * 60 * 1000); // Check every 15 minutes

  //   return () => clearInterval(refreshInterval);
  // }, []);

  useEffect(() => {
    unLoading()
  }, []);

  const unLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const value: IAuthContext = {
    currentUser,
    login,
    logout,
    userInfo: userInfo || {},
    tokenAuthLogin: authToken || "",
    refreshToken: () =>
      authToken ? verifyAndRefreshToken(authToken) : Promise.resolve(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <LoadingPageContainer />}
    </AuthContext.Provider>
  );
};