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

-   middleware for handling req.param

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

```H
input(type='hidden' name='_csrf' value=csrfToken)
```
