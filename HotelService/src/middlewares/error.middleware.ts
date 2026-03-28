import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const appErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    console.log(err);

    const maybeAppError = err as Partial<AppError>;
    const statusCode = Number.isInteger(maybeAppError.statusCode) ? maybeAppError.statusCode as number : 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message
    });
}

export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}