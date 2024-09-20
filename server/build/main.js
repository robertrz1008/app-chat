"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./utils/config");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.socket = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.CLIENT_URL,
    }
});
app.use((0, cors_1.default)({
    origin: config_1.CLIENT_URL,
    credentials: true
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "dbImages")));
//socket configuracion
exports.socket.on("connection", (socket) => {
    console.log("user connected");
    socket.on(config_1.socketMsg.post, messages => {
        socket.broadcast.emit(config_1.socketMsg.post, messages);
    });
});
app.use("/api", auth_routes_1.default);
app.use("/api", message_routes_1.default);
app.use("/api", chat_routes_1.default);
app.use("/api", profile_routes_1.default);
server.listen(config_1.PORT, () => {
    console.log(`server starting, http://localhost:${config_1.PORT}/`);
});
