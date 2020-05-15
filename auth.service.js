class AuthService {
  setToken(token) {
    localStorage.setItem("accToken", token);
  }

  getToken() {
    const token = localStorage.getItem("accToken");

    if (token) {
      return token;
    }
    return null;
  }

  isAuthenticated() {
    return this.getToken() === null ? false : true;
  }

  logout() {
    localStorage.removeItem("accToken");
  }
}

export default new AuthService();
