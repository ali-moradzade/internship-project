const User = require('../models/user');

/**
 * Finds a single user in the user collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the User that matches the id
 * @param {string} _id - The ID of the record to find.
 */
module.exports = (_id, userProps) => {
    return User.updateOne({_id, _id}, userProps);
}
