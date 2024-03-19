
export const notfound = (req,res,next)=>{
   const error = new Error( `Not found -${req.originalUrl}`)
   res.statusCode(404)
   next(error)  //call the error handler 
}

export const errorHandler = (err, req,res,next) =>{
  
  let statusCode = res.status === 200 ? 500 : res.status
  let message = err.message


  //Check for Mongoose bad ObjectId
  if(err.name === 'CastError' && err.kind==='ObjectId'){
    message = 'Resource not found'
    statusCode = 404
  }
  
  res.status(statusCode).json({
    message,
    stack : process.env.NODE_ENV === 'production' ? '': err.stack
  })
  
}

