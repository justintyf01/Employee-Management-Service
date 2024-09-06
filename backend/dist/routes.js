"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
// Create a new Router instance
const router = (0, express_1.Router)();
// Mount the routers
router.use("/employees", employee_routes_1.default);
exports.default = router;
