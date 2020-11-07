const Router = require('express').Router();
const {categoryController} = require('../controllers');
const {verifyLogin} = require('../middlewares');

Router.get('/',categoryController.getAllCategories);
Router.post('/create',verifyLogin.verifyAdmin,categoryController.createCategory);
Router.delete('/delete',verifyLogin.verifyAdmin,categoryController.deleteCategory);

module.exports = Router;