import express from 'express';
import { getAllArticles, getArticlesByCategory, createArticle, deleteArticle } from '../controllers/articleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllArticles);
router.get('/category/:category', getArticlesByCategory);

router.post('/', protect, createArticle);
router.delete('/:id', protect, deleteArticle);

export default router;
