import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  setIsAuth: (_isAuth: boolean) => {},
  login: (_token: string) => {},
  signOut: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(localStorage.getItem('token') ? true : false);

  const signOut = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  const login = (token: string) => {
    const BearerToken = `Bearer ${token}`;
    localStorage.setItem('token', BearerToken);
    setIsAuth(true);
  };

  console.log('token checked');

  return <AuthContext.Provider value={{ isAuth, setIsAuth, login, signOut }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
