// auth.js
export const isAuthenticated = () => {
  // Check for an authentication token in local storage
  return !!localStorage.getItem('authToken');
};

export const authenticate = (token) => {
  // Store the authentication token in local storage
  localStorage.setItem('authToken', token);
};

export const logout = () => {
  // Remove the authentication token from local storage
  localStorage.removeItem('authToken');
};
