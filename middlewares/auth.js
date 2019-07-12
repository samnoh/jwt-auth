const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    next();
};

exports.isNotLoggedIn = (req, res, next) => {
    next();
};
