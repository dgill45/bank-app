import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [first_name, setFirstName] = useState(''); 
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(`${apiUrl}/logged_in`, { withCredentials: true });
      if (response.data.logged_in) {
        setCustomer(response.data.customer);
      }else {
        setCustomer(null);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }
    
    useEffect(() => {      
      checkLoginStatus();
    }, []);
  
    const login = async (email, password) => {
      try {
        const response = await axios.post(`${apiUrl}/login`, { email, password },{ withCredentials: true });
        if (response.data.customer) {
        setCustomer(response.data.customer);
        } // Assuming the response data includes user info
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    };

    const logout = async () => {
      try {
        await axios.delete(`${apiUrl}/logout`, { withCredentials: true });
        setCustomer(null); 
        window.location.href='/' // Redirect to the home page;
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
      checkLoginStatus,
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
