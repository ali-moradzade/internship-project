const User = require('../models/user');

/**
 * Finds a single user in the user collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the User that matches the id
 */
module.exports = (_id) => {
    return User.deleteOne({_id: _id});
};
