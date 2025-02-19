import { baseApi } from "@/redux/api/baseApi";
import { TCars } from "@/types/cars.types";
import { TResoponseRedux } from "@/types/globalt";


const uesrApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registation: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams()
        if (args) {
          args.forEach(element => {
            params.append(element.name,element.value as string)
          });
        }
        return {
          url: "/cars",
          method: "GET",
          params:params
        };
      },
      transformErrorResponse: (
        response: TResoponseRedux<TCars[]>
      ) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getCarById: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      transformErrorResponse: (response: TResoponseRedux<TCars>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  
  }),
});

export const { useRegistationMutation,useGetAllCarsQuery,useGetCarByIdQuery } = uesrApi;
