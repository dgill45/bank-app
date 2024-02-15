// Context API example
// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      setUser(response.data); // Assuming the response data includes user info
    } catch (error) {
      console.error("Login error:", error);
      // Handle errors, e.g., show a message to the user
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser(null); // Clear user from context
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const signUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', {
        user: {
            username,
            email,
            password,
        }
      }, { withCredentials: true }); // Important for CORS and cookies
      console.log(response.data);
      // Handle navigation post-signup (e.g., redirect to login or directly authenticate)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      signUp,
      username,
      setUsername,
      email,
      setEmail,
      password,
      setPassword,
      
       }}>
      {children}
    </AuthContext.Provider>
  );
};
