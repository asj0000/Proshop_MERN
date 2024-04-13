import path from 'path'
import express from 'express'
import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import {errorHandler , notfound} from './middleware/errorHandler.js'


const PORT = process.env.PORT || 8000;

connectDB() //connect to MongoDB database

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Cookie parser middleware
app.use(cookieParser());


app.get('/' ,(req,res)=>{
  res.send( "Hello this is Server side port")

})

app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders' , orderRoutes)
app.use('/api/upload' , uploadRoutes)

app.get('/api/config/paypal' , (req, res)=>
   res.send({clientId : process.env.PAYPAL_CLIENT_ID})
)

const __dirname = path.resolve()
app.use('/uploads' , express.static(path.join(__dirname , '/uploads')))


app.use(errorHandler)
app.use(notfound)
 

app.listen(PORT ,(req,res)=>{
 console.log( `Server started at ${PORT}   `)
})