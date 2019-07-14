const passport = require('passport');

exports.isLoggedIn = (req, res, next) => {
    if (req.cookies['token']) {
        return next();
    }
    res.redirect('/auth/login');
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.cookies['token']) {
        return next();
    }
    res.redirect('/');
};

exports.verifyLogin = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        if (info) {
            return next(info);
        }

        req.payload = { id: user.userId }; // set jwt token
        next();
    })(req, res, next);
};

exports.verifyToken = (req, res, next) => {
    if (!req.cookies['token']) {
        return next();
    }

    passport.authenticate('jwt', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        if (info) {
            console.error(info.message);
            return next(info);
        }

        res.locals.user = user;
        next();
    })(req, res, next);
};

exports.verifyParamsId = (req, res, next, id) => {
    if (id !== res.locals.user.id) {
        const error = new Error('Forbidden');
        error.status = 403;
        next(error);
    }

    next();
};
