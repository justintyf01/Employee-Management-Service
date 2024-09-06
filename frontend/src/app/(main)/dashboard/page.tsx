"use client";
import { ContentLayout } from "@/app/components/layouts/content-layout";
import EmployeeCard from "../../components/ui/EmployeeCard";
import { Box } from "@mui/material";
import { Employee } from "@/types/employee-data";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useGetEmployeesQuery } from "@/api/employee-api";
import Employees from "./employee-display";
import EmployeeDisplay from "./employee-display";

export default function Dashboard() {
    // Fetch data
    // const res = await fetch("http://localhost:3001/employees");
    // const employees = await res.json();

    return (
        <ContentLayout title="Dashboard">
            <EmployeeDisplay />
        </ContentLayout>
    );
}
