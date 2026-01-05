const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');

router.get('/', articlesController.getArticles);
router.get('/:id', articlesController.getArticleById);
router.post('/', articlesController.createArticle);
router.put('/:id', articlesController.updateArticle);
router.delete('/:id', articlesController.deleteArticle);

module.exports = router;