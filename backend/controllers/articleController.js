import articleModel from '../models/articleModel.js';

export const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.getAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getArticlesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4; 

        if (category !== 'fashion' && category !== 'beauty') {
            return res.status(400).json({ message: 'Invalid category' });
        }
        
        const { articles, totalArticles } = await articleModel.getByCategory(category, page, limit);
        
        res.status(200).json({
            articles: articles,
            currentPage: page,
            totalPages: Math.ceil(totalArticles / limit),
            totalArticles: totalArticles
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createArticle = async (req, res) => {
    try {
        const { title, content, imageUrl, category } = req.body;
        if (!title || !content || !imageUrl || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newArticleId = await articleModel.create({ title, content, imageUrl, category });
        res.status(201).json({ message: 'Article created successfully', id: newArticleId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await articleModel.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};