import { baseApi } from "@/redux/api/baseApi";
// import { TCars } from "@/types/cars.types";
// import { TResoponseRedux } from "@/types/globalt";


const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),
    
    getOrder: builder.query({
        query: () => ({
          url: `/orders`,
          method: "GET",
        }),
        // transformErrorResponse: (response: TResoponseRedux<TCars>) => {
        //   console.log("inside redux", response);
        //   return {
        //     data: response.data,
        //     meta: response.meta,
        //   };
        // },
      }),
      getOrderById: builder.query({
        query: (userId) => ({
          url: `/orders/single-order?userId=${userId}`, // Include userId as a query parameter
          method: "GET",
        }),
      }),
      verifyOrder: builder.query({
        query: (order_id) => ({
          url: "/orders/verify",
          params: { order_id },
          method: "GET",
        }),
      }),
  }),
});

export const { useCreateOrderMutation,useGetOrderQuery,useVerifyOrderQuery,useGetOrderByIdQuery} = orderApi;
