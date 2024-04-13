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

// @desc  Create product
// @route POST /api/products
// @access Private/admin

const createProduct = asyncHandler(async (req,res)=>{
      
     const product = new Product({
          name:'Sample name',
          image: '/images/sample.jpg',
          brand: 'Sample brand',
          category: 'sample category',
          price: 0,
          countInStock: 0,
          numReviews: 0,
          user: req.user._id,
          description: 'sample description'
     })

     const createdProduct = await product.save()

     res.status(201).json(createdProduct)

   })

   
// @desc Update product
// @route PUT /api/products/:id/edit
// @access Private/admin

 const updateProduct = asyncHandler(async (req,res)=>{
     const { name ,price, description , image , brand , category ,countInStock } = req.body
    
     const product = await Product.findById(req.params.id)
     
     if(product){
          product.name = name,
          product.price = price,
          product.description = description,
          product.image = image,
          product.brand = brand,
          product.category = category,
          product.countInStock = countInStock

          const updatedProduct = await product.save()
          res.json(updatedProduct)
     } else{
          res.status(400)
          throw new Error( 'Product not Found')
     }

    
    
   })

     
// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/admin

 const deleteProduct = asyncHandler(async (req,res)=>{
    
     const product = await Product.findById(req.params.id)
     
     if(product){
         
         await Product.deleteOne({_id: product._id});
         res.status(200).json('Product deleted successfully')
     } else{
          res.status(400)
          throw new Error( 'Product not Found')
     }

    
   })
   

export {getProducts , getProductById  , createProduct , updateProduct , deleteProduct}