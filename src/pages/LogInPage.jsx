import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import AuthService from '../services/AuthService.jsx';
import { getManagerById } from '../services/ManagerRepository.jsx';
import TokenManager from '../services/TokenManager.jsx';

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
  

  const getUserDetails = () => {
    const claims = TokenManager.getClaims();

    if (claims?.roles?.includes('MANAGER') && claims?.userId) {
        getManagerById(claims.userId)
            .then(manager => {
                console.log("Manager details fetched:", manager);
            })
            .catch(error => {
                console.error("Error fetching manager details:", error);
            });
    } else {
        console.error("Claims are missing roles or userId is undefined");
    }
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
            <a href="/" className="text-sm text-green-600 hover:text-green-700">
              Forgot your password?
            </a>
          </div>
          <button type="submit" className="btn btn-success w-100 submit-button">
            <i className="fas fa-sign-in-alt"></i> Login as Patient
          </button>
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-outline-success w-45 secondary-button">
              <i className="fas fa-user-nurse"></i> Login as Caretaker
            </button>
            <button type="button" className="btn btn-outline-success w-45 secondary-button">
              <i className="fas fa-user-cog"></i> Login as Manager
            </button>
          </div>
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
