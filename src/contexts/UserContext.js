import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token, isAuthenticated, isLoadingAuth, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState(false);
  const fetchUser = useCallback(() => {}, []); // WHEN THE USER BECOMES AUTHENTICATED AND A TOKEN IS RECEIVED FROM THE BACKEND FETCH THE USER

  useEffect(() => {
    if (isAuthenticated && token && !isLoadingAuth) {
      fetchUser();
    } else {
      setUser(null);
      setIsLoadingUser(false);     
    }
  }, [isAuthenticated, token, isLoadingAuth]);
  const updateUser = (updates) => {};
  const removeConnection = (user) => {};
  const reportUser = (user, data) => {};
  const blockUser = (user) => {}
  return (
    <UserContext.Provider
      value={{ user, updateUser, isLoadingUser, userError, removeConnection, reportUser, blockUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
