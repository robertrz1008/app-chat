"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const config_1 = require("./config");
const connectdb = new pg_1.default.Pool({
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    port: config_1.DB_PORT,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_DATABASE,
});
exports.default = connectdb;
