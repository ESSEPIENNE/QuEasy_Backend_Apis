'use strict';

//some random function for db interaction, I'll probably delete this file sometime in the future

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Code = mongoose.model('Code'),
    Store = mongoose.model('Store');

//evaluates if string matches Id pattern, if so search object using id, 
//if not it searches the object by name
exports.find_store = async function(storeId){
    if (storeId.match(/^[0-9a-fA-F]{24}$/)) {
        return await Store.findById(storeId);
    } else {
        return await Store.findOne({'name': storeId});
    }
}

exports.find_user = async function(userId){
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
        return await User.findById(userId);
    } else {
        return await User.findOne({'name': userId});
    }
}

exports.queue_availability = async function(storeId, max_in_queue){
    people_in_queue = await Code.count({store: storeId, status: "in_queue"}).exec();
    if(people_in_queue == max_in_queue){
        return false;
    } else {
        return true;
    }
}

exports.store_availability = async function(storeId, max_in_store){
    people_in_store = await Code.count({store: storeId, status: "in_store"}).exec();
    if(people_in_store == max_in_store){
        return false;
    } else {
        return true;
    }
}