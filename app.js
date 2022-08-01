require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/internship', {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser((id, done) => {
    done(null, id);
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

app.post('/sign-up', (req, res) => {
    User.register({username: req.body.username}, req.body.password, (err, user) => {
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
});

app.get('/secrets', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('secrets', {username: req.user.username});
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
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

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
