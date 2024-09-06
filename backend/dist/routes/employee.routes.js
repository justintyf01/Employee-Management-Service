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
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - salary
 *         - department
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the employee
 *         name:
 *           type: string
 *           description: The name of the employee
 *         salary:
 *           type: integer
 *           description: The salary of the employee
 *         department:
 *           type: string
 *           description: The department where the employee works
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the employee was added
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the employee record was last updated
 *       example:
 *         id: 1
 *         name: John Doe
 *         salary: 50000
 *         department: HR
 */
const express_1 = require("express");
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const EmployeeRequest_dto_1 = require("../dtos/EmployeeRequest.dto");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const Errors_1 = require("../models/errors/Errors");
// New Router instance
const router = (0, express_1.Router)();
const employeeController = new employee_controller_1.default();
/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Returns all the employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: The employee data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Server error
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employeeController.getAllEmployees();
        res.status(200).json({ employees: employees }).send();
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @swagger
 * /employees/{emp_id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: The employee data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        const employee = yield employeeController.getEmployeeById(id);
        res.status(200).json(employee).send();
    }
    catch (error) {
        next(error);
    }
}));
// Create new employee
router.post("/", (0, validation_middleware_1.default)(EmployeeRequest_dto_1.EmployeeRequestDto), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeRequestDto = req.body;
        const newEmployee = yield employeeController.createEmployee(employeeRequestDto);
        res.status(201).json(newEmployee).send();
    }
    catch (error) {
        next(error);
    }
}));
router.put("/:id", (0, validation_middleware_1.default)(EmployeeRequest_dto_1.EmployeeRequestDto), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // send to controller.updateEmployee
    try {
        const id = parseId(req.params.id);
        const employeeRequestDto = req.body;
        const newEmployee = yield employeeController.updateEmployee(id, employeeRequestDto);
        res.status(200).json(newEmployee).send();
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseId(req.params.id);
        const emp = yield employeeController.deleteEmployee(id);
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Errors_1.ErrorResponse) {
            return res.status(error.status).json({ errorMessage: error.message });
        }
        else {
            return res.status(500).json({ errorMessage: "Internal Server Error" });
        }
    }
}));
function parseId(id) {
    const intId = parseInt(id, 10);
    if (isNaN(intId)) {
        throw new Errors_1.BadRequestError("Invalid employee ID");
    }
    return intId;
}
exports.default = router;
