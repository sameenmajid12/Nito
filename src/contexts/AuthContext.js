import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingRegistration, setIsLoadingRegistration] = useState({skipButton:false, finishButton:false});
  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);
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
      //API CALL TO LOGIN AND RECEIVE TOKEN
    } catch (e) {}
  };
  const register = (registrationData, skipped) => {
    try {
      setIsLoadingRegistration(skipped?{skipButton:true, finishButton:false}:{finishButton:true,skipButton:false});
      //API CALL TO REGISTER THE USER, SETISLOADINGREGISTRATION TO FALSE AND SETISREGISTRATIONCOMPLETED TO TRUE
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
        isRegistrationCompleted
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
