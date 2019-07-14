const express = require('express');
const authMiddleware = require('middlewares/auth');
const profileController = require('controllers/profile');

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.get('/:id', authMiddleware.isLoggedIn, profileController.getProfile);

router.post('/:id', authMiddleware.isLoggedIn, profileController.postEditProfile);

module.exports = router;
