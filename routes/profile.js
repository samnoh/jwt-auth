const express = require('express');
const authMiddleware = require('middlewares/auth');
const profileController = require('controllers/profile');

const router = express.Router();

router.get(
    '/:id',
    authMiddleware.verifyToken,
    authMiddleware.isLoggedIn,
    profileController.getProfile
);

module.exports = router;
