import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(false);
  useEffect(() => {
    const loadTokensAndVerify = () => {
      try {
      } catch (e) {}
    };
  }, []);
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
    } catch (e) {}
  };
  const register = (registrationData) => {
    try {
    } catch (e) {}
  };
  const logout = () => {};
  return (
    <AuthContext.Provider
      value={{
        token: accessToken,
        isAuthenticated,
        authError,
        login,
        register,
        logout,
        isLoadingAuth,
        isLoadingRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
