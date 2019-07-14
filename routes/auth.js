const express = require('express');
const authController = require('controllers/auth');
const authMiddleware = require('middlewares/auth');
const { check, sanitizeBody } = require('express-validator');

const router = express.Router();

// GET /auth/login -> Login Page
router.get('/login', authMiddleware.isNotLoggedIn, authController.getLogin);

// POST / -> Attempt Login
/*
{
    id,
    password
}
*/
router.post(
    '/login',
    [
        check('userId')
            .not()
            .isEmpty(),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Password must have more than 3 characters')
    ],
    sanitizeBody('*'),
    authMiddleware.isNotLoggedIn,
    authMiddleware.verifyLogin,
    authController.postLogin
);

// GET /auth/signup -> Signup Page
router.get('/signup', authMiddleware.isNotLoggedIn, authController.getSignup);

// POST / -> Attemp Signup
/*
{
    id,
    password
}
*/
router.post(
    '/signup',
    [
        check('userId')
            .not()
            .isEmpty(),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Password must have more than 3 characters'),
        check('email')
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage('Email must be valid'),
        check('name')
            .not()
            .isEmpty()
    ],
    sanitizeBody('*')
        .escape()
        .blacklist('${}'),
    authMiddleware.isNotLoggedIn,
    authController.postSignup
);

// GET /auth/logout -> Attempt Logout
router.get('/logout', authMiddleware.isLoggedIn, authController.getLogout);

module.exports = router;
