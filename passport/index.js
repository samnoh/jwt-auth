const local = require('passport/localStrategy');
const jwt = require('passport/jwtStrategy');
const User = require('models/user');

module.exports = () => {
    local();
    jwt();
};
