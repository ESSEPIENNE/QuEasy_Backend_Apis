//add and configure dotenv
var dotenv = require('dotenv').config()

var express = require('express'), 
    app = express(), 
    port = process.env.CONNECTION_PORT,
    model_loading = require('./api/models/model.js'),
    mongoose = require('mongoose');

var bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_PATH);

app.listen(port);

app.use(bodyParser.json());

var routes = require('./api/routes/routes.js'); 
routes(app); 

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('QuEasy RESTful API Server started on: ' + port);
