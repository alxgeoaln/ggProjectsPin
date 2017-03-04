var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var morgan     = require("morgan");
var cros = require('cors');
mongoose.connect('mongodb://sa:ggprojects4dev@ds029585.mlab.com:29585/pin');


//Init App
var app = express();

app.use(cors());

app.set('view engine', 'html');

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"));

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//app.use(function(req, res, next) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//    next();
//});

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var pin = require('./routes/pin');

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/pin', pin);

//Set Port

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    {
        console.log("Server started on port " + app.get('port'));
    }
});