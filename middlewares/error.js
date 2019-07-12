exports.handleCsrfError = (err, req, res, next) => {
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    err.status = 403;
    res.status(403);
    res.render('error', { title: `Error | ${err.status}` });
};
