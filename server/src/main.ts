import express from "express"
import { CLIENT_URL, PORT, socketMsg } from "./utils/config"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import autRoute from "./routes/auth.routes"
import msgRoute from "./routes/message.routes"
import proRoute from "./routes/profile.routes"
import chatRoute from "./routes/chat.routes"
import { Server} from "socket.io"
import path from "path"
import connectdb from "./utils/connectiondb"

const app = express()
const server = http.createServer(app) 
export const socket = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
})

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "dbImages")))

//socket configuracion
socket.on("connection", (socket) => {
    console.log("user connected")

    socket.on(socketMsg.post, messages => {
        socket.broadcast.emit(socketMsg.post, messages)
    })
})

app.use("/api", autRoute) 
app.use("/api", msgRoute)
app.use("/api", chatRoute)
app.use("/api", proRoute)

app.get("/", (req, res) =>{
    res.send("Welcome to fachat api")
})
app.get("/db", async (req, res) => {  
    try {
        const pgClient = await connectdb.connect()

        const chatFound = await pgClient.query(`SELECT NOW()`)

        pgClient.release()
        res.json(chatFound.rows)
    } catch (error) {
        console.log(error)
    }
})

server.listen(PORT, () =>{
    console.log(`server starting, http://localhost:${PORT}/`)
})