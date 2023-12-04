import jwtDecode from "jwt-decode";

const AuthService = {
  getToken() {
    return localStorage.getItem("token");
  },
  setToken(token) {
    return localStorage.setItem("token", token);
  },
  removeToken() {
    return localStorage.removeItem("token");
  },
  isAuthenticated() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  },
  isTokenExpired(token) {
    const decode = jwtDecode(token);
    return decode.exp < Date.now / 1000;
  },
};

export default AuthService;
