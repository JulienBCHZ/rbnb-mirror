import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const login = async (id, token) => {
    setUserID(id);
    setUserToken(token);
    const authValues = JSON.stringify({
      id: id,
      token: token,
    });
    // console.log("AUTH :", authValues);
    await AsyncStorage.setItem("userAuth", authValues);
  };

  const userAuth = async () => {
    const authStored = await AsyncStorage.getItem("userAuth");

    if (authStored) {
      const userAuthValues = JSON.parse(authStored);
      console.log("AUTH VALUES :", userAuthValues.token);
      setUserID(userAuthValues.id);
      setUserToken(userAuthValues.token);
    } else {
      return null;
    }
  };

  const logout = async () => {
    setUserID(null);
    setUserToken(null);
    await AsyncStorage.removeItem("userAuth");
  };

  return (
    <AuthContext.Provider
      value={{ userID, userToken, login, logout, userAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
