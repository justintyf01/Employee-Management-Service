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
const employee_service_1 = __importDefault(require("../services/employee.service"));
class EmployeeController {
    constructor() {
        this.employeeService = new employee_service_1.default();
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeService.getAllEmployees();
        });
    }
    createEmployee(employeeRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeService.createEmployee(employeeRequestDto);
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeService.getEmployeeById(id);
        });
    }
    updateEmployee(id, employeeRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            return yield this.employeeService.updateEmployee(id, employeeRequestDto);
            // } catch (error: any) {
            //     throw new Error("Error updating employee: " + error.message);
            // }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.employeeService.deleteEmployee(id);
        });
    }
}
exports.default = EmployeeController;
