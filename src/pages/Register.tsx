import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterService } from '../services/AuthService';
import { Alert } from '@mui/material';


export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string|null>(null);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    setErrorMessage(null); // Clear previous errors
    try {
      // Call RegisterService and handle success
      const result = await RegisterService({username,password});
      if (result.status === 200) {
        localStorage.setItem('token', result.data);
        navigate('/');
      // Redirect or do something on success, e.g., navigate to login page
  } 
}catch (error: any) {
  console.log('error from register page')
      // Handle and display the error message from RegisterService
      setErrorMessage(error.message);
  }
}


  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {errorMessage && (
        <Alert severity="error" onClose={()=>setErrorMessage(null)}>
          {errorMessage}
        </Alert>)}
      <input
        style={{ padding: 10, marginBottom: 20 }}
        name="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        style={{ padding: 10, marginBottom: 20 }}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        name="confirmPassword"
        type="password"
        style={{ padding: 10, marginBottom: 20 }}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button style={{ padding: 10, width: 100 }} onClick={handleClick}>
        LOGIN
      </button>
      <Link to="/login">
      <h2>to  Login</h2>
      </Link>
    </div>
  );
};
