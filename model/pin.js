var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PinSchema   = new Schema({
    userID : String,
    latitude : String,
    longitude : String
});

module.exports = mongoose.model('Pin', PinSchema);