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
exports.verifyChatByUser = exports.getUserByFilter = exports.createChatPrivateRequest = exports.getChatsPrivateRequest = void 0;
const connectiondb_1 = __importDefault(require("../utils/connectiondb"));
const getChatsPrivateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function chatList(arr1, arr2) {
        const newX = arr1.reduce((cc, el) => cc.concat(el.id_chat), []);
        const mY = arr2.filter(data => newX.indexOf(data.chat_id) != -1);
        return mY;
    }
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const mychat = yield pgClient.query(`SELECT * FROM users_chat WHERE id_user = $1`, [req.user.id]);
        const userchat = yield pgClient.query(`
        SELECT
            u.name AS user_name, 
            u.id_image AS id_image,
            c.id AS chat_id,
            m.containe AS latest_message_content,
            m.id_user AS message_user,
            mt.latest_message AS latest_message_time 
        FROM
            users u
        JOIN
            users_chat uc ON u.id = uc.id_user
        JOIN
            chats c ON uc.id_chat = c.id
        JOIN (
            SELECT
                m.id_chat,
                MAX(m.creation) AS latest_message
            FROM
                messages m
            GROUP BY
                m.id_chat
        ) mt ON c.id = mt.id_chat
        JOIN
            messages m ON mt.latest_message = m.creation AND mt.id_chat = m.id_chat
        WHERE
            m.containe IS NOT NULL and uc.id_user <> $1
        ORDER BY
            latest_message_time DESC
        `, [req.user.id]);
        pgClient.release();
        if (Array.isArray(mychat.rows) && Array.isArray(userchat.rows)) {
            const mc = mychat.rows;
            const uc = userchat.rows;
            const myChatsList = chatList(mc, uc);
            res.json(myChatsList);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getChatsPrivateRequest = getChatsPrivateRequest;
const createChatPrivateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const n = 1;
    const yo = req.user.id;
    const { userId } = req.body;
    try {
        const pgClient = yield connectiondb_1.default.connect();
        //cramos el chat para crear la sala de combersacion 
        yield pgClient.query(`INSERT INTO chats(id_type) VALUES($1);`, [n]);
        const response = yield pgClient.query(`SELECT * FROM chats`);
        if (Array.isArray(response.rows)) {
            const chatFound = response.rows[response.rows.length - 1];
            //para definir quienes seran los integrantes de la combersacion
            yield pgClient.query(`INSERT INTO users_chat(id_user, id_chat) VALUES($1, $2);`, [yo, chatFound.id]);
            yield pgClient.query(`INSERT INTO users_chat(id_user, id_chat) VALUES($1, $2);`, [userId, chatFound.id]);
            res.json({ message: "chat privado creado con exito" });
        }
        pgClient.release();
    }
    catch (error) {
        console.log(error);
    }
});
exports.createChatPrivateRequest = createChatPrivateRequest;
const getUserByFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function userList(profile, list) {
        const myList = list.filter((user) => user.id != profile.id);
        return myList;
    }
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const response = yield pgClient.query(`SELECT * FROM users WHERE name LIKE '%${req.params.str}%' or email LIKE  '%${req.params.str}%'`);
        pgClient.release();
        if (Array.isArray(response.rows)) {
            const mychatList = response.rows;
            const profile = req.user;
            const newUserList = userList(profile, mychatList);
            res.json(newUserList);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserByFilter = getUserByFilter;
const verifyChatByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function findChat(arr1, arr2) {
        const newX = arr1.reduce((cc, el) => cc.concat(el.chat_id), []);
        const mY = arr2.filter(data => newX.indexOf(data.chat_id) != -1);
        return mY;
    }
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const myChats = yield pgClient.query(`
            select 
                u.name as user_name, 
                u.id_image as id_image,
                uc.id_chat as chat_id
            from 
                users u join users_chat uc
            on 
                u.id = uc.id_user 
            where u.id = $1;`, [req.user.id]);
        const userChat = yield pgClient.query(`
        select 
            u.name as user_name, 
            u.id_image as id_image,
            uc.id_chat as chat_id
        from 
            users u join users_chat uc
        on 
            u.id = uc.id_user 
        where u.id = $1;`, [req.params.id]);
        const chatTest = findChat(myChats.rows, userChat.rows);
        pgClient.release();
        res.json(chatTest);
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyChatByUser = verifyChatByUser;
