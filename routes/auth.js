const express = require('express');

const router = express.Router();

// GET /auth/login -> Login Page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// POST / -> Attemp Login
/*
{
    id,
    password
}
*/
router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Register' });
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
