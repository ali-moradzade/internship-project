const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const userHandler = require(__dirname + '/routes/user/user');
const adminHandler = require(__dirname + '/routes/admin/admin');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html')
});

app.post('/', (req, res) => {

});

userHandler(app);
adminHandler(app);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
