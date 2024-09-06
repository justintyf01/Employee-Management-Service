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
import { EmployeeRequestDto } from "../dtos/EmployeeRequest.dto";
import validationMiddleware from "../middlewares/validation.middleware";
import UserController from "../controllers/user.controller";
import { LoginDto } from "../dtos/Login.dto";
import jwt from "jsonwebtoken";
import { UserRequestDto } from "../dtos/UserRequest.dto";
import { redisClient } from "../app";

// New Router instance
const router = Router();
const userController = new UserController();

// login
router.post("/login", validationMiddleware(LoginDto), async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    try {
        // validate login
        const loginDto: LoginDto = req.body;
        const departmentId = await userController.login(loginDto);
        const sessionId = req.session.id;

        // Assign department to user session
        req.session.loggedin = true;
        req.session.departmentId = departmentId;
        // sign JWT
        const token = jwt.sign(
            {
                sessionId: `${sessionId}`,
                departmentId: `${departmentId}`
            },
            process.env.JWT_SECRET_KEY
        );

        // Issue JWT to client
        res.cookie("jwt", token, {
            maxAge: 30 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).send();
    } catch (error) {
        next(error);
    }
});

// User sign up
router.post("/sign-up", validationMiddleware(UserRequestDto), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRequestDto: UserRequestDto = req.body;
        await userController.signUp(userRequestDto);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
});

router.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const sessionId = (decoded as any).sessionId;

        // Destroy the session (for session-based authentication)
        req.session.destroy(async (err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return next(err);
            }

            try {
                await redisClient.del(`sess:${sessionId}`);
            } catch (redisError) {
                console.error("Error deleting session from Redis:", redisError);
                return next(redisError);
            }

            res.clearCookie("jwt", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            res.status(200).send();
        });
    } catch (error) {
        next(error);
    }
});

// router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {});

export default router;
