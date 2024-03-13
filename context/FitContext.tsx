import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RefreshToken } from "@/utils/refresh-token";
import { components } from "@/utils/generated-schema";

interface FitProviderProps {
  userToken: components["schemas"]["AuthenticationResponse"] | null;
  setUserToken: (
    userToken: components["schemas"]["AuthenticationResponse"] | null,
  ) => void;
}

const Context = createContext<FitProviderProps | undefined>(undefined);

const FitContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<
    components["schemas"]["AuthenticationResponse"] | null
  >(null);
  const [tokenGetTime, setTokenGetTime] = useState<Date | null>(null);

  useEffect(() => {
    const localUserToken = window.localStorage.getItem("userToken");

    if (localUserToken) {
      setUserToken(
        JSON.parse(
          localUserToken,
        ) as components["schemas"]["AuthenticationResponse"],
      );
      setTokenGetTime(new Date());
    }
  }, [setUserToken, setTokenGetTime]);

  useEffect(() => {
    if (userToken)
      window.localStorage.setItem("userToken", JSON.stringify(userToken));

    if (tokenGetTime)
      window.localStorage.setItem("tokenGetTime", JSON.stringify(tokenGetTime));
  }, [userToken, tokenGetTime]);

  useEffect(() => {
    const localUserToken = window.localStorage.getItem("userToken");

    if (localUserToken) {
      const parsedToken = JSON.parse(
        localUserToken,
      ) as components["schemas"]["AuthenticationResponse"];

      RefreshToken(parsedToken).then((userToken) => {
        if (userToken) {
          setUserToken(userToken);
        } else {
          setUserToken(null);
          setTokenGetTime(null);
        }
      });
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userToken && tokenGetTime) {
        const currentTime = new Date();
        const timeDiff = currentTime.getTime() - tokenGetTime.getTime();
        if (timeDiff > 60 * 1000) {
          RefreshToken(userToken).then((userToken) => {
            if (userToken) {
              setUserToken(userToken);
              setTokenGetTime(new Date());
            }
          });
        }
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userToken, tokenGetTime]);

  const value = useMemo(
    () => ({ userToken, setUserToken }),
    [userToken, setUserToken],
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
