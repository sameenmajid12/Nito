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
import { useAlert } from "./AlertContext";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const { addAlert } = useAlert();
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
  useEffect(() => {
    if (userError) {
      addAlert("error", userError);
    }
  }, [userError]);
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
        const { updatedUser } = response.data;
        setUser(updatedUser);
        if (updates.tags) {
          addAlert("success", "Tags updated");
        } else {
          addAlert("success", "Information updated");
        }
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
      const { profilePic } = response.data;
      setUser((prev) => ({ ...prev, profilePic }));
      addAlert("success", "Updated picture");
    } catch (e) {
      console.error("Error updating profile pic: ", e);
      setUserError(e);
    }
  };
  const removeConnection = async (userToRemoveId) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/user/remove-connection`,
        { userToRemoveId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { revealedUsers, savedConversations, archivedConversations } =
        response.data;
      setUser((prev) => ({
        ...prev,
        revealedUsers,
        savedConversations,
        archivedConversations,
      }));
      addAlert("info", "Connection removed");
    } catch (e) {
      console.error("Error removing connection: ", e);
      addAlert(e);
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
  const getConversation = async (otherUser) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/conversation/with/${otherUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.conversation;
    } catch (e) {
      addAlert("error", "Convo not found");
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
        setUser,
        getConversation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
