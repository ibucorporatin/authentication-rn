import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});
function AuthContextProvider({ children }) {
  const [authToken, setauthToken] = useState();
  useEffect(() => {
    const fetchingToken = async () => {
      const storedtoken = await AsyncStorage.getItem("token");

      if (storedtoken) {
        setauthToken(storedtoken);
      }
    };
    fetchingToken();
  }, []);

  function authenticate(token) {
    setauthToken(token);
    AsyncStorage.setItem("token", token);
  }
  function logout(token) {
    setauthToken();
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthContextProvider;

export const authUseContext = () => {
  return useContext(authContext);
};
