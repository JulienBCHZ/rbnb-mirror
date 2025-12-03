import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const login = (id, token) => {
    setUserID(id);
    setUserToken(token);
  };

  const logout = () => {
    setUserID(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userID, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
