import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  
  endpoints: ( builder)=> ({
    
    getProducts : builder.query({
      query: ({ pageNumber , keyword })=>({
        url: PRODUCTS_URL,
        params: {
          pageNumber,
          keyword,
        }
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5, //to keep data in cached memory
    }),

    getProduct : builder.query({
      query: (productId) => ({
        url :     `${PRODUCTS_URL}/${productId} `,
       
      }),
      
      keepUnusedDataFor: 5,
    }),

   
   //Post query to create a new Product by admin
    createProduct : builder.mutation({

      query: ()=>({
        url: PRODUCTS_URL,
        method: 'POST'
      }),
      invalidatesTags: ['Product']
    }),

    updateProduct : builder.mutation({
      query: (data)=>({
        url:  `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body : data
      }),
      invalidatesTags: ['Products'],
    }),

    uploadProductImage: builder.mutation({
      query: (data)=>({
        url:  `${UPLOAD_URL}`,
        method: 'POST',
        body: data
      })
    }),

    deleteProduct: builder.mutation({
      query: (id)=>({
        url:  `${PRODUCTS_URL}/${id}`,
        method: 'DELETE'
      })
    }),

    createReview: builder.mutation({
      query: (data)=>({
        url:  `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Products']
    })

  }),

})

export const {  useGetProductsQuery  , 
                useGetProductQuery, 
                useCreateProductMutation , 
                useUpdateProductMutation , 
                useUploadProductImageMutation ,
                useDeleteProductMutation,
                useCreateReviewMutation,  }  = productsApiSlice;