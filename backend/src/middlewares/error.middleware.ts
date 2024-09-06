import { ErrorResponse } from "../models/errors/Errors";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    if (err instanceof ErrorResponse) {
        return res.status(err.status).json({ errorMessage: err.message });
    } else {
        return res.status(500).json({ errorMessage: "Internal Server Error" + err });
    }
}
