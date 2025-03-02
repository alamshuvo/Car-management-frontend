import { baseApi } from "@/redux/api/baseApi";
import { TCars } from "@/types/cars.types";
import { TResoponseRedux } from "@/types/globalt";
import { TUser } from "@/types/user.types";


const uesrApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registation: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMe: builder.mutation({
      query: (userInfo) => ({
        url: "/users/me",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllCars: builder.query({
      query: (args: { name: string; value: string }[]) => {
        const params = new URLSearchParams();
    
        if (args && Array.isArray(args)) {
          args.forEach((element) => {
            params.append(element.name, element.value);
          });
        }
    
        return {
          url: "/cars",
          method: "GET",
          params: params, // Correct placement of params
        };
      },
      providesTags: ["allCars"],
      transformResponse: (response: TResoponseRedux<TCars[]>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResoponseRedux<TUser>) => {
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
      transformResponse: (response: TResoponseRedux<TCars>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  
  }),
});

export const { useRegistationMutation,useGetAllCarsQuery,useGetCarByIdQuery,useGetUserByIdQuery,useGetMeMutation } = uesrApi;
