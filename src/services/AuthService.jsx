import api from "../../api.config";
import TokenManager from "./TokenManager";

const AuthService = {
    async login(email, password) {
        try {
            const response = await api.post('/auth/login', { email, password });

            const { accessToken, refreshToken } = response.data;
            if (!accessToken || !refreshToken) {
                throw new Error("Invalid login response: Tokens missing");
            }

            const claims = TokenManager.setAccessToken(accessToken);
            TokenManager.setRefreshToken(refreshToken);

            return claims;
        } catch (error) {
            console.error("Error during login:", error.response?.data || error.message);
            throw error;
        }
    },

    async refreshToken() {
        try {
          const refreshToken = TokenManager.getRefreshToken();
          if (!refreshToken) {
            throw new Error('Refresh token not available');
          }
    
          const response = await api.post('/auth/refresh_token', { refreshToken });
          console.log("Backend response data:", response.data);
    
          const { accessToken } = response.data;
          if (!accessToken) {
            throw new Error('Failed to retrieve new access token');
          }
    
          const claims = TokenManager.setAccessToken(accessToken);
          return claims;
        } catch (error) {
          console.error('Error refreshing token:', error);
          throw error;
        }
      },
};

export default AuthService;
