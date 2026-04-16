import { Request, Response, NextFunction } from 'express';

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.jsonSuccess = (data: any, statusCode: number = 200) => {
        return res.status(statusCode).json({
            success: true,
            data,
            message: null
        });
    };

    res.jsonError = (message: string, statusCode: number = 400) => {
        return res.status(statusCode).json({
            success: false,
            data: null,
            message
        });
    };

    next();
};

