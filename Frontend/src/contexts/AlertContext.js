  import { createContext, useContext, useEffect, useState } from "react";

  const AlertContext = createContext();

  export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);
    const [phaseAlert, setPhaseAlert] = useState({ visible: false, type: "" });
    useEffect(()=>{
      if(alerts.length === 0) return;
      const timeoutId = setTimeout(()=>{
        setAlerts((prev)=>prev.slice(1));
      },10000);
      return()=>{
        clearTimeout(timeoutId);
      }
    },[alerts])
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
