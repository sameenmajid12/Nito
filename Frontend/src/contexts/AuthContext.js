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

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);
  const [isLoadingRegistration, setIsLoadingRegistration] = useState({
    skipButton: false,
    finishButton: false,
  });
  useEffect(() => {
    const loadTokensAndVerify = () => {
      try {
      } catch (e) {}
    };
  }, []);
  const authenticateUser = () => {
    setIsAuthenticated(true);
  };
  const refreshAccessToken = () => {
    try {
    } catch (e) {}
  };
  const verifyAccessToken = () => {
    try {
    } catch (e) {}
  };
  const login = (loginData) => {
    try {
      //API CALL TO LOGIN AND RECEIVE TOKEN
    } catch (e) {}
  };
  const register = async (registrationData, skipped) => {
    setAuthError(null);
    setIsLoadingRegistration(
      skipped
        ? { skipButton: true, finishButton: false }
        : { skipButton: false, finishButton: true }
    );
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      //API CALL TO REGISTER THE USER, SETISLOADINGREGISTRATION TO FALSE AND SETISREGISTRATIONCOMPLETED TO TRUE

      setIsRegistrationCompleted(true);
      setToken("PoopToken");
    } catch (e) {
      console.error("Registration failed:", e);
      setIsRegistrationCompleted(false);
    } finally {
      setIsLoadingRegistration({ skipButton: false, finishButton: false });
    }
  };
  const logout = () => {};
  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        authenticateUser,
        authError,
        login,
        register,
        logout,
        isLoadingAuth,
        isRegistrationCompleted,
        isLoadingRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
