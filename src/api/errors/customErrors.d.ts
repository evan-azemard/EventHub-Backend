export declare class NotFoundError extends Error {
    constructor(message?: string);
}
export declare class ValidationError extends Error {
    details?: unknown;
    constructor(message: string, details?: unknown);
}
export declare class UnauthorizedError extends Error {
    constructor(message?: string);
}
export declare class ForbiddenError extends Error {
    constructor(message?: string);
}
//# sourceMappingURL=customErrors.d.ts.map