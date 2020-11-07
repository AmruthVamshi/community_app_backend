const Router = require('express').Router();
const {authController} = require('../controllers');

Router.post('/login',authController.login);
Router.post('/admin/login',authController.adminLogin);
Router.post('/register',authController.register);

module.exports = Router;