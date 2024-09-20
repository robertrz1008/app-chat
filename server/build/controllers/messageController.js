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
exports.deleteMessage = exports.createMessage = exports.getMessagesByChatId = exports.getMessagesbyAdmin = void 0;
const connectiondb_1 = __importDefault(require("../utils/connectiondb"));
const main_1 = require("../main");
const config_1 = require("../utils/config");
const SLQ_QUERY = `
SELECT
    m.id AS mensaje_id,
    m.containe as "message",
    m.creation AS fecha_creacion,
    u.id AS usuario_id,
    u.name AS nombre_usuario,
    c.id AS chat_id
FROM
    messages m
JOIN
    users u ON m.id_user = u.id
JOIN
    chats c ON m.id_chat = c.id
WHERE 
    c.id = $1
ORDER BY 
    m.creation DESC;
`;
const getMessagesbyAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const response = yield pgClient.query(`
                SELECT m.containe as "message", m.creation as "fecha y horario", u.name, u.email 
                FROM messages as m JOIN users as u
                ON m.user_id = u.id
        `);
        pgClient.release();
        res.json(response.rows);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getMessagesbyAdmin = getMessagesbyAdmin;
const getMessagesByChatId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const response = yield pgClient.query(SLQ_QUERY, [parseInt(req.params.id)]);
        pgClient.release();
        res.json(response.rows);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getMessagesByChatId = getMessagesByChatId;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containe, id_user, id_chat } = req.body;
    try {
        const pgClient = yield connectiondb_1.default.connect();
        //Gets the id of the chat that will be used to create the message
        const chatFound = yield pgClient.query(`SELECT * FROM chats WHERE id = $1`, [id_chat]);
        if (Array.isArray(chatFound.rows) && chatFound.rows.length == 0) {
            return res.status(404).json({ message: "NO existe el chat" });
        }
        //the message is create using the chats id obtained
        yield pgClient.query(`INSERT INTO messages(containe, id_user, id_chat) VALUES( $1, $2, $3);`, [containe, id_user, id_chat]);
        const response = yield pgClient.query(SLQ_QUERY, [id_chat]);
        pgClient.release();
        main_1.socket.emit(config_1.socketMsg.post, response.rows);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createMessage = createMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pgClient = yield connectiondb_1.default.connect();
        yield connectiondb_1.default.query(`DELETE FROM messages WHERE id = $1`, [req.params.id]);
        // res.json({message: "mensage eliminado"})
        pgClient.release();
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteMessage = deleteMessage;
