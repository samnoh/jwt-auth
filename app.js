const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const connect = require('./models');
const indexRouter = require('routes/index');
const authRouter = require('routes/auth');

const app = express();
connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { title: `Error | ${err.status}` });
});

app.listen(app.get('port'), () => {
    console.log(`Server is running on ${app.get('port')}...`);
});