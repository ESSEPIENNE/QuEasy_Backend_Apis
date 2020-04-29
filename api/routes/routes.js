'use strict';

module.exports = function(app) {
  var contr = require('../controllers/controller.js');

  
    app.route('/stores')
        .get(contr.list_all_shops)
        .post(contr.create_a_shop);


    app.route('/stores/:storeId')
        .get(contr.get_a_shop)
        .put(contr.update_a_shop)
        .delete(contr.delete_a_shop);
    
    app.route('/stores/:storeId/codes')
        .get(contr.get_shop_codes)
        .post(contr.create_code);
    
    app.route('/stores/:storeId/codes/:code')
        .delete(contr.delete_shop_code);
    
    app.route('/users')
        .get(contr.get_all_users)
        .post(contr.create_user);

    app.route('/users/:userId')
        .get(contr.get_user)
        .put(contr.update_user)
        .delete(contr.delete_user);
    
    app.route('/codes')
        .get(contr.get_codes);
    
    app.route('/codes/:codeId')
        .get(contr.get_specific_code);
};