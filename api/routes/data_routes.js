'use strict';

module.exports = function(app) {
  var contr = require('../controllers/data_controller.js');
  var auth = require('../controllers/auth_controller.js');
  
    app.route('/stores')
        .get(contr.get_all_stores)
        .post(contr.create_a_store);

    app.route('/stores/:storeId')
        .get(contr.get_a_store)
        .put(contr.update_a_store)
        .delete(contr.delete_a_store);
    
    app.route('/stores/:storeId/codes')
        .get(contr.get_store_codes);

    app.route('/stores/:storeId/codes/:code')
        .post(contr.assign_code_to_store)
        .delete(contr.delete_store_code);
    
    app.route('/stores/:storeId/logo')
        .get(contr.get_a_store_logo);

    app.route('/users')
        .get(passport.authenticate('jwt'), contr.get_all_users)
        .post(contr.create_user);

    app.route('/users/:userId')
        .get(contr.get_user)
        .put(contr.update_user)
        .delete(contr.delete_user);
    
    app.route('/codes')
        .get(contr.get_codes)
        .post(contr.create_code);
    
    app.route('/codes/:codeId')
        .get(contr.get_specific_code);

};