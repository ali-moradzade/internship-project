require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userHandler = require(__dirname + '/routes/user/user');
const adminHandler = require(__dirname + '/routes/admin/admin');

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
    User.findById(id, (err, user) => {
        done(err, user);
    })
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model('Admin', adminSchema);

passport.use(Admin.createStrategy());
passport.serializeUser((id, done) => {
    Admin.findById(id, (err, admin) => {
        done(err, admin);
    })
});
passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, admin) => {
        done(err, admin);
    });
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

// note: we can't sign up the admins, our database admin should do this work!
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
        res.render('secrets');
    } else {
        res.redirect('/user/login');
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

userHandler(app, User, passport);
adminHandler(app, Admin, passport);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
