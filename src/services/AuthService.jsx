import api from "../../api.config";
import TokenManager from "./TokenManager";

const AuthService = {
    login: (email, password) => api.post('/auth', { email, password })
        .then(response => response.data.accessToken)
        .then(accessToken => TokenManager.setAccessToken(accessToken))
}

export default AuthService;