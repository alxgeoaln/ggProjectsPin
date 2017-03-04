var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PinSchema   = new Schema({
    token : String,
    latitude : String,
    longitude : String
});

module.exports = mongoose.model('Pin', PinSchema);