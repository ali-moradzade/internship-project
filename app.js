require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const User = require('./models/user');
const routes = require('./routes/routes');

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/internship', {useNewUrlParser: true});
}

const app = express();

app.use(bodyParser.json());
routes(app);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((id, done) => {
    done(null, id);
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

app.use((err, req, res, next) => {
    res.status(422).send({error: err._message});
});

module.exports = app;
