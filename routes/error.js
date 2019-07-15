const express = require('express');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// GET * -> 404 Page
router.use(authMiddleware.verifyToken, (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;
