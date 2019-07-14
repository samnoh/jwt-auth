# JWT-auth-demo

-   jsonwebtoken
-   passport
-   passport-local
-   passport-jwt
-   bcrypt
-   csurf
-   mongoose
-   express-vadliator

## Why JWT

-   No sessions (stateless)
-   Check the database only once upon login
-   Use httpOnly & secure cookie to store JWT token

## Front-End Frameworks

-   boostrap 4
-   jquery

## TIL

### router.param

-   middleware for handling req.params

```JavaScript
router.param('id', (req, res, next, id) => {
    // ...
});
```

### passport.js custom name

-   name a passport strategy

```JavaScript
module.exports = () => {
    passport.use(
        'name',
        new LocalStrategy(
            // ...
        )
    );
};
```

```JavaScript
passport.authenticate('name', (authError, user, info) => {
    // ...
})
```

### csurf

-   CSRF protection

```JavaScript
app.use(
    csurf({
        cookie: {
            key: '_csrf',
            httpOnly: true,
            secure: prod
        }
    })
);
```

```JavaScript
router.get('/', (req, res) => {
    res.render('main', {
        csrfToken: req.csrfToken()
    });
});
```

```PUG
input(type='hidden' name='_csrf' value=csrfToken)
```

### express-validator

-   check
-   sanitize

```JavaScript
const { check, sanitizeBody } = require('express-validator');

router.post(
    '/signup',
    [
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

    ],
    sanitizeBody('*')
        .escape()
        .blacklist('${}'),
    authMiddleware.isNotLoggedIn,
    authController.postSignup
);
```
