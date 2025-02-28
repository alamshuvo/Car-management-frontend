import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { RootState } from "../store";
import { setUser, logOut } from "../auth/authSlice";
const baseQueary = fetchBaseQuery({
  baseUrl: "https://cars-backend-pearl.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("authorization", `${token}`);
      localStorage.setItem("token", token);
    }
    return headers;
  },
});

const baseQuearyWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQueary(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error((result?.error?.data as { message: string })?.message);
  }

  if (result?.error?.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await fetch(
      "https://cars-backend-pearl.vercel.app/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await refreshResult.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      // Store new token in Redux & localStorage
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      localStorage.setItem("token", data.data.accessToken); // Save token in localStorage

      // Retry original request with new token
      result = await baseQueary(args, api, extraOptions);
    } else {
      api.dispatch(logOut()); // Logout if refresh fails
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuearyWithRefreshToken,
  tagTypes: ["allCars","cars"],
  endpoints: () => ({}),
});
