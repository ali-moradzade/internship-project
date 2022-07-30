module.exports = function (app) {
    app.get('/user', (req, res) => {
        res.sendFile(__dirname + '/resources/user-home.html');
    })

    app.get('/user/sign-up', (req, res) => {
        res.sendFile(__dirname + '/resources/user-sign-up.html');
    });

    app.post('/user/sign-up', (req, res) => {
        console.log(req.body);
        if (req.body.password === req.body.confirm) {
            res.send('User created');
        } else {
            res.send('Passwords do not match');
        }
    });
}

