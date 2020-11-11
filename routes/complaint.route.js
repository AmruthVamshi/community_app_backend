const Router = require('express').Router();
const {complaintController} = require('../controllers');
const {verifyLogin} = require('../middlewares');

Router.get('/',complaintController.get);
Router.post('/create',verifyLogin.verifyUser,complaintController.create);
Router.delete('/delete/:id',verifyLogin.verifyUser,complaintController.delete);

module.exports = Router;