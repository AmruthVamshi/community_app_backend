const Router = require('express').Router();
const {userController} = require('../controllers');
const {verifyLogin} = require('../middlewares');

Router.get('/',verifyLogin.verifyUser,userController.get);

module.exports = Router;