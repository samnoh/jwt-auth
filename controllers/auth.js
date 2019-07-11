exports.getLogin = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.postLogin = (req, res) => {
    console.log(req.body);
    res.redirect('/');
};

exports.getSignup = (req, res) => {
    res.render('signup', { title: 'Register' });
};

exports.postSignup = (req, res) => {
    console.log(req.body);
    res.redirect('/');
};
