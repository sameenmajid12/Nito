/**
 * RegistrationContext
 *
 * This context provides a global state management solution for the user registration process.
 * It stores various registration data fields (e.g., school, fullname, email, password, image)
 * across different screens of the registration flow. The idea is that in the first screeen
 * the user will select their school(which will be a schoolObject with the properties of id, 
 * name and emailDomain) this will be stored in registrationData using updateRegisterData. In 
 * the next screen the user will enter more details such as their fullname,their email address, etc. 
 * Again the information is stored using updateRegistrationData. In the final screen the user will
 * type in tags(their interests) and after they are done will select the one of the two buttons. The 
 * two buttons on the final screen are "skip" and "finish" and both of them call the REGISTER function
 * from the authContext
 *
 * It exposes:
 * - registrationData: An object containing all the collected registration information.
 * - updateRegistrationData: A function to merge new data into the existing registrationData.
 * - resetRegistration: A function to clear all registration data back to its initial state.
 *
 * Usage:
 * Import { useRegistration } from './RegistrationContext';
 * const { registrationData, updateRegistrationData } = useRegistration();
 */


import { createContext, useCallback, useContext, useState } from "react";

const RegistrationContext = createContext();

const initialRegistrationState = {
  fullname: "",
  email: "",
  password:"",
  school: "",
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
  };
  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
export const useRegistration = () => useContext(RegistrationContext);
 
