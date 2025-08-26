import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [phaseAlert, setPhaseAlert] = useState({ visible: false, type: "" });
  const addAlert = (state, message) => {
    const _id = Date.now() * Math.random();
    const newAlert = { _id, state, message };
    setAlerts((prev) => [...prev, newAlert]);
  };
  const closeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a._id !== id));
  };
  const closePhaseAlert = () => {
    setPhaseAlert({ visible: false, type: "" });
  };
  const openPhaseAlert = (type) => {
    setPhaseAlert({ visible: true, type });
  };
  return (
    <AlertContext.Provider
      value={{
        alerts,
        addAlert,
        closeAlert,
        phaseAlert,
        closePhaseAlert,
        openPhaseAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
