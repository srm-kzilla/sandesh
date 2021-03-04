import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  setIsAuth: (_isAuth: boolean) => {},
  login: (_token: string) => {},
  signOut: () => {},
});

const AuthContextProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
  };

  console.log("token checked");

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
