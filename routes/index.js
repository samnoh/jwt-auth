const express = require('express');

const router = express.Router();

// GET / -> Landing Page
router.get('/', (req, res, next) => {
    res.render('main', { title: 'Main' });
});

router.get('/secret', (req, res, next) => {
    res.render('secret', { title: 'Secret' });
});

module.exports = router;
