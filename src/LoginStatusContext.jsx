import { createContext, useState } from 'react';

export const LoginStatusContext = createContext("loggedIn");

export const LoginStatusProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState("loggedIn");

  return (
    <LoginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </LoginStatusContext.Provider>
  );
}