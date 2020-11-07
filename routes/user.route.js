const Router = require('express').Router();
const {userController} = require('../controllers');
const {verifyLogin} = require('../middlewares');

Router.get('/',verifyLogin.verifyUser,userController.get);
Router.patch('/update',verifyLogin.verifyUser,userController.update);
Router.get('/complaints',verifyLogin.verifyUser,userController.getComplaints);

module.exports = Router;