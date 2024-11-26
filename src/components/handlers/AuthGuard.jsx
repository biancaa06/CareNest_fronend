import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenManager from '../../services/TokenManager';

const AuthGuard = ({ claims, setClaims, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (claims && TokenManager.checkExpiration()) {
      TokenManager.clear();
      setClaims(null);
      navigate('/login');
    }
  }, [claims, navigate, setClaims]);

  return children;
};

export default AuthGuard;
