import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials, User } from "@/types/user-data";
import { employeeApi } from "./employee-api";



// Define an API service
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:3001/auth",
        credentials: "include", // This ensures cookies are sent with requests
    }),
    tagTypes: ["User", "Employee"],
    endpoints: (builder) => ({
        login: builder.mutation<void, LoginCredentials>({
            query: (credentials) => ({
                url: `/login`,
                method: "POST",
                body: credentials,
            }),
        }),
        signup: builder.mutation<void, User>({
            query: (newUser) => ({
                url: "/sign-up",
                method: "POST",
                body: newUser,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `/logout`,
                method: "POST",
            }),
            invalidatesTags: ["Employee"],
        }),
        checkJwt: builder.query<void, void>({
            query: () => "/jwtCheck",
            keepUnusedDataFor: 0,
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation, useCheckJwtQuery } = userApi;
