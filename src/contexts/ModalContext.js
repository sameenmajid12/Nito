import { createContext, useContext, useState } from "react";
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{ visible, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);