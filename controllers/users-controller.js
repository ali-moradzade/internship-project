const User = require('../models/user');

module.exports = {
    greeting(req, res) {
        res.send({hi: 'there!'});
    },

    create(req, res, next) {
        res.send('Not implemented yet!');
    },

    edit(req, res, next) {
        res.send('Not implemented yet!');
    },

    delete(req, res, next) {
        res.send('Not implemented yet!');
    },
}
