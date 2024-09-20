"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(400).json({ message: "NO token" });
    }
    else {
        jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECREAT, (err, user) => {
            if (err)
                return res.status(404).json({ msg: "Token Invalid" });
            req.user = user;
            next();
        });
    }
};
exports.authRequired = authRequired;
