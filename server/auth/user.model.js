'use strict';
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var schema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    displayName: String,
    picture: String,
    facebook: String,
    foursquare: String,
    google: String,
    github: String,
    linkedin: String,
    live: String,
    yahoo: String,
    twitter: String

});
schema.pre('save', function(next) {
    var user = this;
    console.log("SAVED USER:   " + user)
    if (!user.isModified('password')) {
        console.log("User password isnt modified")
        return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            console.log("User password hashed")
            next();
        });
    });
});

schema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', schema);
