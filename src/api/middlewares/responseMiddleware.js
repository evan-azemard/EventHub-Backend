export const responseMiddleware = (req, res, next) => {
    res.jsonSuccess = (data, statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            data,
            message: null
        });
    };
    res.jsonError = (message, statusCode = 400) => {
        return res.status(statusCode).json({
            success: false,
            data: null,
            message
        });
    };
    next();
};
//# sourceMappingURL=responseMiddleware.js.map