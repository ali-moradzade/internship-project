module.exports = function (app) {
    app.get('/user', (req, res) => {
        res.sendFile(__dirname + '/resources/user-home.html');
    })

    app.get('/user/sign-up', (req, res) => {
        res.sendFile(__dirname + '/resources/user-sign-up.html');
    });

    app.post('/user/sign-up', (req, res) => {
        if (req.body.password === req.body.confirm) {
            res.send('User created');
        } else {
            res.send('Passwords do not match');
        }
    });

    app.get('/user/login', (req, res) => {
        res.sendFile(__dirname + '/resources/user-login.html');
    });

    app.post('/user/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (username === 'ali' && password === 'ali') {
            res.send('User logged in');
        } else {
            res.send('User not found');
        }
    });
}

