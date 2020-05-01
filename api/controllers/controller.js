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
        res.json(store);
    });
}

//handlers for /stores/:storeId

exports.get_a_store = function (req, res){
    db_utilities.find_store(req.params.storeId).
    then((store)=>{
        if(store){
            res.json(store);
        } else {
            res.status(404)
            .send('Store not found! Prova a controllare come hai scritto il nome del negozio');
        }
        
    });
}

exports.update_a_store = function (req, res){
    Store.findByIdAndUpdate(req.params.storeId, req.body, {new: true}, function(err, store){
        if(err) res.status(500).send("Something went wrong: \n" + err);
        res.json(store);
    })
}

exports.delete_a_store = function (req, res){
    console.log(req.params.storeId);
    Store.remove({"_id": req.params.storeId}), function(err){
        console.log("ciao" + err);
        if(err) res.status(500).send('Something went wrong: \n' + err);
        res.json({'name': req.params.storeId});
    }
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

//handlers for /stores/:storeId/available

exports.store_is_available = async function (req, res){
    // var codes_queue = await Code.count({'store': req.params.storeId}).exec();
    // var max
}

//handlers for /stores/:storeId/codes

exports.get_store_codes = function (req, res){
    Code.find({"store": req.params.storeId}, function(err, codes){
        if(err) res.status(500).send("Something went wrong: \n" + err);
        res.json(codes);
    })
}



//handlers for /stores/:storeId/codes/:code

exports.assign_code_to_store = async function(req,res){
    var storeId = req.params.storeId;
    var codeId = req.params.code;
    var store = await db_utilities.find_store(storeId);
    var code = await Code.find({'code': codeId});
    switch(code[0].status[0]){
        case 'inactive':
            code[0].status = 'in_queue';
            code[0].store = store._id;
            break;
        case 'in_queue':
            code[0].status = 'in_store';
            break;
        case 'in_store':
            code[0].status = 'inactive';
            code[0].store = null;
            break;
    }
    code[0].updated_at = new Date();
    console.log(code[0]);
    code[0].save();
    res.send(code[0]);
}

exports.delete_store_code = function (req, res){

}

//handlers for /users

exports.get_all_users = function (req, res){
    User.find({}, function(err, users){
        if(err) res.status(500).send(err);
        res.json(users);
    })
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
    db_utilities.find_user(req.params.userId)
    .then((user)=>{
        if(user){
            res.json(user);
        } else {
            res.status(404).send('Utente non trovato! Prova a controllare di aver scritto nome o id giusti');
        }
    });
}

exports.update_user = function (req, res){
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true}, function(err, user){
        if(err) res.status(500).send('Something went wrong: \n' + err);
        res.json(user);
    });
}

exports.delete_user = function (req, res){
    User.deleteOne({'_id': req.params.userId}, function(err){
        if(err) res.status(500).sent("Something went wrong: \n"+err);
        res.json({'_id': req.params.userId});
    });
}

//handlers for /codes

exports.get_codes = function (req, res){
    Code.find({}, function(err,codes){
        if(err){
            res.status(500).send('Something went wrong: \n' + err);
        } else {
            res.json(codes);
        }
    });
}

exports.create_code = function(req, res){
    var new_code = new Code(req.body);
    new_code.code = uniqid();
    new_code.save(function(err, code){
        if(err) res.send(err);
        res.json(code);
    });
}

//handlers for /codes/:codeId

exports.get_specific_code = function (req, res){
    Code.findById(req.params.codeId, function(err, code){
        if(err) res.status(500).send("Something went wrong: \n" + err);
        res.json(code);
    });
}