'use strict';

var mongoose = require('mongoose'),
    uniqid = require('uniqid'),
    User = mongoose.model('User'),
    Code = mongoose.model('Code'),
    Store = mongoose.model('Store'),
    db_utilities = require('../../utility/db/db_utilities.js');;

const sha = require('simple-js-sha2-256');

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
        console.log(req.body);
        res.json(store);
    });
}

//handlers for /stores/:storeId

exports.get_a_store = function (req, res){
    db_utilities.find_store(req.params.storeId).
    then((store)=>{
        if(store){
            res.send(store);
        } else {
            res.status(404)
            .send('Store not found! Prova a controllare come hai scritto il nome del negozio');
        }
        
    });
}

exports.update_a_store = function (req, res){

}

exports.delete_a_store = function (req, res){

}

//handlers for /stores/:storeId/logo

exports.get_a_store_logo = function (req, res){
    db_utilities.find_store(req.params.storeId).
    then((store)=>{
        if(store){
            if(store.logo_path){
                res.sendFile(process.env.IMG_PATH + store.logo_path);
            } else {
                res.status(404)
                .send('Logo not found! Forse è ancora da aggiungere');
            }
        } else {
            res.status(404)
            .send('Store not found! Prova a controllare come hai scritto il nome del negozio');
        }
    });
}

//handlers for /stores/:storeId/codes

exports.get_store_codes = function (req, res){

}



//handlers for /stores/:storeId/codes/:code

exports.delete_store_code = function (req, res){

}

//handlers for /users

exports.get_all_users = function (req, res){

}

exports.create_user = function (req, res){
    var new_user = new User(req.body);
    new_user.password = sha(req.body.password + process.env.PSW_SECRET);
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

exports.create_code = function(req, res){
    var new_code = new Code(req.body);
    new_code.code = uniqid();
    new_code.save(function(err, code){
        if(err) res.send(err);
        res.json(code);
    });
}

exports.get_codes = function (req, res){

}

//handlers for /code/:codeId

exports.get_specific_code = function (req, res){

}