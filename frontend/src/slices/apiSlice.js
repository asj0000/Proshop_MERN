import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from '../constants.js'

const baseQuery = fetchBaseQuery({baseQuery : BASE_URL}) //make the request on base url

export const apiSlice = createApi({
   
     baseQuery ,
     tagTypes: ['Product' , 'User' , 'Order'], //defines the type of data that we are fetching
     endpoints: (builder) => ({})  //here we define the endpoints where we make the request
     
})