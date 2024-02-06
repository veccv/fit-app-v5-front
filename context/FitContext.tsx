import React, { createContext, FC, ReactNode, useMemo, useState } from "react";

interface FitProviderProps {
  actualTab: string;
  setActualTab: (actualTab: string) => void;
}

const Context = createContext<FitProviderProps | undefined>(undefined);

const FitContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [actualTab, setActualTab] = useState<string>("main");

  const value = useMemo(
    () => ({ actualTab, setActualTab }),
    [actualTab, setActualTab],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFitContext = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export default FitContext;
