module.exports = function (app) {
    app.get('/admin', (req, res) => {
        res.sendFile(__dirname + '/resources/admin-home.html');
    })

    app.get('/admin/sign-up', (req, res) => {
        res.sendFile(__dirname + '/resources/admin-sign-up.html');
    });

    app.post('/admin/sign-up', (req, res) => {
        if (req.body.password === req.body.confirm) {
            res.send('Admin created');
        } else {
            res.send('Passwords do not match');
        }
    });

    app.get('/admin/login', (req, res) => {
        res.sendFile(__dirname + '/resources/admin-login.html');
    });

    app.post('/admin/login', (req, res) => {
        let message = `
            <h1>Admin loggend in!</h1>
            <p>username: ${req.body.username}</p>
            <p>password: ${req.body.password}</p>
        `;

        res.send(message);
    });
}

