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

router.post('/', function (req, res) {

    var userID = req.body.userID;
    var pinObj = {
        coords: {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }

    };


    User.update({_id: userID},
        {$push: {'pin': pinObj}}, {upsert: true}, function (err, data) {
            if (err) console.log(err);

            res.json('works')
        });

});

router.get('/', function (req, res) {
    var query = User.find({}).select({"email": 1, "pin": 1, "_id": 1});
    query.exec(function (err, pins) {
        if (err) {
            console.log(err);
        } else {
            res.json(pins);

        }
    })
});


module.exports = router;