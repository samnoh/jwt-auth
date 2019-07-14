const express = require('express');
const authController = require('controllers/auth');
const authMiddleware = require('middlewares/auth');

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
router.post('/signup', authMiddleware.isNotLoggedIn, authController.postSignup);

// GET /auth/logout -> Attempt Logout
router.get('/logout', authMiddleware.isLoggedIn, authController.getLogout);

module.exports = router;
