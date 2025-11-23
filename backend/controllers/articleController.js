import articleModel from '../models/articleModel.js';

export const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.getAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

export const getArticlesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        if (category !== 'fashion' && category !== 'beauty') {
        return res.status(400).json({ message: 'Catégorie non valide' });
        }
        
        const articles = await articleModel.getByCategory(category);
        
        res.status(200).json(articles); 

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

export const createArticle = async (req, res) => {
    try {
        const { title, content, imageUrl, category } = req.body;
        if (!title || !content || !imageUrl || !category) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
        }
        const newArticleId = await articleModel.create({ title, content, imageUrl, category });
        res.status(201).json({ message: 'Article créé avec succès', id: newArticleId });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await articleModel.delete(id);
        if (affectedRows === 0) {
        return res.status(404).json({ message: 'Article non trouvé' });
        }
        res.status(200).json({ message: 'Article supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};