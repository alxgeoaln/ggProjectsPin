var express = require('express');
var router = express.Router();
var Pin = require('../model/pin.js');

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

router.post('/', ensureAuthorized, function(req, res){
 var pinObj = {
     userID : req.body.userID,
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