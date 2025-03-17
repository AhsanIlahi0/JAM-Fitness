import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;

      axios.get(`${API}/employees/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setCurrentUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user details:", err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API}/token/`, { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      const decodedToken = jwtDecode(access);
      const userId = decodedToken.user_id;

      const userResponse = await axios.get(`${API}/employees/${userId}/`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      setCurrentUser(userResponse.data);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
