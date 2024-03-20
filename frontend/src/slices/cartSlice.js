import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils.js';

//check if there are items already and if not then give it an empty array
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: []} 



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
    }
  }

});

export const { addToCart } =  cartSlice.actions

export default cartSlice.reducer