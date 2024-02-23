import { ReactNode, createContext, useContext, useState } from "react";

interface SettingsContextProviderProps {
  children: ReactNode;
}
interface SettingsContextProps {
  disableScroll: boolean;
  setDisableScroll: React.Dispatch<React.SetStateAction<boolean>>;
  apiConnected: boolean;
}
const SettingsContext = createContext({} as SettingsContextProps);

export function useSettingsContext() {
  return useContext(SettingsContext);
}

export function SettingsContextProvider({
  children,
}: SettingsContextProviderProps) {
  const [disableScroll, setDisableScroll] = useState(false);
  const [apiConnected] = useState(false);
  return (
    <SettingsContext.Provider
      value={{
        disableScroll,
        setDisableScroll,
        apiConnected,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
