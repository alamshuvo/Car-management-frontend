import { baseApi } from "@/redux/api/baseApi";


const uesrApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registation: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
 
  
  }),
});

export const { useRegistationMutation } = uesrApi;
