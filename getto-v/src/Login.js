// src/Login.js
import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    console.log('Logging in with:', { email, password });
    onLogin();
  };
  
  const handleForgotPassword = () => {
      // In the future, you can add logic here to show a password reset modal
      alert("Forgot Password functionality has not been implemented yet.");
  };

  return (
    <div className="login-container">
      <div className="login-showcase">
        <h1 className="logo-text"><img src="getto.svg" alt="" /></h1>
      </div>

      <div className="login-form-wrapper">
        <div className="login-form">
          <h2>Log In</h2>
          
          <form onSubmit={handleLoginSubmit}>
            {error && <p className="login-error">{error}</p>}
            
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="password-toggle-icon"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="form-options">
              <div className="form-check">
                <input type="checkbox" id="rememberMe" className="form-check-input" />
                <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
              </div>
              
              {/* --- THIS IS THE CORRECTED ELEMENT --- */}
              {/* It is now a button, which is semantically correct. */}
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="forgot-password-link"
              >
                Forgot Password?
              </button>

            </div>

            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;