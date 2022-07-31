const md5 = require('md5');

module.exports = function (app, Admin) {
    app.get('/admin/login', (req, res) => {
        res.render('admin-login');
    });

    app.post('/admin/login', (req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);

        Admin.findOne({username: username}, (err, foundAdmin) => {
            if (err) {
                console.log(err);
                res.send("Sorry, something went wrong!");
            } else {
                if (foundAdmin) {
                    if (foundAdmin.password === password) {
                        res.render('secrets');
                    }
                } else {
                    res.send("Admin not found!");
                }
            }
        });
    });
}

