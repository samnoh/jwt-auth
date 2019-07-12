const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('models/user');
const mongoSanitizer = require('utils/sanitizer');

exports.getLogin = (req, res) => {
    res.render('login', {
        title: 'Login',
        loginError: req.flash('loginError')[0]
    });
};

exports.postLogin = async (req, res) => {
    if (!req.body.id || !req.body.password) {
        return res.redirect('/auth/login');
    }

    const id = mongoSanitizer(req.body.id);
    const password = mongoSanitizer(req.body.password);

    try {
        const exUser = await User.findOne({ userId: id });
        if (!exUser) {
            req.flash('loginError', 'Please enter a valid ID and password');
            return res.redirect('/auth/login');
        }

        const result = await bcrypt.compare(password, exUser.password);
        if (!result) {
            req.flash('loginError', 'Please enter a valid ID and password');
            return res.redirect('/auth/login');
        }

        const signedToken = jwt.sign(
            {
                id
            },
            process.env.JWT_SECRET,
            {
                issuer: 'jwt-auth-demo'
            }
        );

        return res.cookie('token', signedToken).redirect('/');
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.getSignup = (req, res) => {
    res.render('signup', { title: 'Register', signupError: req.flash('signupError')[0] });
};

exports.postSignup = async (req, res) => {
    if (!req.body.id || !req.body.password) {
        return res.redirect('/auth/signup');
    }

    const id = mongoSanitizer(req.body.id);
    const password = mongoSanitizer(req.body.password);

    try {
        const exUser = await User.findOne({ userId: id });
        if (exUser) {
            req.flash('signupError', 'Already Signed Up');
            return res.redirect('/auth/signup');
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({ userId: id, password: hash });

        return res.redirect('/');
    } catch (e) {
        console.error(e);
        return next(e);
    }
};

exports.getLogout = (req, res) => {
    res.clearCookie('token').redirect('/');
};
