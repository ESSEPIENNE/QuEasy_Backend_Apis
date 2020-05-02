//add and configure dotenv
var dotenv = require('dotenv').config()

const express = require('express'), 
    app = express(), 
    port = process.env.CONNECTION_PORT,
    model_loading = require('./api/models/model.js'), //carico i models per il db
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
    randtoken = require('rand-token'),
    passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    passportOpts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT
    },
    cors = require('cors');

app.use(passport.initialize());
app.use(passport.session());
process.env.TZ = 'Europe/Amsterdam'

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_PATH);

app.listen(7070);

app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); //nell'esempio di passport usava questo

var data_routes = require('./api/routes/data_routes.js'); 
data_routes(app); 

var auth_routes = require('./api/routes/auth_routes.js');
auth_routes(app);

app.get('/users', passport.authenticate('jwt'));

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

console.log('QuEasy RESTful API Server started on: ' + 7070);
