const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/internship_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', err);
        });
});

beforeEach(done => {
    const {users} = mongoose.connection.collections;
    users.drop()
        .then(() => done())
        .catch(() => done());
})
