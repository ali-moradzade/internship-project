const User = require('../database/models/user');
const bodyParser = require("body-parser");

const createUser = require('../database/queries/create-user');
const findUser = require('../database/queries/find-user');
const updateUser = require('../database/queries/edit-user');
const deleteUser = require('../database/queries/delete-user');

module.exports = {
    greeting(req, res) {
        res.send({hi: 'there!'});
    },

    create(req, res, next) {
        const userProps = req.body;
        console.log(userProps);

        createUser(userProps)
            .then(user => {
                res.send(user);
            })
            .catch(next);
    },

    find(req, res, next) {
        const _id = req.params.id;

        findUser(_id)
            .then(user => {
                res.send(user);
            })
            .catch(next);
    },

    edit(req, res, next) {
        const userId = req.params.id;
        const userProps = req.body;

        updateUser(userId, userProps)
            .then(() => User.findById(userId))
            .then(user => res.send(user))
            .catch(next);
    },

    delete(req, res, next) {
        const userId = req.params.id;

        deleteUser(userId)
            .then(result => {
                console.log(result);
                if (result.deletedCount !== 0) {
                    res.send(`User with id ${userId} deleted`);
                } else {
                    res.status(404).send(`User with id ${userId} not found`);
                }
            })
            .catch(next);
    },
}
