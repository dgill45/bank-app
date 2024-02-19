// Context API example
// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [first_name, setFirstName] = (''); 
  const [last_name, setLastName] = ('');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    const login = async (email, password) => {
      try {
        const response = await axios.post('http://localhost:3000/login', { email, password });
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
              first_name,
              last_name,
              username,
              email,
              password,
          }
        }, { withCredentials: true }); // Important for CORS and cookies
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

      
    const getCustomerDetails = async (customerId) => {
      try {
        // Replace `customerId` in the URL with the actual ID you have
        const response = await axios.get(`http://localhost:3000/customers/${customerId}`);
        return response.data; // Return the customer details
      } catch (error) {
        console.error("Error fetching customer details:", error);
        return null; // Handle error (e.g., return null or throw an error)
      }
    }
  }


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
      first_name,
      setFirstName,
      last_name,
      setLastName
      
       }}>
      {children}
    </AuthContext.Provider>
  );
};
