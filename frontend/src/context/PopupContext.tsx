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
  setTimeoutMessage: (
    type: "info" | "error",
    message: string,
    timeout: number
  ) => void;
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
  const setTimeoutMessage = (
    type: "info" | "error",
    message: string,
    timeout: number
  ) => {
    switch (type) {
      case "info":
        setInfoMessage(message);
        break;
      case "error":
        setErrorMessage(message);
        break;
    }
    setTimeout(() => {
      switch (type) {
        case "info":
          setInfoMessage("");
          break;
        case "error":
          setErrorMessage("");
          break;
      }
    }, timeout);
  };
  return (
    <PopupContext.Provider
      value={{
        errorMessage,
        infoMessage,
        setErrorMessage,
        setInfoMessage,
        clearMessages,
        setTimeoutMessage,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}
