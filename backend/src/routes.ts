import { Router } from "express";
import employeeRouter from "./routes/employee.routes";
import userRouter from "./routes/user.routes";
import authenticateJWT from "./middlewares/auth.middleware";

// Create a new Router instance
const router = Router();

// Mount the routers
router.use("/employees", authenticateJWT, employeeRouter);

// No need to protect routes here, sign-up, login and logout does not require user to be logged in
router.use("/auth", userRouter);

export default router;
