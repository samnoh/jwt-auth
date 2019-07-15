const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const passport = require('passport');
const hpp = require('hpp');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const connect = require('./models');
const passportConfig = require('./passport');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const errorRouter = require('./routes/error');
const errorMiddleware = require('./middlewares/error');

const prod = process.env.NODE_ENV === 'production';
const app = express();
connect();
passportConfig();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.disable('x-powered-by');

if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600 }));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600 }));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist'), { maxAge: 31557600 }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    csurf({
        cookie: {
            httpOnly: true,
            secure: prod
        }
    })
);
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use(errorRouter);

app.use(errorMiddleware.handleCsrfError);
app.use(errorMiddleware.handleError);

app.listen(app.get('port'), () => {
    console.log(`Server is running on ${app.get('port')}...`);
});
