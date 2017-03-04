var express = require('express');
var router = express.Router();
var Pin = require('../model/pin.js');
var ensureAuthorized = require('../ensureAuthorized/ensureAuthorized.js');

router.post('/', ensureAuthorized, function(req, res){
 var pinObj = {
     token : req.body.token,
     latitude : req.body.latitude,
     longitude : req.body.longitude
 };

    var pin = new Pin({ authorId: pinObj.authorId, latitude: pinObj.latitude, longitude: pinObj.longitude });
    pin.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('pin saved');
            res.redirect('/');
        }
    });


});

router.get('/', ensureAuthorized, function(req, res){
    Pin.find({}, function(err, pin){
        if(err){
            console.log(err);
        } else {
            res.json(pin);
        }
    })
});

module.exports = router;