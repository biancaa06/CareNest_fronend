import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './handlers/Logout';

const Navbar = ({ claims, onLogout }) => {
  return (
    <nav className="bg-green-600 text-white shadow-lg z-50 w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center">
          <img
            src="/images/carenest_logo.png"
            alt="CareNest Logo"
            className="navbar-logo"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/announcements" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
            <i className="fas fa-bullhorn"></i> Announcements
          </Link>
          <Link to="/caretakers" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
            <i className="fas fa-user-nurse"></i> Caretakers
          </Link>
          {claims?.roles?.includes('MANAGER') && (
            <Link to="/posts" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
              <i className="fa-regular fa-paper-plane"></i> My posts
            </Link>
          )}
          {claims?.roles?.includes('MANAGER') && (
            <Link to="/managersManagement" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
              <i className="fas fa-user-cog"></i> Managers
            </Link>
          )}
          {claims?.roles?.includes('MANAGER') && (
            <Link to="/sicknesses" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
              <i className="fa-solid fa-bacterium"></i> Sicknesses
            </Link>
          )}

          {(claims?.roles?.includes('CARETAKER') || claims?.roles?.includes('PATIENT')) && (
            <Link to="/messages" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
              <i className="fas fa-user-cog"></i> Messages
            </Link>
          )}
        </div>

        {claims?.userId &&(
            <Link to={`/profile/${claims.userId}`} 
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <img className="w-8 h-8 rounded-full" src="/images/default_profile.png" alt="user photo" />
            </Link>
          )
        }

        {claims ? (
          <Logout onLogout={onLogout} />
        ) : (
          <Link to="/login" className="text-white font-bold hover:bg-green-700 px-4 py-2 rounded">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
