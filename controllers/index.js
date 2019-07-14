const passport = require('passport');

exports.getLanding = (req, res) => {
    res.render('main', { title: 'Main' });
};

exports.getSecret = (req, res, next) => {
    res.render('secret', { title: 'Secret' });
};
