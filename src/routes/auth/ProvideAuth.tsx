import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import LoadingPageContainer from "@/components/Common/Loading";
import { IAuthContext, IProvideAuth } from "./type";

export const ProvideAuth = ({ children }: IProvideAuth) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  );

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 200 && data.token) {
        // Save token to localStorage
        localStorage.setItem("auth_token", data.token);
        setAuthToken(data.token);

        // Get user profile with the new token
        const userProfile = await fetchUserProfile(data.token);
        setCurrentUser({ email });
        setUserInfo(userProfile);
        return true;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      await logout();
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (authToken) {
        // Optional: Call logout endpoint if your API has one
        await fetch(`${import.meta.env.VITE_URL_API}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }).catch(() => {
          // Silent catch - if logout API fails, we still want to clear local state
        });
      }

      // Clear local storage and state
      localStorage.removeItem("auth_token");
      setAuthToken(null);
      setCurrentUser(null);
      setUserInfo({});
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  // Fetch user profile with token
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === 200) {
        return data.data;
      } else {
        throw new Error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      return null;
    }
  };

  // Verify token validity and refresh if needed
  const verifyAndRefreshToken = async (token: string) => {
    try {
      // Check if token is valid by trying to access a protected endpoint
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/verify-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === 200) {
        // If token is valid but about to expire, refresh it
        if (data.needsRefresh) {
          return await refreshToken(token);
        }
        return token;
      } else if (data.status === 401) {
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

  // Refresh the token
  const refreshToken = async (currentToken: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/refresh-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === 200 && data.token) {
        localStorage.setItem("auth_token", data.token);
        setAuthToken(data.token);
        return data.token;
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      await logout();
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (authToken) {
        try {
          // Verify and refresh token if needed
          const validToken = await verifyAndRefreshToken(authToken);

          if (validToken) {
            // If token is valid, fetch user profile
            const profile = await fetchUserProfile(validToken);

            if (profile) {
              setCurrentUser({ email: profile.email }); // Adjust depending on your user object structure
              setUserInfo(profile);
            } else {
              // If profile fetch fails, logout
              await logout();
            }
          } else {
            // If token verification fails, logout
            await logout();
          }
        } catch (error) {
          console.error("Authentication initialization error:", error);
          await logout();
        }
      }

      // Finish loading regardless of outcome
      unLoading();
    };

    initializeAuth();

    // Optional: Set up token refresh interval
    const refreshInterval = setInterval(async () => {
      if (authToken) {
        await verifyAndRefreshToken(authToken);
      }
    }, 15 * 60 * 1000); // Check every 15 minutes

    return () => clearInterval(refreshInterval);
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
