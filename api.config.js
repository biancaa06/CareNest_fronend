import axios from 'axios';
import TokenManager from './src/services/TokenManager.jsx';

const api = axios.create({
    baseURL: import.meta.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = TokenManager.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = TokenManager.getRefreshToken();
                if (!refreshToken) {
                    throw new Error("Refresh token not available");
                }

                console.log("Sending refresh token:", refreshToken);

                const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/auth/refresh_token`, {
                    refreshToken,
                });

                console.log("Refresh token response:", response.data);

                const { accessToken } = response.data;
                if (!accessToken) {
                    throw new Error("Failed to retrieve new access token");
                }

                TokenManager.setAccessToken(accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                TokenManager.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default api;
