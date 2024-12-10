import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import AuthService from '../services/AuthService.jsx';

const Login = ({onLogin}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    AuthService.login(email, password)
      .then((claims) => {
        if (claims) {
          onLogin(claims);
          navigate('/');
        } else {
          console.error("Invalid login response:", claims);
          alert("Login failed! Invalid response from server.");
        }
      })
      .catch((error) => {
        alert("Login failed! Please check your credentials.");
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="page-background">
      <div className="login-container bg-white shadow-md rounded-lg p-5 max-w-md w-full">
        <h2 className="text-center mb-4 text-green-700">Login to CareNest</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-lg text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="form-control input-field"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-lg text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="form-control input-field"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <a href="/reset-password/email" className="text-sm text-green-600 hover:text-green-700">
              Forgot your password?
            </a>
          </div>
          <button type="submit" className="btn btn-success w-80 submit-button">
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
          
        </form>
        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <Link to="/signUp" className="text-green-600 hover:text-green-700">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
