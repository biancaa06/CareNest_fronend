import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white shadow-lg z-50 w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        <a href="/" className="flex items-center">
          <img
            src="/images/carenest_logo.png"
            alt="CareNest Logo"
            className="navbar-logo"
          />
        </a>

        <div className="flex items-center space-x-4">
          <a href="/" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="/announcements" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
            <i className="fas fa-bullhorn"></i> Announcements
          </a>
          <a href="/caretaker" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
            <i className="fas fa-user-nurse"></i> Caretakers
          </a>
        </div>

        <a href="/login" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
          <i className="fas fa-sign-in-alt"></i> Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
