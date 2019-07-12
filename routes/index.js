const express = require('express');
const indexController = require('controllers/index');
const authMiddleware = require('middlewares/auth');

const router = express.Router();

// GET / -> Landing Page
router.get('/', indexController.getLanding);

// GET / -> Secret Page
router.get('/secret', authMiddleware.isLoggedIn, indexController.getSecret);

module.exports = router;
