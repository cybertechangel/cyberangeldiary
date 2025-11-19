import axios from 'axios';

// Crée une instance d'Axios
const api = axios.create({
  baseURL: '/api' // Le proxy s'occupera du reste
});

/* INTERCEPTEUR :
  À chaque requête qui part, on vérifie si on a un token.
  Si oui, on l'ajoute au header 'Authorization'.
  C'est ce qui nous permettra d'accéder aux routes protégées (POST, DELETE).
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;