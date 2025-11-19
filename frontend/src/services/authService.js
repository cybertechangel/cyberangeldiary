import api from './api';

const login = (username, password) => {
  return api.post('/auth/login', {
    username,
    password
  }).then(response => {
    // Si la requête réussit (login OK)
    if (response.data.token) {
      // On stocke le token dans le localStorage
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUserToken = () => {
  return localStorage.getItem('token');
};

const authService = {
  login,
  logout,
  getCurrentUserToken
};


export default authService;