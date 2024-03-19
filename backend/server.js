import express from 'express'
import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import {errorHandler , notfound} from './middleware/errorHandler.js'
const PORT = process.env.PORT || 8000;

connectDB() //connect to MongoDB database

const app = express()


app.get('/' ,(req,res)=>{
  res.send( "Hello this is Server side port")

})

app.use('/api/products' , productRoutes)
app.use(errorHandler)
app.use(notfound)
 

app.listen(PORT ,(req,res)=>{
 console.log( `Server started at ${PORT}   `)
})