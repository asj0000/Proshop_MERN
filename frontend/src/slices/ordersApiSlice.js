import { apiSlice } from "./apiSlice.js"
import { ORDERS_URL, PAYPAL_URL } from "../constants.js"

export const orderApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder)=>({

    createOrder : builder.mutation({
      query: (order)=>({
         url: ORDERS_URL,
         method: 'POST',
         body: order,
      })
    }),

    getOrderDetails: builder.query({
      query: (orderId)=>({
        url:  `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5
    }),

    payorder: builder.mutation({
      query: ({orderId , details}) =>({
        url:  `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details }
      })
    }),

    getPayPalClientId : builder.query({
      query: ()=>({
        url:  PAYPAL_URL,
        
      }), 
      keepUnusedDataFor: 5
    }),

    getMyOrders: builder.query({
      query: ()=>({
        url:  `${ORDERS_URL}/mine`
      })
    }),

    //This query will be run by admin or admin controlled screens
    getAllOrders: builder.query({
      query: ()=>({
        url:  ORDERS_URL
      }),
      keepUnusedDataFor: 5,
    }),

     //This query will be run by admin 
    setDeliveryStatus : builder.mutation({
      query: (orderid)=>({
        url:  `${ORDERS_URL}/${orderid}/deliver`,
        method: 'PUT',
      })
    }),

  })
})

export const {  useCreateOrderMutation ,
                useGetOrderDetailsQuery , 
                usePayorderMutation , 
                useGetPayPalClientIdQuery , 
                useGetMyOrdersQuery,
                useGetAllOrdersQuery, 
                useSetDeliveryStatusMutation,
              } = orderApiSlice