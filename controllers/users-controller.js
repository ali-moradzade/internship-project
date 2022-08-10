const User = require('../models/user');
const bodyParser = require("body-parser");

module.exports = {
    greeting(req, res) {
        res.send({hi: 'there!'});
    },

    create(req, res, next) {
        const userProps = req.body;
        console.log(userProps);

        User.create(userProps)
            .then(user => {
                res.send(user);
            })
            .catch(next);
    },

    edit(req, res, next) {
        const userId = req.params.id;
        const userProps = req.body;

        User.updateOne({_id: userId}, userProps)
            .then(() => User.findById(userId))
            .then(user => res.send(user))
            .catch(next);
    },

    delete(req, res, next) {
        const userId = req.params.id;

        User.deleteOne({_id: userId})
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
