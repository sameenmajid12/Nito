import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  useEffect(() => {
    const loadTokensAndVerify = () => {};
  }, []);
  const refreshAccessToken = () => {};
  const verifyAccessToken = () => {};
  const login = () => {};
  const register = () => {};
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
