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
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { API_BASE_URL } from "@env";
import {useAlert} from './AlertContext'
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const {addAlert} = useAlert();
  const [userError, setUserError] = useState(false);
  useEffect(() => {
    const getUserAfterVerifyingTokens = async () => {
      setIsLoadingUser(true);
      try {
        console.log("Logging in...");
        if (!token || !isAuthenticated) {
          return;
        }
        const response = await axios.get(`${API_BASE_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const { user } = response.data;
          setUser(user);
        } else {
          throw new Error("Failed to retrieve user");
        }
      } catch (e) {
        console.error("User retrieval error: ", e);
      } finally {
        setIsLoadingUser(false);
      }
    };
    if (isAuthenticated) {
      getUserAfterVerifyingTokens();
    } else {
      setUser(null);
    }
  }, [isAuthenticated, token]);

  const updateUser = async (updates) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/user/update`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUser(response.data);
        addAlert("success","Information updated")
      }
    } catch (e) {
      console.error("Error updating user: ", e);
      setUserError(e);
    }
  };
  const updateProfilePic = async (newProfilePic) => {
    try {
      console.log("Updating profile picture");
      const formData = new FormData();
      formData.append("profilePic", newProfilePic);
      const response = await axios.patch(
        `${API_BASE_URL}/user/update-profilePic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const { profilePic } = response.data;
        setUser((prev) => ({ ...prev, profilePic }));
      } else {
        throw new Error("");
      }
    } catch (e) {
      console.error("Error updating profile pic: ", e);
      setUserError(e);
    }
  };
  const removeConnection = async (userToRemoveUsername) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/user/remove-connection`,
        userToRemoveUsername,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const { filteredConnections } = response.data;
        setUser((prev) => ({ ...prev, connections: filteredConnections }));
      } else {
        throw new Error("");
      }
    } catch (e) {
      console.error("Error removing connection: ", e);
      setUserError(e);
    }
  };
  const reportUser = async (userToReportUsername, data) => {
    try {
      await axios.post(
        `${API_BASE_URL}/user/report`,
        { reportedUserUsername: userToReportUsername, reportData: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.error("Error removing connection: ", e);
      setUserError(e);
    }
  };
  const blockUser = async (userToBlockUsername) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/block`,
        userToBlockUsername,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const { blockedUsers } = response.data;
        setUser((prev) => ({ ...prev, blockedUsers }));
      } else {
        throw new Error("");
      }
    } catch (e) {
      console.error("Error blocking user: ", e);
      setUserError(e);
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        isLoadingUser,
        userError,
        updateProfilePic,
        removeConnection,
        reportUser,
        blockUser,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);

/*
 useEffect(() => {
    const now = new Date();
    setUser({
      id: "8914872198471982",
      fullName: "Sameen Majid",
      email: "srm341@scarletmail.rutgers.edu",
      school: {
        name: "Rutgers University",
        id: "85928751",
        emailDomain: "scarletmail.rutgers.edu",
      },
      profilePicUrl: null,
      tags: ["mma", "money", "web dev"],
      socialMedia: {
        instagram: "samin_raiyan",
        linkedin: "",
        snapchat: "samin.raiyan1",
        discord: "",
      },
      bio: "Hey guys! My name is Sameen, I am the creator of Nito and I'm happy to have matched with you and I hope all of you have a great time on my app!",
      major: "Computer Science",
      year: 2025,
      password: "Itsabigsecret24!",
      revealedUsers: [],
      savedConversations: [],
      blockedUsers: [],
      phoneNumber: "5166679552",
      currentMatch: {
        id: "12532543",
        user1: { id: "8914872198471982"  },
        user2: { id: "12805141", username:"user12447219", fullName:"Mike Ross" },
        lastMessage: {
          text: "No you eat ma poopy",
          sender: "8914872198471982",
          receiver: "12805141",
          timestamp: Date.now(),
          conversation: "12532543",
        },
        lastReadMessage: { user1: {}, user2: {} },
        user1Revealed: false,
        user2Revelead: false,
        isActive: true,
        similarTags:["Valorant", "Playboi Carti", "Kendrick Lamar", "Rihnanna", "Kai Cenat"],
        messages: [
          {
            text: "Hey",
            sender: "8914872198471982",
            receiver: "12805141",
            timestamp: Date.now(),
            conversation: "12532543",
            id:"1298741"
          },
          {
            text: "Hey poopy",
            sender: "12805141",
            receiver: "8914872198471982 ",
            timestamp: Date.now(),
            conversation: "12532543",
            id:"907109842"
          },

          {
            text: "Eat ma poopy",
            sender: "12805141",
            receiver: "8914872198471982 ",
            timestamp: Date.now(),
            conversation: "12532543",
            id:"9102764871"
          },
          {
            text: "No you eat ma poopy",
            sender: "8914872198471982",
            receiver: "12805141",
            timestamp: Date.now(),
            conversation: "12532543",
            id:"7361653"
          },
        ],
        startTime: now,
        endTime: new Date(now.getTime() + 30 * 60 * 1000),
        graceEndTime: new Date(now.getTime() + 35 * 60 * 1000),
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastActive: Date.now(),
    });
  }, []);* */
