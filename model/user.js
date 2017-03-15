var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PinSchema = new Schema({
    coords: {
        latitude: String,
        longitude: String
    },
    userId: String
});


var UserSchema = new Schema({
    email: String,
    password: String,
    profilePicture: String,
    token: String,
    pin: [PinSchema]
});

module.exports = mongoose.model('User', UserSchema);