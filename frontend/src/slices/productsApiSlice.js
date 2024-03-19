import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  
  endpoints: ( builder)=> ({
    
    getProducts : builder.query({
      query: ()=>({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, //to keep data in cached memory
    }),

    getProduct : builder.query({
      query: (productId) => ({
        url :     `${PRODUCTS_URL}/${productId} `,
       
      }),
      keepUnusedDataFor: 5,
    })

  }),

})

export const { useGetProductsQuery  , useGetProductQuery}  = productsApiSlice;