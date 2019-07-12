exports.handleCsrfError = (err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    err.status = 403;
    res.status(403);
    res.render('error', { title: `Error | ${err.status}`, message: 'Invalid CSRF Token' });
};
