import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
    <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
                type="text" 
                value={first_name || ''} 
                placeholder='First Name' 
                onChange={(e) => setFirstName(e.target.value)} 
                required
            />
        </Form.Group>
        <Form.Group className='mb-3' controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
                type="text" 
                value={last_name || ''} 
                placeholder='Last Name' 
                onChange={(e) => setLastName(e.target.value)} 
                required    
            /> 
        </Form.Group>
        <Form.Group className='mb-3' controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="username" 
                value={username || ''} 
                placeholder='Username' 
                onChange={(e) => setUsername(e.target.value)} 
                required
            />
        </Form.Group>
        <Form.Group className='mb-3' controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email" 
                value={email || ''} 
                placeholder='Email' 
                onChange={(e) => setEmail(e.target.value)} 
                required
            />
        </Form.Group>
        <Form.Group className='mb-3' controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password" 
                value={password || ''} 
                placeholder='Password' 
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Sign Up
        </Button>
    </Form>
    );
}

export default SignUp;
