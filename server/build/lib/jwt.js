"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const createAccessToken = (payload) => { 
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, config_1.TOKEN_SECREAT, { expiresIn: "2d" }, (error, token) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.createAccessToken = createAccessToken;
