//require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
require('dotenv').config();
//middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',require('./routes'));

const PORT = process.env.PORT || 3001;
//connecting to database
(async ()=>{
	try {
		await db.sequelize.sync({alter:true});
		console.log('connected to database....');
	} catch(e) {
		console.log(e);
	}
})();
//starting server at port 3000
app.listen(PORT,()=>{
	console.log(`server started at http://localhost:${PORT} .....!`);
});