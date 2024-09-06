"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validationMiddleware;
// middlewares/validation.middleware.ts
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validationMiddleware(type) {
    return (req, res, next) => {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(type, req.body);
        (0, class_validator_1.validate)(dtoInstance).then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => { var _a; return Object.values((_a = error.constraints) !== null && _a !== void 0 ? _a : {}).join(", "); }).join(", ");
                res.status(400).json({ errorMessage: message });
            }
            else {
                next();
            }
        });
    };
}
