const {ComplaintCategory,Complaint,User} = require('../models');

exports.getAllCategories=async(req,res)=>{
    try {
        let categories = await ComplaintCategory.findAll((req.query.complaints=='true')?{
            include:[
                {
                    model:Complaint,
                    as:'complaint',
                    include:[
                        {
                            model: User,
                            as:'linkedUser'
                        }
                    ]
                }
            ]
        }:{where:null});
        res.status(200).json({
            message:'All categories!',
            categories:categories.map((category)=>{
                return {
                    id:category.id,
                    categoryName:category.categoryName,
                    complaints:category.complaint?category.complaint.map(res=>{
                        return {
                            id:res.id,
                            complaint:res.complaint,
                            status:res.status,
                            registeredBy : {
                                id:res.linkedUser.id,
                                ownerName:res.linkedUser.userName,
                                houseNumber:res.linkedUser.houseNumber,
                                phoneNumber:res.linkedUser.phoneNumber
                            },
                            date:(()=>{
                                let date = new Date(res.updatedAt).toString();
                                return date.substring(0,date.length-31)
                            })()
                        }
                    }):undefined
                }
            })
        })
    } catch (error) {
        res.status(500).json({
            message:"some error occured!",
            error
        })
    }
}

exports.createCategory=async(req,res)=>{
    try {
        const {categoryName} = req.body;
        if(!categoryName) throw 'enter category name!.'
        const category = await ComplaintCategory.create({
            categoryName
        })
        res.status(200).json({
            message:`Created a ${category.categoryName} category!.`,
            category
        })
    } catch (error) {
        res.status(500).json({
            message:"some error occured!",
            error
        })
    }
}

exports.deleteCategory=async(req,res)=>{
    try {
        const {categoryName} = req.body;
        if(!categoryName) throw 'enter category name!.'
        const result = await ComplaintCategory.destroy({
            where:{
                categoryName
            }
        })
        if(!result) throw 'could not delete this category!'
        res.status(200).json({
            message:`Deleted ${categoryName} category!`
        })
    } catch (error) {
        res.status(500).json({
            message:"some error occured!",
            error
        })
    }
}