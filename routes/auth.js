const express = require('express');
const authController = require('controllers/auth.js');

const router = express.Router();

// GET /auth/login -> Login Page
router.get('/login', authController.getLogin);

// POST / -> Attemp Login
/*
{
    id,
    password
}
*/
router.post('/login', authController.postLogin);

// GET /auth/signup -> Signup Page
router.get('/signup', authController.getSignup);

// POST / -> Attemp Signup
/*
{
    id,
    password
}
*/
router.post('/signup', authController.postSignup);

module.exports = router;
