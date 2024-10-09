import React from 'react';
import '../css/signup.css';

const SignUp = () => {
  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-green-50 pt-5">
      <div className="signup-container bg-white shadow-md rounded-lg p-5 max-w-md w-full">
        <h2 className="text-center mb-4 text-green-700">Sign Up for CareNest</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-lg text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="form-control input-field"
              id="name"
              placeholder="Enter your full name"
              required
            />
          </div>
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
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-lg text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control input-field"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 submit-button">
            <i className="fas fa-user-plus"></i> Sign Up as Patient
          </button>
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-outline-success w-45 secondary-button">
              <i className="fas fa-user-nurse"></i> Sign Up as Caretaker
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <a href="/login" className="text-green-600 hover:text-green-700">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
