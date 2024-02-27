// Context API example
// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [first_name, setFirstName] = useState(''); 
  const [last_name, setLastName] = useState('');
  const [customer, setCustomer] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    const login = async (email, password) => {
      try {
        const response = await axios.post(`${apiUrl}/login`, { email, password });
        setCustomer(response.data); // Assuming the response data includes user info
      } catch (error) {
        console.error("Login error:", error);
        // Handle errors, e.g., show a message to the user
      }
    };

    const logout = async () => {
      try {
        await axios.post('/logout');
        setCustomer(null); // Clear user from context
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    const signUp = async () => {
      try {
        const response = await axios.post(`${apiUrl}/customers`, {
          customer: {
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
    }

      
    const getCustomerDetails = async () => {
      if (customer && customer.id) {
      try {
        const response = await axios.get(`${apiUrl}/customers/${customer.id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching customer details:", error);
        return null; 
      }
    }
  }
    


  return (
    <AuthContext.Provider value={{ 
      customer,
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
      setLastName,
      getCustomerDetails
    }}>
      {children}
    </AuthContext.Provider>
  );
};
