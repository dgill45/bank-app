import React from 'react';
import { useAuth } from '../context/AuthContext'

function SignUp() {

    const {username, setUsername, email, setEmail, password, setPassword, signUp } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    signUp();
  };

  return (
    <form onSubmit={handleSubmit}>
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
