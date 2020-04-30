//add and configure dotenv
require('dotenv').config()

var express = require('express'), 
    app = express(), 
    port = process.env.CONNECTION_PORT
    bodyParser = require('body-parser');;

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes.js'); 
routes(app); 

console.log('Mallin RESTful API Server started on: ' + port);
