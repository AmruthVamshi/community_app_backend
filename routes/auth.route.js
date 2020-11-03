const Router = require('express').Router();
const {authController} = require('../controllers');

Router.post('/login',authController.login);
Router.post('/register',authController.register);

module.exports = Router;