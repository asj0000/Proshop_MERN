import Product from '../model/productModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public

 const getProducts = asyncHandler(async (req,res)=>{
  const allProducts = await Product.find({})
  res.json(allProducts)
})


// @desc Fetch one product
// @route GET /api/products/:id
// @access Public
const getProductById =  asyncHandler(async(req,res)=>{
   
  const oneProduct =  await Product.findById(req.params.id)
     
     if(oneProduct){
          return res.json(oneProduct)
     }else{
          res.status(404)
          throw new Error('Product not found')
     }
     
})


export {getProducts , getProductById }