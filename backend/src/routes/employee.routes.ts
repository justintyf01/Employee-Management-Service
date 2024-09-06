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
import { Router, Request, Response, NextFunction } from "express";
import EmployeeController from "../controllers/employee.controller";
import { EmployeeRequestDto } from "../dtos/EmployeeRequest.dto";
import validationMiddleware from "../middlewares/validation.middleware";
import { BadRequestError, ErrorResponse } from "../models/errors/Errors";

// New Router instance
const router = Router();
const employeeController = new EmployeeController();

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
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page = parseInt(req.query.page as string) || 1; // Extract the page from the query string, default to 1 if not provided

        const departmentId = req.session.departmentId;

        const { employees, totalCount } = await employeeController.getAllEmployees(page, departmentId);

        res.status(200).json({ employees, totalCount });
    } catch (error: any) {
        next(error);
    }
});

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
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseId(req.params.id)

        const employee = await employeeController.getEmployeeById(id);
        res.status(200).json(employee).send();
    } catch (error: any) {
        next(error);
    }
});

// Create new employee
router.post("/", validationMiddleware(EmployeeRequestDto), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employeeRequestDto: EmployeeRequestDto = req.body;
        const newEmployee = await employeeController.createEmployee(employeeRequestDto);
        res.status(201).json(newEmployee).send();
    } catch (error: any) {
        next(error);
    }
});

router.put("/:id", validationMiddleware(EmployeeRequestDto), async (req: Request, res: Response, next: NextFunction) => {
    // send to controller.updateEmployee
    try {
        const id = parseId(req.params.id);
        const employeeRequestDto: EmployeeRequestDto = req.body;
        const newEmployee = await employeeController.updateEmployee(id, employeeRequestDto);
        res.status(200).json(newEmployee).send();
    } catch (error: any) {
        next(error);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseId(req.params.id);
        const emp = await employeeController.deleteEmployee(id);
        res.status(204).send();
    } catch (error: any) {
        next(error);
    }
});

function parseId(id: string) {
    const intId = parseInt(id, 10);

    if (isNaN(intId)) {
        throw new BadRequestError("Invalid employee ID");
    }

    return intId;
}

export default router;
