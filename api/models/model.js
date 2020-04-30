
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the user'
  },
  email: {
    type: String,
    required: 'Kindly enter the email of the user'
  },
  password: {
    type: String,
    required: 'Kindly enter the password of the user'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var CodeSchema = new Schema({
    code: {
        type: String,
        required: 'Kindly enter the password of the user'
    },
    status: {
        type: [{
            type: String,
            enum: ['in_queue', 'in_store']
        }],
        default: ['in_queue']
    },
    code_type:{
        type: [{
            type: String,
            enum: ['one_time', 'all_day']
        }],
        default: ['all_day']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    store_id: {
        type: String
    }
});

var StoreSchema = new Schema({
    name: {
        type: String,
        // required: 'Kindly enter the name of the store'
    },
    max_queue: {
        type: Number,
        // required: 'Kindly enter the max number of possible persons in queue'
    },
    max_in_store: {
        type: Number,
        // required: 'Kindly enter the max number of possible persons in store'
    }
});

module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Code', CodeSchema);
module.exports = mongoose.model('Store', StoreSchema);