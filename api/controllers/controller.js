'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Code = mongoose.model('Code');

//handlers for /stores

exports.get_all_shops = function(req, res){
    res.send('test');
}

exports.create_a_shop = function (req, res){

}

//handlers for /stores/:storeId

exports.get_a_shop = function (req, res){
    
}

exports.update_a_shop = function (req, res){

}

exports.delete_a_shop = function (req, res){

}

//handlers for /stores/:storeId/codes

exports.get_shop_codes = function (req, res){

}

exports.create_code = function(req, res){

}

//handlers for /stores/:storeId/codes/:code

exports.delete_shop_code = function (req, res){

}

//handlers for /users

exports.get_all_users = function (req, res){

}

exports.create_user = function (req, res){

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