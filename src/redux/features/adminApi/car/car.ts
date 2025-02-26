import { baseApi } from "@/redux/api/baseApi";
// import { TCars } from "@/types/cars.types";
// import { TResoponseRedux } from "@/types/globalt";


const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (userInfo) => ({
        url: "/cars",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["allCars"],
    }),
    deleteCar: builder.mutation({
        query: (carId) => ({
          url: `/cars/${carId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["allCars"],
      }),
    
    // getOrder: builder.query({
    //     query: () => ({
    //       url: `/orders`,
    //       method: "GET",
    //     }),
    //     // transformErrorResponse: (response: TResoponseRedux<TCars>) => {
    //     //   console.log("inside redux", response);
    //     //   return {
    //     //     data: response.data,
    //     //     meta: response.meta,
    //     //   };
    //     // },
    //   }),
    //  totalRevenue: builder.query({
    //     query: () => ({
    //       url: `/orders/revenue`,
    //       method: "GET",
    //     }),
    //     // transformErrorResponse: (response: TResoponseRedux<TCars>) => {
    //     //   console.log("inside redux", response);
    //     //   return {
    //     //     data: response.data,
    //     //     meta: response.meta,
    //     //   };
    //     // },
    //   }),
    //   getOrderById: builder.query({
    //     query: (userId) => ({
    //       url: `/orders/single-order?userId=${userId}`, // Include userId as a query parameter
    //       method: "GET",
    //     }),
    //   }),
     
  }),
});

export const { useCreateCarMutation,useDeleteCarMutation} = carApi;
