const {Complaint,ComplaintCategory,User,Sequelize} = require('../models');
const Op=Sequelize.Op;
exports.create=async(req,res)=>{
    try {
        const {complaint,category} = req.body;
        if(!complaint) throw 'Enter'
        let foundCategory = await ComplaintCategory.findOne({where:{categoryName:category}});
        if(!foundCategory) throw 'Invalid complaint category!'
        let response = await Complaint.create({
            complaint,
            status:'Not Seen',
            categoryId:foundCategory.id,
            userId:req.user.id,
            complaintCategoryId:foundCategory.id
        })
        res.status(200).json({
            message:`Your complaint is registered`,
            complaint:response
        })
    } catch (error) {
        res.status(203).json({
            message:'some error occured!',
            error
        })
    }
}

exports.get=async(req,res)=>{
    try {
        let response=[];
        let order = req.query.order?req.query.order:'DESC';
        let startDate = req.query.startDate?new Date(req.query.startDate):new Date('2020-10-7');
        let endDate = req.query.endDate?new Date(req.query.endDate):new Date();
        console.log(startDate.toDateString(),endDate.toDateString());
        if(
            Object.keys(req.query).length === 0 ||
            (Object.keys(req.query).length === 1 && typeof req.query.order!='undefined') ||
            typeof req.query.startDate!='undefined' || typeof req.query.endDate!='undefined'
        ){
            const complaints = await Complaint.findAll({
                include:[
                    {
                        model:ComplaintCategory,
                        as:'category'
                    },
                    {
                        model:User,
                        as:"linkedUser"
                    }
                ],
                order: [["updatedAt", order]],
                where:{
                    [Op.or]: [{
                        updatedAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    }]
                }
            });
            response = complaints;
        }else{
            if(typeof req.query.category!='undefined'){
                let catId = await ComplaintCategory.findOne({where:{categoryName:req.query.category}});
                if(!catId) throw 'invalid category';
                const complaints = await Complaint.findAll({
                    where:{
                        categoryId:catId.id,
                        [Op.or]: [{
                            updatedAt: {
                                [Op.between]: [startDate, endDate]
                            }
                        }]
                    },
                    order: [["updatedAt", order]],
                    include:[
                        {
                            model:ComplaintCategory,
                            as:'category'
                        },
                        {
                            model:User,
                            as:"linkedUser"
                        }
                    ]
                })
                response.push(...complaints);
            }
        }
        res.status(200).json({
            message:'Complaints response',
            body:response.map(item=>{
                return {
                    id:item.id,
                    category:item.category.categoryName,
                    date:(()=>{
                        let date = new Date(item.updatedAt).toString();
                        return date.substring(0,date.length-31)
                    })(),
                    complaint:item.complaint,
                    status:item.status,
                    houseNumber:item.linkedUser.houseNumber,
                    phoneNumber:item.linkedUser.phoneNumber
                }
            })
        })
    } catch (error) {
        console.log(error)
        res.status(203).json({
            message:'some error occured!',
            error
        })
    }
}

exports.delete=async(req,res)=>{
    try {
        let comp = await Complaint.findOne({
            where:{
                id:req.params.id
            },
            include:['linkedUser']
        });
        if(comp.linkedUser.id!==req.user.id) throw 'You cannot delete this complaint!'
        let response = await Complaint.destroy({where:{id:req.params.id}});
        if(!response) throw 'Could not delete the complaint';
        res.status(200).json({
            message:'sucessfully deleted the complaint'
        })
    } catch (error) {
        console.log(error)
        res.status(203).json({
            message:'some error occured!',
            error
        })
    }
}
