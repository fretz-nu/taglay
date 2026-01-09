const express = require('express');
const { getArticles, createArticle, updateArticle, toggleArticleStatus, getArticleByName } = require('../controllers/articleController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes - Get articles (no auth required for viewing)
router.get('/', getArticles);
router.get('/:name', getArticleByName);

// Protected routes - Require authentication + Admin or Editor role
router.post('/', authenticate, authorize('admin', 'editor'), createArticle);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateArticle);
router.patch('/:id/toggle', authenticate, authorize('admin', 'editor'), toggleArticleStatus);

module.exports = router;