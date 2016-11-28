
'use strict';

module.exports = function (app) {

//TODO: use /client?
    app.use('/api/customer', require('./api/customer'));
    app.use('/api/product', require('./api/product'));
    app.use('/auth',require('./auth'));
};
