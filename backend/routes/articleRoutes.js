import express from 'express';
import { getAllArticles, getArticlesByCategory, createArticle, deleteArticle } from '../controllers/articleController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// --- Routes Publiques (pour React) ---
router.get('/', getAllArticles); // Page Home
router.get('/category/:category', getArticlesByCategory); // Pages Fashion/Beauty

// --- Routes Protégées (pour l'Admin) ---
// Seul un admin connecté (avec token) peut créer ou supprimer

// POST /api/articles
router.post('/', protect, createArticle);

// DELETE /api/articles/:id
router.delete('/:id', protect, deleteArticle);

export default router;