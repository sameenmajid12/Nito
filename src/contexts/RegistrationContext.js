import { createContext, useCallback, useContext, useState } from "react";

const RegistrationContext = createContext();

const initialRegistrationState = {
  fullname: "",
  email: "",
  password:"",
  schoolId: "",
  tags: [],
  profilePic:null
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
    initialRegistrationState
  };
  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
export const useRegistration = () => useContext(RegistrationContext);
 
