const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const prod = process.env.NODE_ENV === 'production';

exports.getLogin = (req, res) => {
    res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken()
    });
};

exports.postLogin = (req, res, next) => {
    const { payload } = req;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ message: errors.errors.map(e => e.msg).join(', ') });
    }

    req.login(payload, { session: false }, async loginError => {
        if (loginError) {
            console.error(loginError);
            return next(loginError);
        }

        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '14d' });
        res.cookie('token', token, { httpOnly: true, secure: prod }).redirect('/');
    });
};

exports.getSignup = (req, res) => {
    res.render('signup', {
        title: 'Register',
        csrfToken: req.csrfToken()
    });
};

exports.postSignup = async (req, res) => {
    if (!req.body.id || !req.body.password || !req.body.name || !req.body.email) {
        return res.redirect('/auth/signup');
    }

    const { id, password, name, email } = req.body;

    try {
        const exUser = await User.findOne({ userId: id });
        if (exUser) {
            return res.redirect('/auth/signup');
        }

        const hash = await bcrypt.hash(password, 12);

        await User.create({ name, email, userId: id, password: hash });

        return res.redirect('/');
    } catch (e) {
        console.error(e);
        return next(e);
    }
};

exports.getLogout = (req, res) => {
    res.clearCookie('token').redirect('/');
};
