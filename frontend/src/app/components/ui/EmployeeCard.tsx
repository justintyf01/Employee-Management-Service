"use client";
import * as React from "react";
import { Employee } from "@/types/employee-data";
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Link,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import EmployeeForm from "@/app/components/forms/employee-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteEmployeeMutation } from "@/api/employee-api";

interface EmployeeCardProps {
    employee: Employee;
    refetch: () => void;
}

const departmentMap = new Map<number, string>([
    [1, "Admin"],
    [2, "HR"],
    [3, "PS"]
])

export default function EmployeeCards({ employee, refetch }: EmployeeCardProps) {
    const router = useRouter();
    const theme = createTheme();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteEmployee] = useDeleteEmployeeMutation();

    const handleOpenEdit = () => {
        setEditOpen(true);
    };

    const handleCloseEdit = () => {
        setEditOpen(false);
    };

    const handleOpenDelete = () => {
        setDeleteOpen(true);
    };

    const handleCloseDelete = () => {
        setDeleteOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteEmployee(employee);
        } catch (error: any) {
            console.error(error);
        } finally {
            setDeleteOpen(false);
            
        }
    };

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

    return (
        <ThemeProvider theme={theme}>
            <Card className="flex flex-col">
                <CardContent className="flex justify-between items-center">
                    <div>
                        <Typography variant="h3" className="break-all">
                            {employee.name}
                        </Typography>
                        <Typography>{departmentMap.get(employee.departmentId)}</Typography>
                        <Typography>${employee.salary}</Typography>
                    </div>
                    <div>
                        <IconButton aria-label="edit" onClick={handleOpenEdit}>
                            <Edit fontSize="inherit" />
                        </IconButton>
                        <Dialog open={editOpen} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>
                            <DialogContent>
                                <DialogContentText>Update details of employee here.</DialogContentText>
                                <EmployeeForm employee={employee} handleCloseDialog={handleCloseEdit} refetch={refetch} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseEdit} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <IconButton aria-label="delete" onClick={handleOpenDelete}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <Dialog open={deleteOpen} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" className="break-all">
                                Delete Employee {employee.name}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>Are you sure?</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDelete} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleConfirmDelete} color="primary">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}
