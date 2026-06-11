import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, logoutUser, getUserProfile } from '../modules/auth/api/auth.api';
import { API, setAccessToken } from '../services/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Run automatically when the application boots up to check for active sessions
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await API.post('/api/auth/refresh');
        if (response.data?.accessToken) {
          setAccessToken(response.data.accessToken);
          const profile = await getUserProfile();
          setUser(profile.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setAccessToken(data.accessToken);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    } finally {
      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);