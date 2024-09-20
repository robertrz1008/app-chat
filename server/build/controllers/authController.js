"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.profileRequest = exports.logoutRequest = exports.loginRrquest = exports.registerRequest = exports.getUsersRequest = void 0;
const connectiondb_1 = __importDefault(require("../utils/connectiondb"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../lib/jwt");
const config_1 = require("../utils/config");
const getUsersRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const response = yield pgClient.query("SELECT * FROM users");
        if (!response.rows)
            return res.status(404).json({ mesaje: "user not found" });
        res.json(response.rows);
        pgClient.release();
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsersRequest = getUsersRequest;
const registerRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const passwordCrypt = yield bcryptjs_1.default.hash(password, 3);
    try {
        const pgClient = yield connectiondb_1.default.connect();
        yield pgClient.query(`INSERT INTO users(name, email, password) VALUES( $1, $2, $3);`, [name, email, passwordCrypt]);
        const response = yield pgClient.query("SELECT * FROM users WHERE email = $1", [email]);
        if (Array.isArray(response.rows)) {
            const userFound = response.rows[0];
            const token = yield (0, jwt_1.createAccessToken)({ id: userFound.id });
            res.cookie("token", token);
            res.json({
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                password: userFound.password
            });
        }
        pgClient.release();
    }
    catch (error) {
        console.log(error);
        res.status(400).json(["El coreo esta en uso"]);
    }
});
exports.registerRequest = registerRequest;
const loginRrquest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const response = yield pgClient.query("SELECT * FROM users WHERE email = $1", [email]);
        if (Array.isArray(response.rows) && response.rows.length == 0)
            return res.status(404).json(["no se reconoce el email"]);
        if (Array.isArray(response.rows)) {
            const userFound = response.rows[0];
            const isMatch = yield bcryptjs_1.default.compare(password, userFound.password);
            if (!isMatch)
                return res.status(404).json(["La contraseña es incorrecta"]);
            const token = yield (0, jwt_1.createAccessToken)({ id: userFound.id });
            res.cookie("token", token);
            res.send(`Bienvenido ${userFound.name}`);
        }
        pgClient.release();
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginRrquest = loginRrquest;
const logoutRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    res.sendStatus(200);
});
exports.logoutRequest = logoutRequest;
const profileRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const response = yield pgClient.query(`SELECT * FROM users WHERE id = $1`, [req.user.id]);
        pgClient.release();
        if (!response.rows) {
            return res.status(404).json({ message: "User not Found" });
        }
        res.json(response.rows);
    }
    catch (error) {
        console.log(error);
    }
});
exports.profileRequest = profileRequest;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ msg: "No autorizado" });
    jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECREAT, (error, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return res.status(400).json({ message: "Token Fallido" });
        const pgClient = yield connectiondb_1.default.connect();
        const response = yield pgClient.query(`SELECT * FROM users WHERE id = $1 `, [user.id]);
        pgClient.release();
        if (!response.rows)
            return res.status(404).json({ message: "No hay Token" });
        if (Array.isArray(response.rows)) {
            const userFound = response.rows[0];
            res.json({
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                password: userFound.password
            });
        }
    }));
});
exports.verifyToken = verifyToken;
