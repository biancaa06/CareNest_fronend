import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenManager from '../../services/TokenManager';
import AuthService from '../../services/AuthService';

const AuthGuard = ({ claims, setClaims, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      //if logged in => check tokens
      if (claims && TokenManager.checkExpiration()) {
        try {
          const refreshedClaims = await AuthService.refreshToken();
          setClaims(refreshedClaims);
        } catch (error) {
          console.error('Token refresh failed:', error);
          TokenManager.clear();
          WebSocketService.disconnect();
          setClaims(null);
          navigate('/login');
        }
      }
    };

    checkToken();
  }, [claims, navigate, setClaims]);

  return children;
};

export default AuthGuard;
