import pg from "pg"
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config"

const connectdb = new pg.Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1331",
    database: "appChatdb",
})

export default connectdb