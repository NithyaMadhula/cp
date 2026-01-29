//Dependecies
const decode = require('jwt-decode');

export const userAuth = {
  isAuthenticated() {
    //Pull Token from session storage
    let user_session = JSON.parse(sessionStorage.getItem('userToken'));
    let access_token;

    //Check if sessionSotrage exists
    user_session
      ? (access_token = user_session.access_token)
      : (access_token = false);

    //Check if token has expired, if so, return false
    try {
      const { exp } = decode(access_token);
      if (Date.now() >= exp * 1000) {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  },
  //Clear session storage to remove auth token
  logout() {
    try {
      localStorage.setItem('signin_formToggle', JSON.stringify(false));
      sessionStorage.clear();
      return true;
    } catch (error) {
      return false;
    }
  },
  decodeToken(token) {
    try {
      let decoded = decode(token);
      return decoded;
    } catch (err) {
      return false;
    }
  },
  getUserToken() {
    try {
      let token = JSON.parse(sessionStorage.getItem('userToken'));

      let payload = {
        token: token.access_token,
        customer: token.customer
      };
      return payload;
    } catch (error) {
      return false;
    }
  },
  getUserRole() {
    let user = JSON.parse(sessionStorage.getItem('userToken'));
    let role = user ? user.role : 'visitor';

    return role;
  },
  getUserSession() {
    try {
      let userSession = JSON.parse(sessionStorage.getItem('userToken'));
      return userSession;
    } catch (error) {
      return false;
    }
  }
};
