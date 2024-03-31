import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils.js';

//check if there are items already and if not then give it an empty array
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] , shippingAddress: {} , paymentMethod: 'PayPal'} 



const cartSlice = createSlice({

  name: "cart",
  initialState,
  reducers : {
    addToCart : (state , action) => {
         const item = action.payload

         //check if it is present already
         const existItem = state.cartItems.find((x)=> x._id === item._id);

         if(existItem){
          state.cartItems = state.cartItems.map((x) => x._id === existItem._id
          ? item : x)
         }else{
          state.cartItems = [...state.cartItems , item]
         }

        return updateCart(state)
    },

    removeFromCart : (state , action) =>{
          state.cartItems = state.cartItems.filter((x)=> x._id !== action.payload)

          return updateCart(state)
    },

    setShippingAddress: (state , action)=>{
      state.shippingAddress = action.payload
      return updateCart(state)
   },

   setPaymentMethod: (state , action)=>{
    state.paymentMethod = action.payload
    return updateCart(state)
 },

   clearCartItems : (state,action)=>{
    state.cartItems = []
    return updateCart(state)
   }
  
  },


});

export const { 
  addToCart , 
  removeFromCart ,
  setShippingAddress ,
  setPaymentMethod,
  clearCartItems
} =  cartSlice.actions

export default cartSlice.reducer