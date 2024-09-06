"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import EmployeeForm from "../forms/employee-form";
import { useLogoutMutation } from "@/api/auth-api";
import { useAuth } from "../providers/auth-provider";
import { useRouter } from "next/navigation";

interface NavbarProps {
    title: string;
}

export default function NavBar({ title }: NavbarProps) {
    const [logout] = useLogoutMutation();
    const { setIsAuthenticated } = useAuth();
    const router = useRouter();

    async function handleLogout() {
        try {
            const res = await logout();
            if ("data" in res) {
                // Successful response
                setIsAuthenticated(false);
                router.push("/");
            } else if ("error" in res) {
                // Handle error
                console.error("Login failed:", res.error);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <AppBar position="sticky" sx={{ zIndex: 10, backgroundColor: "#000065", boxShadow: 1 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: "white", fontWeight: "bolder" }}>
                    {title}
                </Typography>
                <Box className="space-x-2 flex items-center">
                    <Button variant="contained" color="success" startIcon={<PlusIcon />} href="/employee/new">
                        Add Employee
                    </Button>
                    <Button variant="contained" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
