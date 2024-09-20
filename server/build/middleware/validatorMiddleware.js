"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireInput = exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        return res
            .status(400)
            .json(error.errors.map((e) => e.message));
    }
};
exports.validateSchema = validateSchema;
const requireInput = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name)
        return res.status(400).json({ message: "El nombre es requerido" });
    if (!email)
        return res.status(400).json({ message: "El correo es requerido" });
    if (!password)
        return res.status(400).json({ message: "La contraseña es requerida" });
    next();
};
exports.requireInput = requireInput;
