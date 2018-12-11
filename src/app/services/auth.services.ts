export class AuthService {

  isAuth = false;

  storeToken(token) {
    const serialized = JSON.stringify(token);
    localStorage.setItem('token', serialized);
  }

  retrieveToken() {
    const serialized = localStorage.getItem('token');
    return JSON.parse(serialized);
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  logIn(token) {
    this.storeToken(token);
    this.isAuth = true;
  }

  logOut() {
    this.clearToken();
    this.isAuth = false;
  }

  checkIfAuth() {
    const token = this.retrieveToken();
    return token !== null;
  }

}
