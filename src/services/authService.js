// authService.js
const TOKEN_KEY = 'authToken';
const USER_KEY = 'currentUser';
const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

let timeoutId;

export default {
  // Login function to save user info and token
  login(userProxy) {
    localStorage.setItem(TOKEN_KEY, userProxy.token);
    localStorage.setItem(USER_KEY, JSON.stringify(userProxy));
    // Start idle timeout countdown
    this.startIdleTimeout();
  },

  // Logout function to clear user info and token
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Clear idle timeout countdown
    this.clearIdleTimeout();
  },

  // Get current user from local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  },

  // Get authentication token from local storage
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Start idle timeout countdown
  startIdleTimeout() {
    this.clearIdleTimeout();
    timeoutId = setTimeout(() => {
      this.logout(); // Logout user after idle timeout
    }, IDLE_TIMEOUT);
  },

  // Clear idle timeout countdown
  clearIdleTimeout() {
    clearTimeout(timeoutId);
  }
};
