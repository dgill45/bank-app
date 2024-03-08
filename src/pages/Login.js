import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(`Attempting to log in with ${email} and password: ${password}`);
            await login(email, password);
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed: Incorrect email or password');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    value={email} 
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    className='form-control mb-3 mr-sm-2'
                    value={password} 
                    placeholder='Password' 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
}

export default Login;
