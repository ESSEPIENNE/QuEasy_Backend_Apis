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
            res.json(store);
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

exports.assign_code_to_store = async function(req,res){
    var storeId = req.params.storeId;
    var codeId = req.params.code;
    var store = await db_utilities.find_store(storeId);
    var code = await Code.find({'code': codeId});
    switch(code[0].status){
        case 'inactive':
            code[0].status = 'in_queue';
            code[0].store = mongoose.Types.ObjectId(store._id);
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
    code[0].save();
    // Code.find({'code': codeId}, function(err, code){
    //     if(err){
    //         res.status(500).send('Something wrong happened');
    //     } else {
    //         console.log(code.code_type);
    //         code.store = store._id;
    //         code.status = 'in_queue';
    //         code.updated_at = new Date();
    //         code.save();
    //     }
    // });
    
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

}

exports.delete_user = function (req, res){

}

//handlers for /codes

// exports.get_codes = function (req, res){
//     Code.find({}, function(err,codes){
//         if(err){
//             res.status(500).send('Something wrong happened');
//         } else {
//             res.json(codes);
//         }
//     });
// }
exports.get_codes = function (req, res){
    var new_code = new Code(req.body);
    new_code.code = uniqid();
    new_code.save(function(err, code){
        if(err) res.send(err);
        res.json(code);
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

//handlers for /code/:codeId

exports.get_specific_code = function (req, res){

}