module.exports = function (app, User, passport) {
    app.get('/user/login', (req, res) => {
        res.render('user-login');
    });

    app.post('/user/login', (req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        req.login(user, (err) => {
            if (err) {
                console.log(err);
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/secrets');
                });
            }
        });
    });
}

