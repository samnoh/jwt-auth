exports.getLanding = (req, res) => {
    res.render('main', { title: 'Main' });
};

exports.getSecret = (req, res) => {
    res.render('secret', { title: 'Secret' });
};
