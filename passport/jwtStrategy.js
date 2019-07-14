const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

module.exports = () => {
    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: req => req.cookies.token,
                secretOrKey: process.env.JWT_SECRET
            },
            (jwtPayload, done) => {
                // if (Date.now() > jwtPayload.expires) {
                //     return done('jwt expired');
                // }
                return done(null, jwtPayload);
            }
        )
    );
};
