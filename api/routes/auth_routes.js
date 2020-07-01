'use strict';

//authentication routes definition

module.exports = function(app) {
    var auth = require('../controllers/auth_controller.js');

    app.route('/login')
        .post(auth.login);
    
    app.route('/logout')
        .post(auth.logout);
    
    app.route('/refresh')
        .post(auth.refresh);
};