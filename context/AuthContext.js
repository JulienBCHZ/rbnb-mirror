import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const login = async (id, token) => {
    setUserID(id);
    setUserToken(token);
    await AsyncStorage.setItem("userAuthId", id);
    await AsyncStorage.setItem("userAuthToken", token);
  };

  const logout = async () => {
    setUserID(null);
    setUserToken(null);
    await AsyncStorage.removeItem("userAuthId");
    await AsyncStorage.removeItem("userAuthToken");
  };

  useEffect(() => {
    const getUserAuth = async () => {
      try {
        const storedId = await AsyncStorage.getItem("userAuthId");
        const storedToken = await AsyncStorage.getItem("userAuthToken");

        if (storedId && storedToken) {
          console.log("AUTH VALUES :", storedId);
          setUserID(storedId);
          setUserToken(storedToken);
        }
      } catch (error) {
        console.log("asyncStorage error :", error);
      }
    };
    getUserAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userID, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
