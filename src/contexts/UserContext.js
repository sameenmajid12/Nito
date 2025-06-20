import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

/*userSchema = {
  id:ObejctId,
  fullName:Sameen Majidw,
  email:srm341@scarletmail.rutgers.edu,
  school:”Rutgers University”
  profilePicUrl:AWSurl,
  tags:[“mma”, “money”, “web dev”],
  socialMedia:{instagram:”https://instagram
  .com/samin_raiyan”,linkedin:””,snapchat:””},
  revealedUsers:[user],
  savedConversations:[conversation],
  blockedUsers:[user],
  phoneNumber:516-667-9552,
  currentMatch:conversationObjectId
  createdAt: Date,
  updatedAt: Date
  lastActive:Date
},
schoolSchema={
  id: schoolId,
  name: schoolName,
  emailDomain: scarletmail.rutgers.edu
},
conversationSchema = {
  id:ObjectId,
  user1:user1ObjectId,
  user2:user2ObjectId,
  lastMessage:messageObjectId,
  lastReadMessage:{ user1:messageObjectId,
  user2:messageObjectId
  },
  user1Revealed:false,
  user2Revelead:false,
  isActive:true,
  startTime:Date,
  endTime:Date
}
messageSchema={
  sender:userId,
  receiver:userId,
  timestamp: Date,
  text:”Hello”,
  conversation:conversationObjectId
}*/

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { token, isAuthenticated, isLoadingAuth, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState(false);
  const fetchUser = useCallback(async() => {
    try{
      const response = fetch()
    }
    catch(e){

    }
  }, []); // WHEN THE USER BECOMES AUTHENTICATED AND A TOKEN IS RECEIVED FROM THE BACKEND FETCH THE USER

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
  const blockUser = (user) => {};
  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        isLoadingUser,
        userError,
        removeConnection,
        reportUser,
        blockUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
