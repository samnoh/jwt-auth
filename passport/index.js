const local = require('passport/localStrategy');
const jwt = require('passport/jwtStrategy');
const User = require('models/user');

module.exports = passport => {
    passport.serializeUser((user, done) => {
        return done(null, user.id); // req.session.passport.user = {id: '..'}
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ userId: id });
            done(null, user); // -> req.user
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });

    local();
    jwt();
};
