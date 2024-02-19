import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const { email, setEmail, password, setPassword, login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard'); // Redirect to the dashboard after login
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed: Incorrect email or password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    placeholder='Password' 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
