"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.DB_URL = exports.PORT = exports.socketMsg = exports.TOKEN_SECREAT = void 0;
exports.TOKEN_SECREAT = "tokenrr32tty10";
exports.socketMsg = {
    post: "createMsg",
    delete: "deleteMsg",
    put: "updateMsg",
};
exports.PORT = process.env.PORT || 5000;
exports.DB_URL = process.env.DB_URL;
exports.DB_HOST = process.env.DB_LOCALHOST || "localhost";
exports.DB_PORT = process.env.DB_PORT || 5432;
exports.DB_USER = process.env.DB_USER || "postgres";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "1331";
exports.DB_DATABASE = process.env.DB_DATABASE || "appchatdb";
exports.CLIENT_URL = process.env.CLIENT_URL;
