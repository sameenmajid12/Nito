import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [showRevealPhaseAlert, setShowRevealPhaseAlert] = useState(false);
  const addAlert = (state, message) => {
    const _id = Date.now() * Math.random();
    const newAlert = { _id, state, message };
    setAlerts((prev) => [...prev, newAlert]);
  };
  const closeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a._id !== id));
  };
  const closeRevealPhaseAlert = () => {
    setShowRevealPhaseAlert(false);
  };
  const openRevealPhaseAlert = () => {
    setShowRevealPhaseAlert(true);
  };
  return (
    <AlertContext.Provider
      value={{
        alerts,
        addAlert,
        closeAlert,
        showRevealPhaseAlert,
        closeRevealPhaseAlert,
        openRevealPhaseAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
