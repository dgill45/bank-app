import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const {first_name, setFirstName, last_name, setLastName,
            username, setUsername, email, setEmail,
            password, setPassword, signUp } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await signUp();
        navigate('/dashboard');
    } catch (error) {
        console.error('Error signing up:', error)
        alert('Error signing up:')
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>First Name</label>
            <input type="text" 
                   value={first_name} 
                   placeholder = 'First Name'
                   onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
            <label>Last Name</label>
            <input type="text" 
                   value={last_name} 
                   placeholder = 'Last Name'
                   onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
            <label>Username</label>
            <input type="username" 
                   value={username} 
                   placeholder = 'Username'
                   onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
            <label>Email</label>
            <input type="email" 
                   value={email} 
                   placeholder = 'Email'
                   onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <label>Password</label>
            <input type="password"
                   value={password} 
                   placeholder = 'Password'
                   onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
