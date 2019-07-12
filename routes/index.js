const express = require('express');
const indexController = require('controllers/index');
const authMiddleware = require('middlewares/auth');

const router = express.Router();

// GET / -> Landing Page
router.get('/', authMiddleware.verifyToken, indexController.getLanding);

// GET /secret -> Secret Page
router.get(
    '/secret',
    authMiddleware.verifyToken,
    authMiddleware.isLoggedIn,
    indexController.getSecret
);

module.exports = router;
