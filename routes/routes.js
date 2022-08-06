const UserController = require('../controllers/users-controller');
const AppController = require('../controllers/app-controller');

module.exports = (app) => {
    app.get('/', AppController.home);
    app.get('/sign-up', AppController.signUpGet);
    app.post('/sign-up', AppController.signUpPost);
    app.get('/secrets', AppController.secrets);
    app.get('/logout', AppController.logout);
    app.get('/login', AppController.loginGet);
    app.post('/login', AppController.loginPost);

    app.get('/api', UserController.greeting);
    app.post('/api/users', UserController.create);
    app.put('/api/users/:id', UserController.edit);
    app.delete('/api/users/:id', UserController.delete);
};
