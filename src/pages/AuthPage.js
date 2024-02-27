import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

function AuthPage() {
  const { login, signUp, setEmail, setPassword, email, password } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    setIsSignUp(location.state?.isSignUp ?? true);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? `${apiUrl}/signup` : `${apiUrl}/login`;

    try {
      const response = await axios(isSignUp ? signUp(email, password) :login(email, password));
      console.log('Response: ', response);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data: error);
      // Handle errors (e.g., user already exists, wrong credentials)
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required />
        </label>
        <label>
          Password:
          <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required />
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
