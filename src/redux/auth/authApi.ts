import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      }),
      changePassword: builder.mutation({
        query: (userInfo) => ({
          url: "/auth/change-password",
          method: "POST",
          body: userInfo
        }),
      }),
      forgetPassword: builder.mutation({
        query: (userInfo) => ({
          url: "/auth/forget-password",
          method: "POST",
          body: userInfo
        }),
      }),
    }),
   
  })


export const { useLoginMutation,useChangePasswordMutation,useForgetPasswordMutation } = authApi;
