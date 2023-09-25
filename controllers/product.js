const Product=require('../module/prouct')

exports.postProduct= async (req,res,next)=>{
    try{
        const{expenseAmount,description,category}=req.body
       let product= await Product.create({
            expenseAmount:expenseAmount,
            description:description,
            category:category
        })
        res.status(200).json({product:product})

    }catch(err){
        res.status(500).json({error:err})
    }
}
exports.getAllProduct=async (req,res,next)=>{
    try{
       let products= await Product.findAll()
       res.status(201).json({products:products})
    }catch(err){
        res.status(500).json({error:err})
    }
}
exports.getProductById=async(req,res,next)=>{
    try{
        const userId=req.params.id
        if(!userId){
            return res.status(400).json('no product with this id')
        }
       let product= await Product.findByPk(userId)
       res.status(202).json({product:product})

    }catch(err){
        res.status(500).json({error:err})
    }

}
exports.deleteProduct=async (req,res,next)=>{
    try{
        const userId=req.params.id
        if(!userId){
            return res.status(400).json('no product with this id')
        }
       let deletedProductById=await Product.destroy({ where:{id:userId} })
       res.status(201).json({deletedProduct:deletedProductById})
    }catch(err){
        res.status(500).json({error:err})
    }
}
exports.updateProduct=async (req,res,next)=>{
    try{
        const userId=req.params.id
        const updatedAmount=req.body.expenseAmount
        const updatedDescription=req.body.description
        const updatedCategory=req.body.category
        if(!userId){
            return res.status(400).json('no product with this id')
        }
        let updatedProduct=await Product.update({
            expenseAmount: updatedAmount,
            description: updatedDescription,
            category: updatedCategory
            },
            {where: { id: userId }});
          res.status(203).json({updatedPoduct:updatedProduct})

    }catch(err){
        res.status(500).json({error:err})
    }
}