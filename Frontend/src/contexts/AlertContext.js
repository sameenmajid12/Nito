import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const addAlert = (state, message) => {
    const _id = Date.now() * Math.random();
    const newAlert = { _id, state, message };
    setAlerts((prev) => [...prev, newAlert]);
  };
  const closeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a._id !== id));
  };
  return (
    <AlertContext.Provider value={{ alerts, addAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
