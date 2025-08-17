import { createContext, useContext, useState } from "react";
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    visible: false,
    name: null,
    data: null,
  });

  const openModal = (data, name) => {
    if (
      name !== "logoutModal" &&
      name !== "notificationModal" &&
      (!name || !data)
    ) {
      return;
    }
    setModalState({ visible: true, data: data, name: name });
  };

  const closeModal = () => {
    setModalState({ visible: false, data: null, name: null });
  };
  const updateModalData = (newData) => {
    setModalState((prev) => ({ ...prev, data: { ...prev.data, ...newData } }));
  };
  return (
    <ModalContext.Provider
      value={{ modalState, openModal, closeModal, updateModalData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
