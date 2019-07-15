const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.getProfile = async (req, res) => {
    const { id } = req.params;
    const exUser = await User.findOne({ userId: id }).select({ password: 0 });

    res.render('profile', { title: `Profile | ${id}`, exUser });
};

exports.getEditProfile = async (req, res) => {
    const { id } = req.params;

    const exUser = await User.findOne({ userId: id }).select({ password: 0 });

    res.render('editProfile', { title: `Profile | ${id}`, exUser, csrfToken: req.csrfToken() });
};

exports.postEditProfile = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, newPassword } = req.body;

    const { password } = await User.findOne({ userId: id });
    const hash = await bcrypt.hash(newPassword, 12);

    await User.updateOne({ userId: id }, { name, email, password: newPassword ? hash : password });
    res.redirect(`/profile/${id}`);
};
