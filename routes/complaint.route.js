const Router = require('express').Router();
const {complaintController} = require('../controllers');
const {verifyLogin} = require('../middlewares');

Router.get('/',complaintController.get);
Router.post('/create',verifyLogin.verifyUser,complaintController.create);
Router.patch('/update/:id',verifyLogin.verifyAdmin,complaintController.update);

module.exports = Router;