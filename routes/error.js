const express = require('express');
const authMiddleware = require('middlewares/auth');

const router = express.Router();

router.use(authMiddleware.verifyToken, (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { title: `Error | ${err.status}` });
});

module.exports = router;
