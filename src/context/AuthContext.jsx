import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../axiosConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      setIsAuthenticated(true);
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data && error.response.data.error) {
        return error.response.data.error;
      } else {
        return "An error occurred during login.";
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setIsAuthenticated(false);
      console.log("Logout successful");
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
