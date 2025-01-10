// LoginContext.js
import React, { createContext, useContext, useState } from "react";

// Create context for login
const LoginContext = createContext();

// Custom hook to use login context
export const useLogin = () => {
  return useContext(LoginContext);
};

// LoginProvider component
export const LoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("access_token") ? true : false
  );

  const login = (token) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  return (
    <LoginContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
