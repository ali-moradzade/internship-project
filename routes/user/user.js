const md5 = require('md5');

module.exports = function (app, User) {
    app.get('/user/login', (req, res) => {
        res.render('user-login');
    });

    app.post('/user/login', (req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);

        User.findOne({email: username}, (err, foundUser) => {
            if (err) {
                console.log(err);
                res.send("Sorry, something went wrong!");
            } else {
                if (foundUser) {
                    if (foundUser.password === password) {
                        res.render('secrets');
                    } else {
                        res.send("Wrong password!");
                    }
                } else {
                    res.send("User not found!");
                }
            }
        });
    });
}

