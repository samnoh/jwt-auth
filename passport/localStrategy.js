const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('models/user');

module.exports = () => {
    passport.use(
        'local',
        new LocalStrategy(
            {
                usernameField: 'userId',
                passwordField: 'password',
                session: false
            },
            async (userId, password, done) => {
                try {
                    const user = await User.findOne({ userId });
                    if (!user) {
                        return done(null, false, { message: 'Incorrect ID' });
                    }

                    const result = await bcrypt.compare(password, user.password);
                    if (!result) {
                        return done(null, false, { message: 'Incorrect password' });
                    }

                    return done(null, user);
                } catch (e) {
                    console.error(e);
                    return done(e);
                }
            }
        )
    );
};
