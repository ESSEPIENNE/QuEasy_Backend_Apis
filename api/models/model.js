
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  password: {
    type: String,
    required: 'Kindly enter the password of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

var CodeSchema = new Schema({
    code_type:{
        type: [{
            type: String,
            enum: ['one_time', 'all_day']
          }],
        default: ['all_day']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Code', CodeSchema);