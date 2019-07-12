const express = require('express');
const authController = require('controllers/auth');
const authMiddleware = require('middlewares/auth');

const router = express.Router();

// GET /auth/login -> Login Page
router.get('/login', authMiddleware.isNotLoggedIn, authController.getLogin);

// POST / -> Attemp Login
/*
{
    id,
    password
}
*/
router.post('/login', authMiddleware.isNotLoggedIn, authController.postLogin);

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

router.get('/logout', authMiddleware.isLoggedIn, authController.getLogout);

module.exports = router;
