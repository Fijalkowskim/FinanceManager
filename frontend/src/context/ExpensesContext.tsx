import { ReactNode, createContext, useContext, useState } from "react";

interface ExpensesContextProviderProps {
  children: ReactNode;
}
interface ExpensesContextProps {}
const ExpensesContext = createContext({} as ExpensesContextProps);

export function useExpensesContext() {
  return useContext(ExpensesContext);
}

export function ExpensesContextProvider({
  children,
}: ExpensesContextProviderProps) {
  const [disableScroll, setDisableScroll] = useState(false);
  const [apiConnected] = useState(false);
  return (
    <ExpensesContext.Provider
      value={{
        disableScroll,
        setDisableScroll,
        apiConnected,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}
