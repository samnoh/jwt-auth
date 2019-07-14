const express = require('express');
const authMiddleware = require('middlewares/auth');
const profileController = require('controllers/profile');

const router = express.Router();

router.use(authMiddleware.verifyToken, authMiddleware.isLoggedIn);

router.param('id', authMiddleware.verifyParamsId);

router.get('/:id', profileController.getProfile);

router.get('/:id/edit', profileController.getEditProfile);

router.post('/:id/edit', authMiddleware.verifyLogin, profileController.postEditProfile);

module.exports = router;
