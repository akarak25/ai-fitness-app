import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL
  const API_URL = 'http://localhost:5000/api';

  // Check if user is logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userInfo = localStorage.getItem('userInfo');
        
        if (userInfo) {
          const parsedUser = JSON.parse(userInfo);
          setUser(parsedUser);
          
          // Set auth header for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/users`, userData);
      
      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Set auth header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setUser(data);
      setError(null);
      return data;
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Kayıt sırasında bir hata oluştu'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      
      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Set auth header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setUser(data);
      setError(null);
      return data;
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Giriş sırasında bir hata oluştu'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('userInfo');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${API_URL}/users/profile`, userData);
      
      // Update localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      setUser(data);
      setError(null);
      return data;
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Profil güncellenirken bir hata oluştu'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};