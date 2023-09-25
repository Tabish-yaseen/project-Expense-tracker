const express=require('express')

const router=express.Router()
const productController=require('../controllers/product')

router.post('/add-product',productController.postProduct)
router.get('/get-allProducts',productController.getAllProduct)
router.get('/get-productbyId/:id',productController.getProductById)
router.delete('/delete-product/:id',productController.deleteProduct)
router.put('/update-product/:id',productController.updateProduct)

module.exports=router