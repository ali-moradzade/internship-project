const User = require('../models/user');

/**
 * Finds a single user in the user collection.
 * @param {object} userProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the User that was created
 */
module.exports = (userProps) => {
    // new User({name: 'Alex'});
    const user = new User(userProps);

    return user.save();
};
