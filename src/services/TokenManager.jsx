import {jwtDecode} from "jwt-decode";

const TokenManager = {
    getAccessToken: () => localStorage.getItem("accessToken"),
    getClaims: () => {
        if (!localStorage.getItem("claims")) {
            return undefined;
        }
        return JSON.parse(localStorage.getItem("claims"));
    },
    setAccessToken: (token) => {
        localStorage.setItem("accessToken", token);
        const claims = jwtDecode(token);
        localStorage.setItem("claims", JSON.stringify(claims));
        return claims;
    },
    checkExpiration: () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          return true;
        }
    
        try {
          const decoded = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);
          return decoded.exp < currentTime;
        } catch (error) {
          console.error('Error decoding token:', error);
          return true;
        }
      },
    clear: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("claims");
    }
}

export default TokenManager;