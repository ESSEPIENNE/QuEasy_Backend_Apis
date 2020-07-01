'use strict';

  const mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken'),
  randtoken = require('rand-token'),
  auth_utilities = require('../../utility/db/auth_utilities.js');

exports.login = async function(req, res){
  const {email, password} = req.body;
  var user = await User.findOne({email: email}).exec();
  if(!user) res.status(401).send('Invalid credentials!');
  if(!auth_utilities.valid_password(password, user.password)) res.status(401).send('Invalid credentials!');
  const payload = {
    'username': user.name,
    'role': user.role
  }
  const token = jwt.sign(payload, process.env.JWT, { expiresIn: 600 });
  if(!user){
    user.token = randtoken.uid(256);
    user.save();
  }
  res.json({
    id: user._id,
    email: user.email,
    role: user.role[0],
    store: user.store,
    token: token, 
    refreshToken: user.token
  });
  
}

exports.logout = async function(req, res){
  const refreshToken = req.body.refreshToken;
  User.findOneAndUpdate({token: refreshToken}, {token: null});
  res.sendStatus(204);
}

exports.refresh = function(req, res){
  const refreshToken = req.body.refreshToken;
  
  User.findOne({token: refreshToken}, function(err,user){
    if(err) res.sendStatus(401);
    if(!user) res.sendStatus(401);
    const payload = {
      'username': user.name,
      'role': user.role
    }
    const token = jwt.sign(payload, process.env.JWT, { expiresIn: 600 });
    res.json({jwt: token});
  });
}
