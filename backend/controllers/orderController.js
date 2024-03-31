import Order from '../model/orderModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// @desc Create new Order
// @route POST /api/orders
// @access Private

 const addOrderItems = asyncHandler(async (req,res)=>{
      const {
             orderItems,
             shippingAddress,
              paymentMethod,
             itemsPrice,
             taxPrice,
             totalPrice
            } = req.body

      if (orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
      } else{
        const order = new Order ({
            
          orderItems: orderItems.map((x)=>({
            ...x,
            product: x._id,
            _id:undefined, 
          })  
          ),
             user: req.user._id,
             shippingAddress,
             paymentMethod,
             itemsPrice,
             taxPrice,
             totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
      }
})

// @desc Get logged in user order
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req,res)=>{
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
})

// @desc Get oreder by id
// @route GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req,res)=>{

  //To add name and email to our order from user model we used populate method
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
})

// @desc Update Order to paid
// @route PUT /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req,res)=>{
  res.send('order updated to paid')
})


// @desc Update Order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req,res)=>{
  res.send('order delivered')
})

// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin

const getAllOrders = asyncHandler(async (req,res)=>{
  res.send('all orders')
})

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders
}