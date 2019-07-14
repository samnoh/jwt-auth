const express = require('express');
const { check, sanitizeBody } = require('express-validator');

const authMiddleware = require('middlewares/auth');
const profileController = require('controllers/profile');

const router = express.Router();

router.use(authMiddleware.verifyToken, authMiddleware.isLoggedIn);

router.param('id', authMiddleware.verifyParamsId);

// GET /profile/:id -> Profile Page
router.get('/:id', profileController.getProfile);

// GET /profile/:id/edit -> Edit Profile Page
router.get('/:id/edit', profileController.getEditProfile);

// POST /profile/:id/edit -> Modify Profile
/*
{
    name,
    email,
    password,
    newPassword,
    userId (hidden)
}
*/
router.post(
    '/:id/edit',
    [
        check('name')
            .not()
            .isEmpty(),
        check('userId')
            .not()
            .isEmpty(),
        check('email')
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage('Email must be valid'),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Password must have more than 3 characters'),
        check('newPassword')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('New Password must have more than 3 characters')
    ],
    sanitizeBody('*')
        .escape()
        .blacklist('${}'),
    authMiddleware.verifyLogin,
    profileController.postEditProfile
);

module.exports = router;
