const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const hpp = require('hpp');
const helmet = require('helmet');
require('dotenv').config();

const connect = require('models');
const indexRouter = require('routes/index');
const authRouter = require('routes/auth');
const errorRouter = require('routes/error');

const prod = process.env.NODE_ENV === 'production';
const app = express();
connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('short'));
} else {
    app.use(morgan('dev'));
}

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
            secure: prod
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
