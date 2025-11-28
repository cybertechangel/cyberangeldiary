import api from './api';

const getAllArticles = () => {
    return api.get('/articles');
};

const getArticlesByCategory = (category, page = 1) => {
    return api.get(`/articles/category/${category}?page=${page}&limit=4`);
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