module.exports = (sequelize,Sequelize) => {
	const Complaint = sequelize.define('complaint',{
		complaint:{
			type:Sequelize.TEXT,
			allowNull:false
        },
        status:{
            type:Sequelize.STRING,
            allowNull:false
        }
	});
	return Complaint;
}