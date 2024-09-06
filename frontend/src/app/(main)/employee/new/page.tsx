// this page will fetch and display employee table
"use client";
import { ContentLayout } from "@/app/components/layouts/content-layout";
import { Box, Breadcrumbs, Card, CardContent, createTheme, Link, ThemeProvider, Typography } from "@mui/material";
import EmployeeForm from "@/app/components/forms/employee-form";
import { useAuth } from "@/app/components/providers/auth-provider";

export default function EmployeePage() {
    // Server side fetching for all employee data

    const theme = createTheme();

    theme.typography.h3 = {
        fontSize: "1rem",
        "@media (min-width:600px)": {
            fontSize: "1rem",
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "1.5rem",
        },
        fontWeight: "bolder",
    };
    const { isAuthenticated } = useAuth();

    return (
        <ContentLayout title="New Employee">
            <Breadcrumbs aria-label="breadcrumb" className="m-4">
                <Link underline="hover" color="inherit" href="/dashboard">
                    Dashboard
                </Link>
                <Typography color="text.primary">New Employee</Typography>
            </Breadcrumbs>
            <EmployeeForm />
        </ContentLayout>
    );
}


