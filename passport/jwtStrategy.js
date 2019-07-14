const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

module.exports = () => {
    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: req => req.cookies.token,
                secretOrKey: process.env.JWT_SECRET
            },
            (jwtPayload, done) => {
                return done(null, jwtPayload);
            }
        )
    );
};
