/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'POST /user/signup': 'UserController/signup',
    'POST /user/login': 'UserController/login',
    'GET /api/user/:id': 'UserController/get',
    'GET /api/user': 'UserController/getAll',
    'POST /api/product': 'ProductsController/create',
    'GET /api/product/:id': 'ProductsController/getOne',
    'GET /api/product': 'ProductsController/getAll',
    'DELETE /api/product/:id': 'ProductsController/delete',


    

};
