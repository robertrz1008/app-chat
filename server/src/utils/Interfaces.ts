import { NextFunction, Request } from "express";

export interface User {
    id?: number,
    name?: string, //opcional
    email: string,
    password: string,
    parse: (req: any) => void
}
export interface CustomRequest extends Request {
    user?: any; 
} 

export interface httpRuote {
    req: Request,
    res: Response,
    next: NextFunction
}