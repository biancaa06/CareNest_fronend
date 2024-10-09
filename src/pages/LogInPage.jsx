import React from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-green-50">
      <div className="login-container bg-white shadow-md rounded-lg p-5 max-w-md w-full">
        <h2 className="text-center mb-4 text-green-700">Login to CareNest</h2>
        <form>
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
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label text-gray-700" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
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
