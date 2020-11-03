//importing config and sequelize
const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
require('dotenv').config();
//connecting to sequelize
/*
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
	host:dbConfig.HOST,
	dialect:dbConfig.dialect,
	pool:{
		min:dbConfig.pool.min,
		max:dbConfig.pool.max,
		acquire:dbConfig.pool.acquire,
		idle:dbConfig.pool.acquire
	}
});
*/
const sequelize = new Sequelize(process.env.HEROKU_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     5432
  })
//importing all models
const User=require('./user.model')(sequelize,Sequelize);

//crating relations between tables

//exporting all models
module.exports = {
	Sequelize,
	sequelize,
	User
}