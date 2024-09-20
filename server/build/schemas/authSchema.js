"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "El nombre es requerido"
    }),
    email: zod_1.z.string({
        required_error: "el email es requerido"
    }).email({
        message: "Email invalido"
    }),
    password: zod_1.z.string({
        required_error: "La contraseña es requerido"
    }).min(8, ({
        message: "La contraseña deve tener minimo 8 caracteres"
    }))
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "El nombre es requerido"
    }).email({
        message: "Email invalido"
    }),
    password: zod_1.z.string({
        required_error: "La contraseña es requerido"
    })
});
