const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    username: String,
    password: String
});

userSchema.index({name: 'text'});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;
