import { createContext, useState } from 'react';

export const LoginStatusContext = createContext("login");

export const LoginStatusProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState("login");

  return (
    <LoginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </LoginStatusContext.Provider>
  );
}