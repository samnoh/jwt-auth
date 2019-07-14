exports.handleCsrfError = (err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    err.status = 403;
    next(err);
};

exports.handleError = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    if (err.message === 'jwt malformed' || err.message === 'jwt expired') {
        res.clearCookie('token');
    }
    res.render('error', { title: `Error | ${err.status}` });
};
