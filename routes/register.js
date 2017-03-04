var express = require('express');
var jwt = require("jsonwebtoken");
//var multer = require('multer');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('../model/user.js');

//#region Upload img
//var storage = multer.diskStorage({
//    destination: function (req, file, callback) {
//        callback(null, '../uploads/')
//    },
//    filename: function (req, file, callback) {
//        callback(null, Date.now() + file.originalname);
//    }
//});
//var upload = multer({
//    storage: storage,
//    fileFilter: function (req, file, cb) {
//
//        var filetypes = /jpeg|jpg|png/;
//        var mimetype = filetypes.test(file.mimetype);
//        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//
//        if (mimetype && extname) {
//            return cb(null, true);
//        }
//        console.log('Format fisier neacceptat');
//        cb("Error: File upload only supports the following filetypes - " + filetypes);
//    }
//});
//#endregions

var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

router.post('/', function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user){
        if(err){
            res.json({
                type:false,
                data: "Error occured: " + err
            })
        } else {
            if(user){
                res.json({
                    type: false,
                    data: 'User already exists!'
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                //userModel.profilePicture ='/uploads/' +  req.file.filename;
                userModel.save(function(err,user){
                    user.token = jwt.sign(user, token);
                    user.save(function(err, user1){
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                });
            }
        }
    })
});

module.exports = router;