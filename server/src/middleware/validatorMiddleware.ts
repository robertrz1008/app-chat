import { NextFunction, Request, Response } from "express";
import { User, httpRuote } from "../utils/Interfaces";

export const validateSchema = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error: any) {
        return res
                .status(400)
                .json(error.errors.map((e: any)=> e.message))
    }
}
export const requireInput = (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body

    if(!name) return res.status(400).json({message: "El nombre es requerido"})
    if(!email) return res.status(400).json({message: "El correo es requerido"})
    if(!password) return res.status(400).json({message: "La contraseña es requerida"})

    next()
}