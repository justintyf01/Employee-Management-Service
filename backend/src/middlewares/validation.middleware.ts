// middlewares/validation.middleware.ts
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export default function validationMiddleware(type: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(type, req.body);
        validate(dtoInstance).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => Object.values(error.constraints ?? {}).join(", ")).join(", ");
                res.status(400).json({ errorMessage: message });
            } else {
                next();
            }
        });
    };
}
