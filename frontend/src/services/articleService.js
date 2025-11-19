import api from './api';

// GET (Public)
const getAllArticles = () => {
  return api.get('/articles');
};

// GET (Public)
const getArticlesByCategory = (category) => {
  return api.get(`/articles/category/${category}`);
};

// POST (Protégé)
const createArticle = (articleData) => {
  // articleData doit être : { title, content, imageUrl, category }
  return api.post('/articles', articleData);
};

// DELETE (Protégé)
const deleteArticle = (id) => {
  return api.delete(`/articles/${id}`);
};

const articleService = {
  getAllArticles,
  getArticlesByCategory,
  createArticle,
  deleteArticle
};


export default articleService;