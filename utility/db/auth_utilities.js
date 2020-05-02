'use strict';

const sha = require('simple-js-sha2-256');

exports.valid_password = function (given, saved){
    var calculated = sha(given + process.env.PSW_SECRET);
    if(calculated === saved){
        return true;
    }
    return false;
}