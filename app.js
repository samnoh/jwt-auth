const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const connect = require('models');
const indexRouter = require('routes/index');
const authRouter = require('routes/auth');
const errorRouter = require('routes/error');

const app = express();
connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'jwt-auth-demo'
    })
);
app.use(flash());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(errorRouter);

app.listen(app.get('port'), () => {
    console.log(`Server is running on ${app.get('port')}...`);
});
