import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

function AuthPage() {
  const { login, logout } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? '/api/signup' : '/api/signin';

    try {
      const response = await axios.post(url, { email, password });
      // Handle response, such as saving the session token
      login(response.data);
      // Redirect user or update UI accordingly

    } catch (error) {
      console.error('Error:', error.response.data);
      // Handle errors (e.g., user already exists, wrong credentials)
    }
  };

    logout = async () => {
    try {
      await axios.post('/api/logout');
      // Clear user session from state management and local storage
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error.response.data);
    }
  };
  
  

    // Inside your component
    const navigate = useNavigate();

    // After successful login
    navigate.push('/dashboard');



  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default AuthPage;
