import React from 'react';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-green-600 text-white fixed top-0 left-0 w-full shadow-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-center" id="navbarNav">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <a className="nav-link text-white font-bold" href="/">
                <i className="fas fa-home"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white font-bold" href="/services">
                <i className="fas fa-hand-holding-medical"></i> Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white font-bold" href="/announcements">
                <i className="fas fa-bullhorn"></i> Announcements
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white font-bold" href="/caretaker">
                <i className="fas fa-user-nurse"></i> Caretakers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white font-bold" href="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
