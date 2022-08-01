module.exports = function (app, Admin, passport) {
    app.get('/admin/login', (req, res) => {
        res.render('admin-login');
    });

    app.post('/admin/login', (req, res) => {
        const admin = new Admin({
            username: req.body.username,
            password: req.body.password
        });

        req.login(admin, (err) => {
            if (err) {
                console.log(err);
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/admin/secrets');
                });
            }
        });
    });
}

