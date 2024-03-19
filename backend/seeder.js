import mongoose from "mongoose";
import dotenv from 'dotenv'
import users from "./data/users.js";
import User from './model/userModel.js'
import products from "./data/products.js";
import Product from './model/productModel.js'
import Order from './model/orderModel.js'
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async ()=>{
  try { 

  await  Order.deleteMany()
  await  User.deleteMany()
  await  Product.deleteMany()

  const createdUsers = await User.insertMany(users);

  const adminUser = createdUsers[0]._id   //Get the id of Admin user from users array
    
  const sampleProducts = products.map((product)=>{
         return {...product , user:adminUser}
  });
  
  await Product.insertMany(sampleProducts)

  console.log('Data imported successfully')
  process.exit()
  } catch (error) {
    console.log(  `${error}`)
    process.exit(1)
  }
}

const destroyData = async ()=>{
    try {
      await  Order.deleteMany()
      await  User.deleteMany()
      await  Product.deleteMany()

      console.log('Data deleted successfully')
      process.exit()

      
    } catch (error) {
      console.log(  `${error}`)
      process.exit(1)
    }
}

if (process.argv[2] === '-d'){
  destroyData()      //to destroy data when we run this file from command line
}else{
  importData()       //to import data when we run this file from command line
}