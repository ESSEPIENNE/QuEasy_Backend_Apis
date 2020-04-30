'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Code = mongoose.model('Code'),
    Store = mongoose.model('Store');

//handlers for /stores

exports.get_all_stores = function(req, res){     //return all stores
    Store.find({}, function(err, store){
        if(err) res.send(err);
        res.json(store);
    });
}

exports.create_a_store = function (req, res){    //creates a new shop
    var new_store = new Store(req.body);
    new_store.save(function(err, store){
        if(err) res.send(err);
        res.json(store);
    });
}

//handlers for /stores/:storeId

exports.get_a_store = function (req, res){
    Store.findById(req.params.storeId, function(err, store){
        if(err) res.send(err);
        res.json(store);
    });
}

exports.update_a_store = function (req, res){

}

exports.delete_a_store = function (req, res){

}

//handlers for /stores/:storeId/codes

exports.get_store_codes = function (req, res){

}

exports.create_code = function(req, res){
    var new_code = new Code(req.body);
    new_code.code = "45851618484684";
    new_code.save(function(err, code){
        if(err) res.send(err);
        res.json(code);
    });
}

//handlers for /stores/:storeId/codes/:code

exports.delete_store_code = function (req, res){

}

//handlers for /users

exports.get_all_users = function (req, res){

}

exports.create_user = function (req, res){
    var new_user = new User(req.body);
    new_user.save(function(err, user){
        if(err) res.send(err);
        res.json(user);
    });
}

//handlers for /users/:userId

exports.get_user = function (req, res){

}

exports.update_user = function (req, res){

}

exports.delete_user = function (req, res){

}

//handlers for /codes

exports.get_codes = function (req, res){

}

//handlers for /code/:codeId

exports.get_specific_code = function (req, res){

}