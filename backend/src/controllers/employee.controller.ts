import EmployeeService from "../services/employee.service";
import Employee from "../models/employee.model";
import { EmployeeRequestDto } from "../dtos/EmployeeRequest.dto";

export default class EmployeeController {
    employeeService: EmployeeService;

    constructor() {
        this.employeeService = new EmployeeService();
    }

    async getAllEmployees(page: number, departmentId: number) {
        return await this.employeeService.getAllEmployees(page, departmentId);
    }

    async createEmployee(employeeRequestDto: EmployeeRequestDto) {
        return await this.employeeService.createEmployee(employeeRequestDto);
    }

    async getEmployeeById(id: number) {
        return await this.employeeService.getEmployeeById(id);
    }

    async updateEmployee(id: number, employeeRequestDto: EmployeeRequestDto) {
        // try {
        return await this.employeeService.updateEmployee(id, employeeRequestDto);
        // } catch (error: any) {
        //     throw new Error("Error updating employee: " + error.message);
        // }
    }

    async deleteEmployee(id: number) {
        await this.employeeService.deleteEmployee(id);
    }
}
