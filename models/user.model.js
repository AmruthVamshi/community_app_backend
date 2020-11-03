module.exports = (sequelize,Sequelize) => {
	const User = sequelize.define('user',{
		userName:{
			type:Sequelize.STRING,
			allowNull:false
		},
		password:{
			type:Sequelize.STRING,
			allowNull:false
		},
		houseNumber:{
            type:Sequelize.STRING,
            allowNull:false
		},
		phoneNumber:{
            type:Sequelize.STRING,
            allowNull:false
		}
	});
	return User;
}