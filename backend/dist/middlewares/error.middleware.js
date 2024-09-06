"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const Errors_1 = require("../models/errors/Errors");
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    if (err instanceof Errors_1.ErrorResponse) {
        return res.status(err.status).json({ errorMessage: err.message });
    }
    else {
        return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}
