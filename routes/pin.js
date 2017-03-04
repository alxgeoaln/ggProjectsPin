var express = require('express');
var router = express.Router();
var Pin = require('../model/pin.js');
var User = require('../model/user.js');

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

router.post('/', ensureAuthorized, function (req, res) {
    var pinObj = {
        userID: req.body.userID,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };

    Pin.findOne({latitude: pinObj.latitude, longitude: pinObj.longitude}, function (err, pin) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (pin) {
                res.json({
                    type: false,
                    data: 'Pin already exists!'
                });
            } else {
                var pin = new Pin({authorId: pinObj.userID, latitude: pinObj.latitude, longitude: pinObj.longitude});
                pin.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('pin saved');
                        res.json('json');
                    }
                });
            }
        }
    })
});

router.get('/', ensureAuthorized, function (req, res) {
    Pin.find({}, function (err, pin) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                coords : {
                    latitude : pin.latitude,
                    longitude : pin.longitude
                }
            });
        }
    })



    });
});



module.exports = router;