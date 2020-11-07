module.exports = (sequelize,Sequelize) => {
	const ComplaintCategory = sequelize.define('complaint_category',{
		categoryName:{
			type:Sequelize.STRING,
			allowNull:false,
			unique:true
		}
	});
	return ComplaintCategory;
}