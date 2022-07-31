const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require('md5');

const userHandler = require(__dirname + '/routes/user/user');
const adminHandler = require(__dirname + '/routes/admin/admin');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/internship', {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Admin = mongoose.model('Admin', adminSchema);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

// note: we can't sign up the admins, our database admin should do this work!
app.post('/sign-up', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: md5(req.body.password)
    });

    newUser.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.render('secrets');
        }
    });
});

userHandler(app, User);
adminHandler(app, Admin);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
