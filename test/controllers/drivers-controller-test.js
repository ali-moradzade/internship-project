const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

const mongoose = require('mongoose');
const {response} = require("express");
const User = require('../../database/models/user');

describe('Users controller', () => {
    it('POST to /api/users creates a new user', (done) => {
        User.count()
            .then(count => {
                request(app)
                    .post('/api/users')
                    .send({username: 'test', password: 'test'})
                    .end(() => {
                        User.count()
                            .then(newCount => {
                                assert(count + 1 === newCount);
                                done();
                            });
                    });
            });
    });

    it('Get from /api/users/:id returns specified user', (done) => {
        const user = new User({
            username: 'test',
            password: 'test'
        });

        user.save()
            .then(() => {
                request(app)
                    .get(`/api/users/${user._id}`)
                    .end((err, res) => {
                            console.log(res.body);
                            assert(res.body.username === 'test');
                            done();
                        }
                    );
            });
    });

    it('PUT to /api/users/id edits an existing user', done => {
        const user = new User({
            username: 'test',
            password: 'test'
        });

        user.save()
            .then(() => {
                request(app)
                    .put(`/api/users/${user._id}`)
                    .send({password: 'test2'})
                    .end(() => {
                        User.findOne({password: 'test2'})
                            .then((user) => {
                                assert(user.password === 'test2');
                                done();
                            })
                    });
            });

    });

    it('DELETE to /api/users/id can delete a user', done => {
        const user = new User({
            username: 'test',
            password: 'test',
        });

        user.save()
            .then(() => {
                request(app)
                    .delete(`/api/users/${user._id}`)
                    .send({username: 'test'})
                    .end(() => {
                        User.findOne({username: 'test'})
                            .then((user) => {
                                assert(user === null);
                                done();
                            });
                    });
            });
    });
});
