var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PinSchema   = new Schema({
    authorId : String,
    latitude : String,
    longitude : String,
    //user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Pin', PinSchema);