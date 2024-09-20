import {z} from "zod"

export const registerSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido"
    }),
    email: z.string({
        required_error: "el email es requerido"
    }).email({
        message: "Email invalido"
    }),
    password: z.string({
        required_error: "La contraseña es requerido"
    }).min(8, ({
        message: "La contraseña deve tener minimo 8 caracteres"
    }))
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "El nombre es requerido"
    }).email({
        message: "Email invalido" 
    }),
    password: z.string({
        required_error: "La contraseña es requerido"
    })
})
