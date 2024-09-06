import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee } from "@/types/employee-data";

// Define an API service
export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3001/employees", credentials: "include" }), // Include credentials for cookies
    tagTypes: ["Employee"],
    endpoints: (builder) => ({
        getEmployees: builder.query<{ employees: Employee[]; totalCount: number }, { page: number }>({
            query: ({ page }) => `?page=${page}`, // endpoint URL
            providesTags: ["Employee"],
        }),
        editEmployee: builder.mutation<void, Employee>({
            query: (updatedEmployee) => ({
                url: `${updatedEmployee.id}`,
                method: "PUT",
                body: updatedEmployee,
            }),
            invalidatesTags: ["Employee"],
        }),
        createEmployee: builder.mutation<void, Employee>({
            query: (newEmployee) => ({
                url: "",
                method: "POST",
                body: newEmployee,
            }),
            invalidatesTags: ["Employee"],
        }),
        deleteEmployee: builder.mutation<void, Employee>({
            query: (deletedEmployee) => ({
                url: `/${deletedEmployee.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Employee"],
        }),
    }),
});

export const { useGetEmployeesQuery, useCreateEmployeeMutation, useEditEmployeeMutation, useDeleteEmployeeMutation } = employeeApi;
