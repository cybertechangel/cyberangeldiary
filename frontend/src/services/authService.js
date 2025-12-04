import api from './api';

const login = (username, password) => {
  return api.post('/auth/login', {
    username,
    password
  }).then(response => {
    if (response.data.token) {
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