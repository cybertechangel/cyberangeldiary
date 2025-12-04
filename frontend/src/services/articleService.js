import api from './api';
import { PAGINATION } from '../config/constants';

const getAllArticles = () => {
    return api.get('/articles');
};

const getArticlesByCategory = (category, page = 1) => {
    const limit = PAGINATION.ARTICLES_PER_PAGE;
    return api.get(`/articles/category/${category}?page=${page}&limit=${limit}`);
};

const createArticle = (articleData) => {
    return api.post('/articles', articleData);
};

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