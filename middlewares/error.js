exports.handleCsrfError = (err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    err.status = 403;
    res.status(403);
    res.render('error', { title: `Error | ${err.status}`, message: 'Invalid CSRF Token' });
};

exports.handleError = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    if (err.message === 'jwt malformed' || 'jwt expired') {
        res.clearCookie('token');
    }
    res.render('error', { title: `Error | ${err.status}` });
};
