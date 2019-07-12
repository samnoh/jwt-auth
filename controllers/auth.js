const User = require('models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.postLogin = (req, res) => {
    console.log(req.body);
    res.redirect('/');
};

exports.getSignup = (req, res) => {
    res.render('signup', { title: 'Register', signupError: req.flash('signupError')[0] });
};

exports.postSignup = async (req, res) => {
    const { id, password } = req.body;
    if (!id || !password) {
        return res.redirect('/auth/signup');
    }

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
