import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants.js";

export const usersApiSlice = apiSlice.injectEndpoints({
  
  endpoints: ( builder)=> ({
    
    login : builder.mutation({
      query: (data)=>({
        url:  `${USERS_URL}/login`,
        method: 'POST',
        body: data, 
      }),

    }),

    register : builder.mutation({
      query: (data)=>({
        url:  `${USERS_URL}`,
        method: 'POST',
        body: data, 
      }),

    }),

    logout : builder.mutation({
        query: ()=>({
          url:  `${USERS_URL}/logout`,
          method: 'POST',
        }),
  
      }),

    profile: builder.mutation({
      query: (data)=>({
        url:  `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),

    getAllUsers: builder.query({
      query : ()=>({
        url : USERS_URL
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5
    }),

    deleteUser: builder.mutation({
      query: (userId)=>({
         url:   `${USERS_URL}/${userId}`,
         method: 'DELETE'
      })
    }),

    getSingleUserDetails: builder.query({
      query: (userId)=>({
        url:  `${USERS_URL}/${userId}`
      }),
      keepUnusedDataFor: 5
    
    }),

    
    updateUser: builder.mutation({
      query: (data)=>({
        url:  `${USERS_URL}/${data.userId}`,
        method:'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    
    }),

  }),

})

export const {  useLoginMutation ,
                useLogoutMutation , 
                useRegisterMutation , 
                useProfileMutation , 
                useGetAllUsersQuery , 
                useDeleteUserMutation ,
                useGetSingleUserDetailsQuery,
                useUpdateUserMutation
              }  = usersApiSlice;