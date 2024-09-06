import { useLoginMutation, useSignupMutation } from "@/api/auth-api";
import { useCreateEmployeeMutation, useEditEmployeeMutation, useGetEmployeesQuery } from "@/api/employee-api";
import { Employee } from "@/types/employee-data";
import { create } from "domain";
import MuiForms from "mui-forms";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { Box, Button, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";

interface SignUpFormProps {
    setIsLogin: (value: boolean) => void;
}

export default function SignUpForm({ setIsLogin }: SignUpFormProps) {
    const router = useRouter();
    const [signup] = useSignupMutation();
    const { setIsAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const signupSchema = {
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
                            value: "8",
                            errorMsg: "Password should be at least 3 characters",
                        },
                        max: {
                            value: "255",
                            errorMsg: "Password should not be more than 255 characters",
                        },
                        pattern: {
                            value: "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$",
                            errorMsg: "Password too weak"
                        }
                    },
                },
            },
            {
                name: "departmentId",
                meta: {
                    displayType: "select",
                    displayName: "Department",
                    options: [
                        {
                            label: "Admin",
                            value: 1,
                        },
                        {
                            label: "HR",
                            value: 2,
                        },
                        {
                            label: "PS",
                            value: 3,
                        },
                    ],
                    validation: {
                        required: true,
                    },
                },
            },
        ],
    };

    async function handleSubmit(formData: any) {
        try {
            const res = await signup(formData);
            if ("error" in res && res.error) {
                setMessage(res.error?.data.errorMessage);
                setOpen(true);
            } else {
                setIsLogin(true);
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box>
            <MuiForms
                schema={signupSchema}
                onSubmit={(formData) => {
                    handleSubmit(formData);
                }}
                buttons={{
                    submit: (
                        <Button variant="contained" fullWidth sx={{ marginRight: 2 }}>
                            Sign up
                        </Button>
                    ),
                }}
            />
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: "white", // Set background color to white
                        color: "black", // Set text color to black for contrast
                    },
                }}
            />
        </Box>
    );
}
