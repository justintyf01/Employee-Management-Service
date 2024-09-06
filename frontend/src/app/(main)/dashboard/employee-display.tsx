"use client";
import { ContentLayout } from "@/app/components/layouts/content-layout";
import EmployeeCard from "../../components/ui/EmployeeCard";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Employee } from "@/types/employee-data";
import { useGetEmployeesQuery } from "@/api/employee-api";
import { useEffect, useState } from "react";

export default function EmployeeDisplay() {
    const [page, setPage] = useState(1);
    const limit = 10;

    let { data, error, isLoading, refetch } = useGetEmployeesQuery({ page },{
        refetchOnMountOrArgChange: true,
    });

    const totalPages = data ? Math.ceil(data.totalCount / limit) : 0;

    useEffect(() => {
        if (data?.employees.length === 0 && page > 1) {
            setPage((prev) => prev - 1);
        }
    }, [data]);


    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };
    
return (
    <Box>
        {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>
        ) : (
            <Box>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {error && <Typography color="error">Error loading employees.</Typography>}

                    {!isLoading && !error && data?.employees.length === 0 && <Typography>No employees found.</Typography>}

                    {!isLoading && !error && data?.employees.map((employee: Employee) => <EmployeeCard key={employee.id} employee={employee} refetch={refetch} />)}
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                    <Box className="items-center">
                        {!isLoading && (
                            <Typography>
                                {data?.totalCount === 0
                                    ? ""
                                    : `Showing ${(page - 1) * 10 + 1} - ${page * 10 < (data?.totalCount || 0) ? page * 10 : data?.totalCount || 0} out of ${data?.totalCount} entries`}
                            </Typography>
                        )}
                    </Box>
                    <Box className="flex space-x-2 items-center flex-row">
                        <Button onClick={handlePreviousPage} disabled={page === 1} variant="contained" color="primary">
                            Previous
                        </Button>
                        {!isLoading && (
                            <Typography>
                                Page {page} of {totalPages > 0 ? totalPages : 1}
                            </Typography>
                        )}
                        <Button onClick={handleNextPage} disabled={page >= totalPages} variant="contained" color="primary">
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        )}
    </Box>
);

}
