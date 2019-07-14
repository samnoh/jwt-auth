const express = require('express');
const { check, sanitizeBody } = require('express-validator');

const authMiddleware = require('middlewares/auth');
const profileController = require('controllers/profile');

const router = express.Router();

router.use(authMiddleware.verifyToken, authMiddleware.isLoggedIn);

router.param('id', authMiddleware.verifyParamsId);

router.get('/:id', profileController.getProfile);

router.get('/:id/edit', profileController.getEditProfile);

router.post(
    '/:id/edit',
    [
        check('name')
            .not()
            .isEmpty(),
        check('userId')
            .not()
            .isEmpty(),
        check('email')
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage('Email must be valid'),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Password must have more than 3 characters')
    ],
    sanitizeBody('*')
        .escape()
        .blacklist('${}'),
    authMiddleware.verifyLogin,
    profileController.postEditProfile
);

module.exports = router;
