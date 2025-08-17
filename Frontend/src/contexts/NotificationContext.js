import React, { createContext, useState, useEffect, useContext } from "react";
import { useUser } from "./UserContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState(user?.notifications);
  const [notificationsUpdated, setNotificationsUpdated] = useState(false);
  const updateNotifications = (newValue, field) => {
    setNotifications((prev) => ({ ...prev, [field]: newValue }));

    if (user.notifications[field] === newValue) {
      setNotificationsUpdated(false);
    } else {
      setNotificationsUpdated(true);
    }
  };
  useEffect(() => {
    if (user) {
      setNotifications(user.notifications);
    }
  }, [user]);
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        updateNotifications,
        notificationsUpdated,
        setNotificationsUpdated,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
