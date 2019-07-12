const User = require('models/user');

exports.getProfile = async (req, res) => {
    const { id } = res.locals.user;

    if (req.params.id !== id) {
        return res.redirect(`/profile/${id}`);
    }

    const exUser = await User.findOne({ userId: id }).select({ password: 0 });

    res.render('profile', { title: `Profile | ${id}`, exUser });
};
