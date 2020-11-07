const Router = require('express').Router();

Router.use('/auth',require('./auth.route'));
Router.use('/categories',require('./complaintCategory.route'));
Router.use('/complaints',require('./complaint.route'));
Router.use('/user',require('./user.route'));

module.exports = Router;