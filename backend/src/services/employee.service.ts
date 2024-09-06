import { EmployeeRequestDto } from "../dtos/EmployeeRequest.dto";
import Employee from "../models/employee.model";
import { BadRequestError, NoChangeError, NotFoundError } from "../models/errors/Errors";

export default class EmployeeService {
    async getAllEmployees(page: number, departmentId: number) {
        try {
            const offset = (page - 1) * 10;

            // Conditionally build the query options
            const queryOptions: any = {
                limit: 10,
                offset,
            };

            if (departmentId !== 1) {
                queryOptions.where = { departmentId };
            }

            const employees = await Employee.findAll(queryOptions);

            // Get the total count of employees with the same condition
            const totalCount = await Employee.count(queryOptions.where ? { where: queryOptions.where } : {});

            return { employees, totalCount };
        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error;
        }
    }

    async createEmployee(employeeRequestDto: EmployeeRequestDto) {
        try {
            // if (await Employee.findOne({ where: { name: employeeRequestDto.name } })) {
            //     throw new BadRequestError(`Employee with name ${employeeRequestDto.name} already exists!`);
            // }
            return await Employee.create({
                ...employeeRequestDto,
            });
        } catch (error) {
            console.error(`Error creating employee ${employeeRequestDto.name}:`, error);
            throw error;
        }
    }

    async getEmployeeById(id: number) {
        try {
            const employee = await Employee.findOne({ where: { id } });
            if (!employee) {
                throw new NotFoundError(`Employee with ID ${id} does not exist!`);
            }
            return employee;
        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error;
        }
    }

    async updateEmployee(id: number, employeeRequestDto: EmployeeRequestDto) {
        try {
            const employee = await Employee.findOne({ where: { id } });

            if (!employee) {
                throw new NotFoundError(`Employee with ID ${id} does not exist!`);
            }

            // const newNameEmployee = await Employee.findOne({ where: {name: employeeRequestDto.name }});
            // if (newNameEmployee) {
            //     throw new BadRequestError(`Employee with name ${employeeRequestDto.name} already exists!`);
            // }
            // Check if the current employee data matches the incoming update data
            const isDataIdentical = Object.keys(employeeRequestDto).every((key) => (employee as any)[key] === (employeeRequestDto as any)[key]);

            if (isDataIdentical) {
                throw new NoChangeError();
            }

            await employee.update({
                ...employeeRequestDto,
            });

            return employee;
        } catch (error) {
            console.error(`Error updating employee ${employeeRequestDto.name}:`, error);
            throw error;
        }
    }

    async deleteEmployee(id: number) {
        try {
            const employee = await Employee.findOne({ where: { id } });

            if (!employee) {
                throw new NotFoundError(`Employee with ID ${id} does not exist!`);
            }

            await employee.destroy();

            return employee;
        } catch (error) {
            console.error(`Error deleting employee ${id}:`, error);
            throw error;
        }
    }
}
