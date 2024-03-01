import { ReactNode, createContext, useContext, useState } from "react";

interface PopupContextProviderProps {
  children: ReactNode;
}
interface PopupContextProps {
  errorMessage: string;
  infoMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
  clearMessages: () => void;
}
const PopupContext = createContext({} as PopupContextProps);

export function usePopupContext() {
  return useContext(PopupContext);
}

export function PopupContextProvider({ children }: PopupContextProviderProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const clearMessages = () => {
    setErrorMessage("");
    setInfoMessage("");
  };
  return (
    <PopupContext.Provider
      value={{
        errorMessage,
        infoMessage,
        setErrorMessage,
        setInfoMessage,
        clearMessages,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}
