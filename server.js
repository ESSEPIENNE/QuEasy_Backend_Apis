'use strict';

//main

//add and configure dotenv
var dotenv = require('dotenv').config()

const express = require('express'), 
    app = express(), 
    port = process.env.CONNECTION_PORT,
    model_loading = require('./api/models/model.js'), //carico i models per il db
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    passportOpts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT
    },
    cors = require('cors'),
    Pusher = require('pusher'),
    multer = require('multer');

//intializing passport.js for JWT Authorization and Authentication
app.use(passport.initialize());
app.use(passport.session());
process.env.TZ = 'Europe/Amsterdam'

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_PATH);

app.listen(port);

app.use(cors());
app.use(bodyParser.json());

//defining routes files path
var data_routes = require('./api/routes/data_routes.js'); 
data_routes(app); 
var auth_routes = require('./api/routes/auth_routes.js');
auth_routes(app);

//default response for a route that doesn't exist
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

passport.use(new JwtStrategy(passportOpts, function(jwtPayload, done){
    console.log(jwtPayload);
    const expirationDate = new Date(jwtPayload.exp * 1000);
    if(expirationDate < new Date()){
        return done(null, false);
    }
    done(null, jwtPayload);
}));

passport.serializeUser(function (user, done) {
    done(null, user.username)
});

//Pusher initialization
exports.pusher = new Pusher({
    appId: '1029426',
    key: 'cdf5008e5b8bd9632817',
    secret: '2573a15c33d453d5eead',
    cluster: 'eu',
    enableStats: true,
    useTLS: true
}); 

Pusher.log = (msg) => {
    console.log(msg);
};

//Configuration for store logo upload
exports.storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '.');
    },
    filename: function(req, file, cb) {
        cb(null, 'logo_' + file.fieldname + '.png')
    }
});

console.log('QuEasy restingapp API Server started on: ' + port);
