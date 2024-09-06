import { useCreateEmployeeMutation, useEditEmployeeMutation, useGetEmployeesQuery } from "@/api/employee-api";
import { Employee } from "@/types/employee-data";
import { create } from "domain";
import MuiForms from "mui-forms";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Slide, Snackbar, SnackbarCloseReason } from "@mui/material";

interface EmployeeFormProps {
    employee?: Employee;
    handleCloseDialog?: any;
    refetch?: () => void;
}

export default function EmployeeForm({ employee, handleCloseDialog, refetch }: EmployeeFormProps) {
    const router = useRouter();
    const [createEmployee] = useCreateEmployeeMutation();
    const [editEmployee] = useEditEmployeeMutation();
    const [open, setOpen] = useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const employeeSchema = {
        fields: [
            {
                name: "name",
                meta: {
                    displayType: "text",
                    displayName: "Name",
                    value: employee ? `${employee.name}` : "",
                    validation: {
                        required: true,
                        min: {
                            value: "3",
                            errorMsg: "Name should be at least 3 characters",
                        },
                        max: {
                            value: "255",
                            errorMsg: "Name should not be more than 255 characters",
                        },
                        pattern: {
                            value: "^[A-Za-z ]+$",
                            errorMsg: "Name should contain only letters and spaces",
                        },
                    },
                },
            },
            {
                name: "salary",
                meta: {
                    displayType: "number",
                    displayName: "Salary",
                    value: employee ? `${employee.salary}` : 1,
                    validation: {
                        required: true,
                        min: {
                            value: 1,
                            errorMsg: "Salary should not be less than 1",
                        },
                        pattern: {
                            value: "^[0-9]+$",
                            errorMsg: "Only numbers allowed",
                        },
                    },
                },
            },
            {
                name: "departmentId",
                meta: {
                    displayType: "select",
                    displayName: "Department",
                    value: employee ? `${employee.departmentId}` : "",
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
            formData.salary = parseInt(formData.salary);
            if (employee && refetch) {
                formData.id = employee.id;
                formData.departmentId = parseInt(formData.departmentId);

                await editEmployee(formData).unwrap();

                handleCloseDialog();
                refetch();
            } else {
                // NOTE: Handle creation

                // using redux RTK query
                await createEmployee(formData).unwrap();
                router.push("/dashboard");
            }
        } catch (error: any) {
            if (error.status === 304) {
                setOpen(true);
            } else {
                console.error(error);
            }
        }
    }

    return (
        <Box>
            {" "}
            <MuiForms
                schema={employeeSchema}
                onSubmit={(formData) => {
                    handleSubmit(formData);
                }}
            />
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="No change"
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
