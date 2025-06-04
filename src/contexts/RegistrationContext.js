import { createContext, useCallback, useContext, useState } from "react";

const RegistrationContext = createContext();

const initialRegistrationState = {
  fullname: "",
  email: "",
  password:"",
  schoolId: "",
  tags: [],
};

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState(
    initialRegistrationState
  );
  const updateRegistrationData = useCallback((newData) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  }, []);
  const resetRegistration = useCallback(() => {
    setRegistrationData(initialRegistrationState);
  });
  const value = {
    registrationData,
    updateRegistrationData,
    resetRegistration,
  };
  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === null) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
};
