/**
 * AuthContext
 *
 * This context provides a global state management solution for user authentication within the application.
 * It manages the core authentication state, including the user's authentication token,
 * their authenticated status, and loading/error indicators for various authentication processes.
 * The primary goal is to centralize authentication logic and make the authentication
 * status readily available to any component in the application tree.
 *
 * On successful login or registration, the context is designed to store an access token
 * received from the backend, which is then used for subsequent authenticated API requests.
 *
 * - `token`: The authentication token received from the backend after login or registration. (null if not
 *    authenticated)
 * - `isAuthenticated`: A boolean indicating if the user is currently authenticated.
 * - `authError`: Stores any general authentication error messages.
 * - `isLoadingAuth`: A boolean indicating if a general authentication process (e.g., initial token
 *    verification on app start) is in progress.
 * - `isRegistrationCompleted`: A boolean indicating if the multi-step registration process has been
 *    successfully completed.
 * - `isLoadingRegistration`: An object `{ skipButton: boolean, finishButton: boolean }` indicating the
 *    loading state of specific buttons during the registration process.
 *
 * Usage:
 * Import { useAuth } from './AuthContext';
 * const { isAuthenticated, token, login, logout, isLoadingAuth } = useAuth();
 */

import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "@env";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  useEffect(() => {
    const loadTokensAndVerify = async () => {
      /*await SecureStore.deleteItemAsync("accessToken");
       await SecureStore.deleteItemAsync("refreshToken");*/
      setIsLoadingAuth(true);
      try {
        const storedAccessToken = await SecureStore.getItemAsync("accessToken");
        if (storedAccessToken) {
          const verified = await verifyAccessToken(storedAccessToken);
          if (!verified) {
            const newAccessToken = await refreshAccessToken();
            if (!newAccessToken) {
              throw new Error("Failed to refresh token");
            } else {
              setIsAuthenticated(true);
            }
          } else {
            setIsAuthenticated(true);
          }
        } else {
          throw new Error("No access token found");
        }
      } catch (e) {
        logout();
      } finally {
        setIsLoadingAuth(false);
      }
    };
    loadTokensAndVerify();
  }, []);
  const getStartedAfterRegistration = () => {
    setIsAuthenticated(true);
    setIsRegistrationCompleted(false);
  };
  const refreshAccessToken = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (!refreshToken) {
        logout();
        return;
      }
      const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });
      console.log("Refreshing access token on frontend...");

      const { accessToken } = response.data;
      await SecureStore.setItemAsync("accessToken", accessToken);
      setToken(accessToken);
      return accessToken;
    } catch (e) {
      console.log("Token error: ", e);
      logout();
    }
  };
  const verifyAccessToken = async (accessToken) => {
    try {
      await axios.get(`${API_BASE_URL}/auth/test-token`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Verifying access token on frontend...");
      return true;
    } catch (e) {
      console.error("Token error: ", e);
      return false;
    }
  };

  const login = async (loginData) => {
    setIsLoadingLogin(true);
    setAuthError(false);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginData
      );
      const { accessToken, refreshToken } = response.data;
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      setToken(accessToken);
      setIsAuthenticated(true);
    } catch (e) {
      setAuthError(true);
    } finally {
      setIsLoadingLogin(false);
    }
  };
  const register = async (registrationData) => {
    setAuthError(false);
    try {
      const formData = new FormData();
      formData.append("fullname", registrationData.fullname);
      formData.append("email", registrationData.email);
      formData.append("password", registrationData.password);
      formData.append("username", registrationData.username);

      formData.append("school", JSON.stringify(registrationData.school));
      formData.append("tags", JSON.stringify(registrationData.tags));
      formData.append("profilePic", registrationData.profilePic);

      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsRegistrationCompleted(true);
      const { accessToken, refreshToken } = response.data;
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      setToken(accessToken);
    } catch (e) {
      setAuthError(true);
      setIsRegistrationCompleted(false);
    } finally {
      setIsLoadingRegistration(false);
    }
  };
  const sendVerificationEmail = async (email) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/send-verification`, {
        email: email,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const verifyEmail = async (email, code, type) => {
    setIsLoadingRegistration(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-email`, {
        email,
        code: code.join(""),
        type,
      });
      return {
        verified: true,
        message: response.data.message,
        resetToken: response.data.resetToken,
      };
    } catch (e) {
      setIsLoadingRegistration(false);
      return { verified: false, message: e.response?.data?.message };
    }
  };
  const logout = async () => {
    setIsLoadingAuth(true);
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      setToken(null);
      setIsAuthenticated(false);
      setAuthError(null);
    } catch (e) {
      console.error("Error during logout: ", e);
      setAuthError("Failed to log out properly.");
    } finally {
      setIsLoadingAuth(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        getStartedAfterRegistration,
        authError,
        isLoadingLogin,
        login,
        register,
        logout,
        isLoadingAuth,
        isRegistrationCompleted,
        isLoadingRegistration,
        verifyEmail,
        sendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
