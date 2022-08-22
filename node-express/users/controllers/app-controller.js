const User = require('../database/models/user');
const passport = require('passport');

module.exports = {
    home(req, res) {
        res.render('home');
    },

    signUpGet(req, res) {
        res.render('sign-up');
    },

    signUpPost(req, res) {
        User.register(new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            username: req.body.username
        }), req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect('/sign-up');
            } else {
                passport.authenticate('local', {
                    successRedirect: '/secrets',
                    failureRedirect: '/sign-up'
                })(req, res);
            }
        });
    },

    secrets(req, res) {
        if (req.isAuthenticated()) {
            res.render('secrets', {
                name: req.user.name,
                email: req.user.email,
                age: req.user.age,
                gender: req.user.gender,
                username: req.user.username
            });
            // res.render('secrets', {username: req.user.username});
        } else {
            res.redirect('/login');
        }
    },

    logout(req, res) {
        req.logout((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    },

    loginGet(req, res) {
        res.render('login');
    },

    loginPost(req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        req.login(user, (err) => {
            if (err) {
                console.log(err);
                res.send('Login failed');
            } else {
                passport.authenticate('local', {
                    successRedirect: '/secrets',
                    failureRedirect: '/login' //TODO: should be /login-failed
                })(req, res);
            }
        });
    },
}
