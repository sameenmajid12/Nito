  /**
 * UserContext
 *
 * This context provides global state management for the authenticated user's profile data
 * and associated operations. It fetches the user's detailed information from a backend API
 * and makes this data, along with loading and error states, available application-wide.
 *
 * It integrates with AuthContext, triggering user data fetches when authentication status changes.
 *
 * It expposes:
 * - `user`: The authenticated user's profile object.
 * - `isLoadingUser`: Boolean indicating if user data is being fetched.
 * - `userError`: Boolean indicating if an error occurred during user data fetch.
 * - `updateUser(updates)`: (Placeholder) Updates user profile fields.
 * - `removeConnection(user)`: (Placeholder) Removes a user connection.
 * - `reportUser(user, data)`: (Placeholder) Reports a user.
 * - `blockUser(user)`: (Placeholder) Blocks a user.
 * 
 * Usage:
 * - Import { userUser } from './UserContext';
 * - const { user, updateUser } = useUser();
 */
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
    const fetchUser = useCallback(async () => {
      setIsLoadingUser(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        setUser({
          id: "8914872198471982",
          fullName: "Sameen Majid",
          email: "srm341@scarletmail.rutgers.edu",
          school: "Rutgers University",
          profilePicUrl: null,
          tags: ["mma", "money", "web dev"],
          socialMedia: {
            instagram: "samin_raiyan",
            linkedin: "",
            snapchat: "samin.raiyan1",
            discord: "",
          },
          revealedUsers: [],
          savedConversations: [],
          blockedUsers: [],
          phoneNumber: "516-667-9552",
          currentMatch: null,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          lastActive: Date.now(),
        });
        console.log({
          id: ObejctId,
          fullName: "Sameen Majid",
          email: "srm341@scarletmail.rutgers.edu",
          school: "Rutgers University",
          profilePicUrl: "",
          tags: ["mma", "money", "web dev"],
          socialMedia: {
            instagram: "samin_raiyan",
            linkedin: "",
            snapchat: "samin.raiyan1",
            discord: "",
          },
          revealedUsers: [],
          savedConversations: [],
          blockedUsers: [],
          phoneNumber: "516-667-9552",
          currentMatch: null,
          createdAt: Date,
          updatedAt: Date,
          lastActive: Date,
        })
      } catch (e) {
      } finally {
        setIsLoadingUser(false);
      }
    }, []); // WHEN THE USER BECOMES AUTHENTICATED AND A TOKEN IS RECEIVED FROM THE BACKEND FETCH THE USER

    useEffect(() => {
      console.log('')
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
