import { createContext, useState } from 'react';

export const LoginStatusContext = createContext("register");

export const LoginStatusProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState("register");

  return (
    <LoginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </LoginStatusContext.Provider>
  );
}