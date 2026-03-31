import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import logger from "../config/logger.config";

function formatValidationError(error: unknown) {
    if (error instanceof ZodError) {
        return error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
        }));
    }

    return [{ message: "Validation failed" }];
}

/**
 * 
 * @param schema - Zod schema to validate the request body
 * @returns - Middleware function to validate the request body
 */
export const validateRequestBody = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            logger.info("Validating request body");
            await schema.parseAsync(req.body);
            logger.info("Request body is valid");
            next();

        } catch (error) {
            // If the validation fails, 
            logger.error("Request body is invalid");
            res.status(400).json({
                message: "Invalid request body",
                success: false,
                error: formatValidationError(error)
            });
            
        }
    }
}

/**
 * 
 * @param schema - Zod schema to validate the request body
 * @returns - Middleware function to validate the request query params
 */
export const validateQueryParams = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            await schema.parseAsync(req.query);
            console.log("Query params are valid");
            next();

        } catch (error) {
            // If the validation fails, 

            res.status(400).json({
                message: "Invalid query params",
                success: false,
                error: formatValidationError(error)
            });
            
        }
    }
}

/**
 * 
 * @param schema - Zod schema to validate the request params
 * @returns - Middleware function to validate the request params
 */
export const validateParams = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            logger.info("Validating request params");
            await schema.parseAsync(req.params);
            logger.info("Request params are valid");
            next();

        } catch (error) {
            // If the validation fails, 
            logger.error("Request params are invalid");
            res.status(400).json({
                message: "Invalid request parameters",
                success: false,
                error: formatValidationError(error)
            });
            
        }
    }
}

