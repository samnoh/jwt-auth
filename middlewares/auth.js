const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        req.decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next();
    }

    try {
        req.decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.redirect(req.headers.referer);
    } catch (e) {
        next();
    }
};

exports.verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    try {
        res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        next();
    }
};
