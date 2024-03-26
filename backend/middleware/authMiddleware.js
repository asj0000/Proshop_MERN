import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../model/userModel.js'

//Protect Routes
 const protect = asyncHandler(async(req,res,next)=>{


  //Read the JWT from cookie
  let token = req.cookies.jwt


  if(token){

    try {
      
      const decoded = jwt.verify(token , process.env.JWT_SECRETKEY)
      req.user = await User.findById(decoded.userId).select('-password')
      next();
    
    } catch (error) {
      
      console.log(error)
      res.status(401)
      throw new Error('Not authorized ,token failed')
   
    }

  }else{
    res.status(401)
    throw new Error('Not authorized , no token')
  }
})

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
      next();

    }else{
      res.status(401)
      throw new Error('Not authorized , as admin')
    }
}

export {protect , admin}