import React from 'react';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-green-600 text-white w-full shadow-lg">
      <div className="container-fluid flex justify-between items-center">
        <a href="/" className="navbar-brand">
          <img
            src="/images/carenest_logo.png"
            alt="CareNest Logo"
            className="navbar-logo"
          />
        </a>

        <div className="collapse navbar-collapse justify-center" id="navbarNav">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <a className="nav-link text-white font-bold" href="/">
                <i className="fas fa-home"></i> Home
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
          </ul>
        </div>

        <div className="navbar-login">
          <a className="nav-link text-white font-bold" href="/login">
            <i className="fas fa-sign-in-alt"></i> Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
