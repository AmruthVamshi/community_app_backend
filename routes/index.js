const Router = require('express').Router();

Router.use('/auth',require('./auth.route'));

module.exports = Router;