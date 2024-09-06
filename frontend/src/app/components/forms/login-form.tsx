import { useLoginMutation } from "@/api/auth-api";
import { useCreateEmployeeMutation, useEditEmployeeMutation, useGetEmployeesQuery } from "@/api/employee-api";
import { Employee } from "@/types/employee-data";
import { create } from "domain";
import MuiForms from "mui-forms";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const [login] = useLoginMutation();
    const { setIsAuthenticated } = useAuth();

    const loginSchema = {
        fields: [
            {
                name: "username",
                meta: {
                    displayType: "text",
                    displayName: "Username",
                    validation: {
                        required: true,
                        min: {
                            value: "3",
                            errorMsg: "Username should be at least 3 characters",
                        },
                        max: {
                            value: "255",
                            errorMsg: "Username should not be more than 255 characters",
                        },
                    },
                },
            },
            {
                name: "password",
                meta: {
                    displayType: "password",
                    displayName: "Password",
                    validation: {
                        required: true,
                        min: {
                            value: "3",
                            errorMsg: "Password should be at least 3 characters",
                        },
                        max: {
                            value: "255",
                            errorMsg: "Password should not be more than 255 characters",
                        },
                    },
                },
            },
        ],
    };

    async function handleSubmit(formData: any) {
        try {
            const res = await login(formData);
            if ("data" in res) {
                // Successful response
                setIsAuthenticated(true);
                router.push("/dashboard");
            } else if ("error" in res) {
                // Handle error
                console.error("Login failed:", res.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box>
            <MuiForms
                schema={loginSchema}
                onSubmit={(formData) => {
                    handleSubmit(formData);
                }}
                buttons={{
                    submit: (
                        <Button variant="contained" fullWidth sx={{ marginRight: 2 }}>
                            Login
                        </Button>
                    ),
                }}
            />
        </Box>
    );
}
