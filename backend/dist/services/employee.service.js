"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_model_1 = __importDefault(require("../models/employee.model"));
const Errors_1 = require("../models/errors/Errors");
class EmployeeService {
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield employee_model_1.default.findAll();
            }
            catch (error) {
                console.error("Error fetching employees:", error);
                throw error;
            }
        });
    }
    createEmployee(employeeRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if (await Employee.findOne({ where: { name: employeeRequestDto.name } })) {
                //     throw new BadRequestError(`Employee with name ${employeeRequestDto.name} already exists!`);
                // }
                return yield employee_model_1.default.create(Object.assign({}, employeeRequestDto));
            }
            catch (error) {
                console.error(`Error creating employee ${employeeRequestDto.name}:`, error);
                throw error;
            }
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield employee_model_1.default.findOne({ where: { id } });
                if (!employee) {
                    throw new Errors_1.NotFoundError(`Employee with ID ${id} does not exist!`);
                }
                return employee;
            }
            catch (error) {
                console.error("Error fetching employees:", error);
                throw error;
            }
        });
    }
    updateEmployee(id, employeeRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield employee_model_1.default.findOne({ where: { id } });
                if (!employee) {
                    throw new Errors_1.NotFoundError(`Employee with ID ${id} does not exist!`);
                }
                // const newNameEmployee = await Employee.findOne({ where: {name: employeeRequestDto.name }});
                // if (newNameEmployee) {
                //     throw new BadRequestError(`Employee with name ${employeeRequestDto.name} already exists!`);
                // }
                // Check if the current employee data matches the incoming update data
                const isDataIdentical = Object.keys(employeeRequestDto).every((key) => employee[key] === employeeRequestDto[key]);
                if (isDataIdentical) {
                    throw new Errors_1.NoChangeError();
                }
                yield employee.update(Object.assign({}, employeeRequestDto));
                return employee;
            }
            catch (error) {
                console.error(`Error updating employee ${employeeRequestDto.name}:`, error);
                throw error;
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield employee_model_1.default.findOne({ where: { id } });
                if (!employee) {
                    throw new Errors_1.NotFoundError(`Employee with ID ${id} does not exist!`);
                }
                yield employee.destroy();
                return employee;
            }
            catch (error) {
                console.error(`Error deleting employee ${id}:`, error);
                throw error;
            }
        });
    }
}
exports.default = EmployeeService;
